const HTTP_TIMEOUT = 10000;
const JSON_CONTENT_TYPE = "application/json";

const requestInterceptors = [];

const formatParam = (value) => {
	if (value instanceof Date) {
		return value.toISOString();
	}
	return String(value);
};

const appendParams = (url, params) => {
	if (!params) {
		return url;
	}

	const search = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value === undefined || value === null) {
			continue;
		}
		if (Array.isArray(value)) {
			for (const item of value) {
				if (item !== undefined && item !== null) {
					search.append(`${key}[]`, formatParam(item));
				}
			}
		} else {
			search.append(key, formatParam(value));
		}
	}

	const query = search.toString();
	if (!query) {
		return url;
	}

	return url.includes("?") ? `${url}&${query}` : `${url}?${query}`;
};

const hasHeader = (headers, name) => {
	const target = name.toLowerCase();
	return Object.keys(headers).some((key) => key.toLowerCase() === target);
};

const normalizeHeaders = (headers) => {
	const normalized = {};
	if (!headers) {
		return normalized;
	}
	for (const [key, value] of headers.entries()) {
		normalized[key.toLowerCase()] = value;
	}
	return normalized;
};

const buildBody = (data, headers) => {
	if (data === undefined || data === null) {
		return undefined;
	}
	if (typeof FormData !== "undefined" && data instanceof FormData) {
		return data;
	}
	if (typeof data === "string") {
		return data;
	}
	if (!hasHeader(headers, "content-type")) {
		headers["Content-Type"] = JSON_CONTENT_TYPE;
	}
	return JSON.stringify(data);
};

const parseBody = (text) => {
	if (!text) {
		return "";
	}
	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
};

const createHttpError = (message, response, code) => {
	const error = new Error(message);
	if (response) {
		error.response = response;
	}
	if (code) {
		error.code = code;
	}
	return error;
};

const runRequestInterceptors = async (config) => {
	let result = config;
	for (const interceptor of [...requestInterceptors]) {
		result = await interceptor(result);
	}
	return result;
};

const request = async (method, url, data, config) => {
	const { params, headers = {}, timeout = HTTP_TIMEOUT } = config ?? {};

	const requestConfig = await runRequestInterceptors({
		url: appendParams(url, params),
		method,
		headers: { ...headers },
		data,
		timeout,
	});

	const controller = new AbortController();
	let timedOut = false;
	const timer = timeout
		? setTimeout(() => {
				timedOut = true;
				controller.abort();
			}, timeout)
		: null;

	try {
		const response = await fetch(requestConfig.url, {
			method: requestConfig.method,
			headers: requestConfig.headers,
			body: buildBody(requestConfig.data, requestConfig.headers),
			signal: controller.signal,
		});

		const httpResponse = {
			data: parseBody(await response.text()),
			status: response.status,
			statusText: response.statusText,
			headers: normalizeHeaders(response.headers),
		};

		if (!response.ok) {
			throw createHttpError(
				`Request failed with status code ${response.status}`,
				httpResponse,
			);
		}

		return httpResponse;
	} catch (error) {
		if (timedOut) {
			throw createHttpError(
				`timeout of ${timeout}ms exceeded`,
				undefined,
				"ECONNABORTED",
			);
		}
		throw error;
	} finally {
		if (timer) {
			clearTimeout(timer);
		}
	}
};

export const httpClient = {
	interceptors: {
		request: {
			use: (onFulfilled) => {
				requestInterceptors.push(onFulfilled);
				return () => {
					const index = requestInterceptors.indexOf(onFulfilled);
					if (index !== -1) {
						requestInterceptors.splice(index, 1);
					}
				};
			},
			eject: (interceptor) => {
				if (typeof interceptor === "function") {
					interceptor();
				}
			},
		},
	},
	get: (url, config) => request("GET", url, undefined, config),
	delete: (url, config) => request("DELETE", url, undefined, config),
	post: (url, data, config) => request("POST", url, data, config),
	patch: (url, data, config) => request("PATCH", url, data, config),
};
