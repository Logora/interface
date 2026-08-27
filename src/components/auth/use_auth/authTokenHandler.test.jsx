import { makeStorage } from "./AuthStorage";
import { authTokenHandler } from "./authTokenHandler";

const localStorageMock = (() => {
	let store = {};

	return {
		name: "localStorage",
		getItem: (key) => store[key] || null,
		setItem: (key, value) => {
			store[key] = value.toString();
		},
		removeItem: (key) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		},
	};
})();

const httpClient = {
	get: vi.fn(),
	post: vi.fn(),
	patch: vi.fn(),
};

beforeEach(() => {
	httpClient.get.mockClear();
	httpClient.post.mockClear();
	httpClient.patch.mockClear();
});

describe("authTokenHandler", () => {
	describe("getToken", () => {
		beforeEach(() => {
			delete window.localStorage;
		});

		it("should get null if no token set", () => {
			Object.defineProperty(window, "localStorage", {
				configurable: true,
				value: localStorageMock,
			});

			const tokenKey = "token-key";
			const { getToken } = authTokenHandler(
				httpClient,
				"https://example.com/auth",
				tokenKey,
			);

			expect(getToken()).toBeNull();
		});

		it("should get correct token", () => {
			Object.defineProperty(window, "localStorage", {
				configurable: true,
				value: localStorageMock,
			});

			const tokenKey = "token-key";
			const { setToken } = makeStorage(tokenKey);
			const { getToken } = authTokenHandler(
				httpClient,
				"https://example.com/auth",
				tokenKey,
			);

			const token = { access_token: "a-super-token" };
			setToken(token);
			expect(getToken()).toStrictEqual(token);
		});
	});

	describe("removeToken", () => {
		beforeEach(() => {
			delete window.localStorage;
		});

		it("should remove token", () => {
			Object.defineProperty(window, "localStorage", {
				configurable: true,
				value: localStorageMock,
			});

			const tokenKey = "token-key";
			const { setToken } = makeStorage(tokenKey);
			const { getToken, removeToken } = authTokenHandler(
				httpClient,
				"https://example.com/auth",
				tokenKey,
			);

			const token = { access_token: "great-token" };
			setToken(token);
			expect(getToken()).toStrictEqual(token);

			removeToken();
			expect(getToken()).toBeNull();
		});
	});

	describe("fetchToken", () => {
            const AUTH_URL = "https://example.com/auth";
            const tokenKey = "token-key";
            const authParams = { session_id: "session-123" };

            beforeEach(() => {
                    delete window.localStorage;
                    Object.defineProperty(window, "localStorage", {
                            configurable: true,
                            value: localStorageMock,
                    });
                    localStorageMock.clear();
                    httpClient.post.mockReset();
            });

            it("should fetch the token and store it", async () => {
                    httpClient.post.mockResolvedValue({
                            data: {
                                    access_token: "access",
                                    refresh_token: "refresh",
                                    created_at: Math.floor(Date.now() / 1000),
                                    expires_in: 7200,
                            },
                    });

                    const { fetchToken, getToken } = authTokenHandler(
                            httpClient,
                            AUTH_URL,
                            tokenKey,
                    );

                    const response = await fetchToken(authParams);

                    expect(httpClient.post).toHaveBeenCalledTimes(1);
                    expect(httpClient.post).toHaveBeenCalledWith(AUTH_URL, authParams);
                    expect(response.data.access_token).toBe("access");
                    expect(getToken().access_token).toBe("access");
            });

            it("should deduplicate concurrent fetchToken calls — only one HTTP request is made", async () => {
                    let resolvePost;
                    const postPromise = new Promise((resolve) => {
                            resolvePost = resolve;
                    });
                    httpClient.post.mockReturnValueOnce(postPromise);

                    const { fetchToken } = authTokenHandler(httpClient, AUTH_URL, tokenKey);

                    // Simulate a double submission / concurrent OAuth callbacks.
                    const p1 = fetchToken(authParams);
                    const p2 = fetchToken(authParams);
                    const p3 = fetchToken(authParams);

                    resolvePost({
                            data: {
                                    access_token: "access",
                                    refresh_token: "refresh",
                                    created_at: Math.floor(Date.now() / 1000),
                                    expires_in: 7200,
                            },
                    });

                    const results = await Promise.all([p1, p2, p3]);

                    expect(httpClient.post).toHaveBeenCalledTimes(1);
                    results.forEach((r) => {
                            expect(r.data.access_token).toBe("access");
                    });
            });

            it("should allow a new fetchToken after the previous one completes", async () => {
                    httpClient.post.mockResolvedValue({
                            data: {
                                    access_token: "access",
                                    refresh_token: "refresh",
                                    created_at: Math.floor(Date.now() / 1000),
                                    expires_in: 7200,
                            },
                    });

                    const { fetchToken } = authTokenHandler(httpClient, AUTH_URL, tokenKey);

                    await fetchToken(authParams);
                    await fetchToken(authParams);

                    expect(httpClient.post).toHaveBeenCalledTimes(2);
            });

            it("should clear the in-flight lock after a failed fetchToken", async () => {
                    httpClient.post
                            .mockRejectedValueOnce(new Error("network error"))
                            .mockResolvedValue({
                                    data: {
                                            access_token: "recovered-access",
                                            refresh_token: "refresh",
                                            created_at: Math.floor(Date.now() / 1000),
                                            expires_in: 7200,
                                    },
                            });

                    const { fetchToken } = authTokenHandler(httpClient, AUTH_URL, tokenKey);

                    await expect(fetchToken(authParams)).rejects.toThrow("network error");

                    // After failure the lock should be cleared — next call must reach the server.
                    await fetchToken(authParams);
                    expect(httpClient.post).toHaveBeenCalledTimes(2);
            });
    });

	describe("refreshToken", () => {
		const AUTH_URL = "https://example.com/auth";
		const tokenKey = "token-key";

		beforeEach(() => {
			delete window.localStorage;
			Object.defineProperty(window, "localStorage", {
				configurable: true,
				value: localStorageMock,
			});
			localStorageMock.clear();
		});

		const seedToken = (extra = {}) => {
			const { setToken } = makeStorage(tokenKey);
			setToken({
				access_token: "old-access",
				refresh_token: "old-refresh",
				expires_at: Math.floor(Date.now() / 1000) - 60,
				session_id: "session-123",
				...extra,
			});
		};

		it("should refresh the token and store the new one", async () => {
			seedToken();
			httpClient.post.mockResolvedValueOnce({
				data: {
					access_token: "new-access",
					refresh_token: "new-refresh",
					created_at: Math.floor(Date.now() / 1000),
					expires_in: 7200,
				},
			});

			const { refreshToken, getToken } = authTokenHandler(
				httpClient,
				AUTH_URL,
				tokenKey,
			);

			const accessToken = await refreshToken();

			expect(accessToken).toBe("new-access");
			expect(httpClient.post).toHaveBeenCalledTimes(1);
			expect(httpClient.post).toHaveBeenCalledWith(AUTH_URL, {
				grant_type: "refresh_token",
				refresh_token: "old-refresh",
			});
			expect(getToken().access_token).toBe("new-access");
		});

		it("should deduplicate concurrent refresh calls — only one HTTP request is made", async () => {
			seedToken();

			let resolvePost;
			const postPromise = new Promise((resolve) => {
				resolvePost = resolve;
			});
			httpClient.post.mockReturnValueOnce(postPromise);

			const { refreshToken } = authTokenHandler(httpClient, AUTH_URL, tokenKey);

			// Fire three concurrent refresh calls
			const p1 = refreshToken();
			const p2 = refreshToken();
			const p3 = refreshToken();

			// Resolve the single underlying HTTP call
			resolvePost({
				data: {
					access_token: "new-access",
					refresh_token: "new-refresh",
					created_at: Math.floor(Date.now() / 1000),
					expires_in: 7200,
				},
			});

			const [r1, r2, r3] = await Promise.all([p1, p2, p3]);

			expect(httpClient.post).toHaveBeenCalledTimes(1);
			expect(r1).toBe("new-access");
			expect(r2).toBe("new-access");
			expect(r3).toBe("new-access");
		});

		it("should allow a new refresh after the previous one completes", async () => {
			seedToken();

			httpClient.post
				.mockResolvedValueOnce({
					data: {
						access_token: "access-1",
						refresh_token: "refresh-1",
						created_at: Math.floor(Date.now() / 1000),
						expires_in: 7200,
					},
				})
				.mockResolvedValueOnce({
					data: {
						access_token: "access-2",
						refresh_token: "refresh-2",
						created_at: Math.floor(Date.now() / 1000),
						expires_in: 7200,
					},
				});

			const { refreshToken } = authTokenHandler(httpClient, AUTH_URL, tokenKey);

			const first = await refreshToken();
			const second = await refreshToken();

			expect(httpClient.post).toHaveBeenCalledTimes(2);
			expect(first).toBe("access-1");
			expect(second).toBe("access-2");
		});

		it("should clear the in-flight lock after a failed refresh", async () => {
			seedToken();

			httpClient.post
				.mockRejectedValueOnce(new Error("network error"))
				.mockResolvedValueOnce({
					data: {
						access_token: "recovered-access",
						refresh_token: "recovered-refresh",
						created_at: Math.floor(Date.now() / 1000),
						expires_in: 7200,
					},
				});

			const { refreshToken } = authTokenHandler(httpClient, AUTH_URL, tokenKey);

			await expect(refreshToken()).rejects.toThrow("network error");

			// After failure the lock should be cleared — next call must succeed
			const accessToken = await refreshToken();
			expect(accessToken).toBe("recovered-access");
			expect(httpClient.post).toHaveBeenCalledTimes(2);
		});
	});
});
