import React from "react";
import { renderHook } from "@testing-library/react";
import { useAuthInterceptor } from "./useAuthInterceptor";
import { makeStorage } from "./AuthStorage";

const AUTH_URL = "https://example.com/auth";
const TOKEN_KEY = "token-key";

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

const makeHttpClient = () => {
	const interceptors = { request: { use: vi.fn() } };
	const post = vi.fn();
	return { interceptors, post };
};

// Helper: extract the request interceptor registered via httpClient.interceptors.request.use
const getRequestInterceptor = (httpClient) => {
	return httpClient.interceptors.request.use.mock.calls[0][0];
};

const makeConfig = (url = "/api/resource", authorization = "Bearer old-token") => ({
	url,
	headers: { authorization },
});

beforeEach(() => {
	delete window.localStorage;
	Object.defineProperty(window, "localStorage", {
		configurable: true,
		value: localStorageMock,
	});
	localStorageMock.clear();
});

describe("useAuthInterceptor", () => {
	it("registers a request interceptor on mount", () => {
		const httpClient = makeHttpClient();
		renderHook(() => useAuthInterceptor(httpClient, AUTH_URL, TOKEN_KEY));
		expect(httpClient.interceptors.request.use).toHaveBeenCalledTimes(1);
	});

	it("passes through requests with a valid (non-expired) token unchanged", async () => {
		const httpClient = makeHttpClient();
		const { setToken } = makeStorage(TOKEN_KEY);
		setToken({
			access_token: "valid-access",
			refresh_token: "valid-refresh",
			expires_at: Math.floor(Date.now() / 1000) + 3600,
			session_id: "s1",
		});

		renderHook(() => useAuthInterceptor(httpClient, AUTH_URL, TOKEN_KEY));
		const interceptor = getRequestInterceptor(httpClient);

		const config = makeConfig();
		const result = await interceptor(config);

		expect(result).toBe(config);
		expect(httpClient.post).not.toHaveBeenCalled();
	});

	it("refreshes the token and updates the Authorization header when the token is expired", async () => {
		const httpClient = makeHttpClient();
		const { setToken } = makeStorage(TOKEN_KEY);
		setToken({
			access_token: "old-access",
			refresh_token: "old-refresh",
			expires_at: Math.floor(Date.now() / 1000) - 60,
			session_id: "s1",
		});

		httpClient.post.mockResolvedValueOnce({
			data: {
				access_token: "new-access",
				refresh_token: "new-refresh",
				created_at: Math.floor(Date.now() / 1000),
				expires_in: 7200,
			},
		});

		renderHook(() => useAuthInterceptor(httpClient, AUTH_URL, TOKEN_KEY));
		const interceptor = getRequestInterceptor(httpClient);

		const config = makeConfig();
		const result = await interceptor(config);

		expect(httpClient.post).toHaveBeenCalledTimes(1);
		expect(result.headers.authorization).toBe("Bearer new-access");
	});

	it("skips refresh when the request is to the auth URL itself (avoids infinite loop)", async () => {
		const httpClient = makeHttpClient();
		const { setToken } = makeStorage(TOKEN_KEY);
		setToken({
			access_token: "old-access",
			refresh_token: "old-refresh",
			expires_at: Math.floor(Date.now() / 1000) - 60,
			session_id: "s1",
		});

		renderHook(() => useAuthInterceptor(httpClient, AUTH_URL, TOKEN_KEY));
		const interceptor = getRequestInterceptor(httpClient);

		const config = makeConfig(AUTH_URL);
		const result = await interceptor(config);

		expect(httpClient.post).not.toHaveBeenCalled();
		expect(result).toBe(config);
	});

	it("passes through requests with no Authorization header without refreshing", async () => {
		const httpClient = makeHttpClient();
		const { setToken } = makeStorage(TOKEN_KEY);
		setToken({
			access_token: "old-access",
			refresh_token: "old-refresh",
			expires_at: Math.floor(Date.now() / 1000) - 60,
			session_id: "s1",
		});

		renderHook(() => useAuthInterceptor(httpClient, AUTH_URL, TOKEN_KEY));
		const interceptor = getRequestInterceptor(httpClient);

		const config = { url: "/api/public", headers: {} };
		const result = await interceptor(config);

		expect(httpClient.post).not.toHaveBeenCalled();
		expect(result).toBe(config);
	});

	it("passes through requests when no token is stored", async () => {
		const httpClient = makeHttpClient();
		// No token seeded in storage

		renderHook(() => useAuthInterceptor(httpClient, AUTH_URL, TOKEN_KEY));
		const interceptor = getRequestInterceptor(httpClient);

		const config = makeConfig();
		const result = await interceptor(config);

		expect(httpClient.post).not.toHaveBeenCalled();
		expect(result).toBe(config);
	});
});
