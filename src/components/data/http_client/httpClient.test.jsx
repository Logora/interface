import { dataProvider } from "@logora/debate/data/data_provider";
import { httpClient } from "./httpClient";

const API_URL = "https://api.test/v1";

const makeResponse = ({ status = 200, body = "", headers = {} } = {}) => ({
	ok: status >= 200 && status < 300,
	status,
	statusText: "",
	headers: new Headers(headers),
	text: () => Promise.resolve(body),
});

const stubFetch = (response) => {
	const fetchMock = vi.fn().mockResolvedValue(response);
	vi.stubGlobal("fetch", fetchMock);
	return fetchMock;
};

afterEach(() => {
	vi.unstubAllGlobals();
	vi.useRealTimers();
});

describe("httpClient", () => {
	it("resolves with a data/status/headers envelope and lowercased response headers", async () => {
		const payload = { success: true, data: { resource: { id: 1 } } };
		const fetchMock = stubFetch(
			makeResponse({
				body: JSON.stringify(payload),
				headers: { "Content-Type": "application/json", "X-Total-Count": "3" },
			}),
		);

		const response = await httpClient.get(`${API_URL}/users/1?`);

		expect(response.data).toEqual(payload);
		expect(response.status).toBe(200);
		expect(response.headers["content-type"]).toBe("application/json");
		expect(response.headers["x-total-count"]).toBe("3");
		expect(fetchMock).toHaveBeenCalledWith(
			`${API_URL}/users/1?`,
			expect.objectContaining({ method: "GET", body: undefined }),
		);
	});

	it("serializes JSON payloads and sets the JSON content type", async () => {
		const fetchMock = stubFetch(makeResponse({ body: '{"success":true}' }));
		const data = { message: "hello" };

		const response = await httpClient.post(`${API_URL}/messages`, data, {
			headers: { authorization: "Bearer token" },
		});

		expect(response.data).toEqual({ success: true });
		expect(fetchMock).toHaveBeenCalledWith(
			`${API_URL}/messages`,
			expect.objectContaining({
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					authorization: "Bearer token",
					"Content-Type": "application/json",
				},
			}),
		);
	});

	it("sends FormData untouched without forcing a content type", async () => {
		const fetchMock = stubFetch(makeResponse({ body: '{"success":true}' }));
		const formData = new FormData();
		formData.append("description", "hello");

		await httpClient.patch(`${API_URL}/users/1?`, formData, {
			headers: { authorization: "Bearer token" },
		});

		const [, init] = fetchMock.mock.calls[0];
		expect(init.method).toBe("PATCH");
		expect(init.body).toBe(formData);
		expect(init.headers).toEqual({ authorization: "Bearer token" });
	});

	it("serializes params into the query string", async () => {
		const fetchMock = stubFetch(makeResponse({ body: "{}" }));

		await httpClient.get(`${API_URL}/users`, {
			params: { page: 2, tags: ["a", "b"], missing: undefined },
		});

		expect(fetchMock.mock.calls[0][0]).toBe(
			`${API_URL}/users?page=2&tags%5B%5D=a&tags%5B%5D=b`,
		);
	});

	it("rejects with a normalized response on 4xx and 5xx", async () => {
		const errorBody = { success: false, errors: { login: ["not found"] } };
		stubFetch(makeResponse({ status: 404, body: JSON.stringify(errorBody) }));

		const error = await httpClient
			.get(`${API_URL}/users/unknown`)
			.catch((err) => err);

		expect(error.message).toBe("Request failed with status code 404");
		expect(error.response.status).toBe(404);
		expect(error.response.data).toEqual(errorBody);
	});

	it("rejects without a response on network errors", async () => {
		const networkError = new TypeError("Failed to fetch");
		vi.stubGlobal("fetch", vi.fn().mockRejectedValue(networkError));

		const error = await httpClient.get(`${API_URL}/users`).catch((err) => err);

		expect(error).toBe(networkError);
		expect(error.response).toBeUndefined();
	});

	it("aborts the request after the default timeout", async () => {
		vi.useFakeTimers();
		vi.stubGlobal(
			"fetch",
			vi.fn(
				(_url, init) =>
					new Promise((_resolve, reject) => {
						init.signal.addEventListener("abort", () => {
							reject(new DOMException("Aborted", "AbortError"));
						});
					}),
			),
		);

		const pending = httpClient.get(`${API_URL}/slow`).catch((err) => err);
		await vi.advanceTimersByTimeAsync(10000);
		const error = await pending;

		expect(error.code).toBe("ECONNABORTED");
		expect(error.message).toBe("timeout of 10000ms exceeded");
		expect(error.response).toBeUndefined();
	});

	it("runs registered request interceptors before fetching", async () => {
		const fetchMock = stubFetch(makeResponse({ body: "{}" }));
		const eject = httpClient.interceptors.request.use((config) => {
			config.headers.authorization = "Bearer refreshed";
			return config;
		});

		try {
			await httpClient.get(`${API_URL}/users`, {
				headers: { authorization: "Bearer expired" },
			});
		} finally {
			eject();
		}

		expect(fetchMock.mock.calls[0][1].headers).toEqual({
			authorization: "Bearer refreshed",
		});
	});

	it("drops ejected request interceptors", async () => {
		const fetchMock = stubFetch(makeResponse({ body: "{}" }));
		const eject = httpClient.interceptors.request.use((config) => {
			config.headers["x-intercepted"] = "1";
			return config;
		});

		eject();
		await httpClient.get(`${API_URL}/users`);

		expect(fetchMock.mock.calls[0][1].headers).toEqual({});
	});

	it("keeps the DataProvider envelope contract", async () => {
		const payload = { success: true, data: { resource: { id: 7 } } };
		const fetchMock = stubFetch(
			makeResponse({
				body: JSON.stringify(payload),
				headers: { "Content-Type": "application/json" },
			}),
		);
		const api = dataProvider(
			httpClient,
			API_URL,
			"api-key",
			"token-storage-key",
		);

		const response = await api.getList("users", { page: 1 });

		expect(response.data).toEqual(payload);
		expect(fetchMock.mock.calls[0][0]).toBe(
			`${API_URL}/users?page=1&api_key=api-key`,
		);
	});

	it("resolves an empty body to an empty string", async () => {
		stubFetch(makeResponse({ status: 204, body: "" }));

		const response = await httpClient.delete(`${API_URL}/users/1?`);

		expect(response.status).toBe(204);
		expect(response.data).toBe("");
	});
});
