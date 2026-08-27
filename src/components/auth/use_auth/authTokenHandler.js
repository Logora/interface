import { makeStorage } from "./AuthStorage";

export const authTokenHandler = (httpClient, authUrl, tokenKey) => {
	const storage = makeStorage(tokenKey);

	const getToken = () => {
		return storage.getToken();
	};

	const removeToken = () => {
		storage.removeToken();
	};

	const setToken = (token, sessionId) => {
		const tokenObject = {
			...token,
			expires_at: token.created_at + token.expires_in,
			session_id: sessionId,
		};
		storage.setToken(tokenObject);
	};

	let fetchInFlight = null;

	const fetchToken = (authParams) => {
		if (fetchInFlight) return fetchInFlight;
		const sessionId = authParams.session_id;
		const request = new Promise((resolve, reject) => {
			return httpClient
				.post(authUrl, authParams)
				.then((response) => {
					if (response.data.access_token) {
						const token = response.data;
						setToken(token, sessionId);
						resolve(response);
					} else {
						reject(response);
					}
				})
				.catch((error) => {
					reject(error);
				});
		}).finally(() => {
			fetchInFlight = null;
		});
		fetchInFlight = request;
		return request;
	};

	let refreshInFlight = null;

	const refreshToken = () => {
		if (refreshInFlight) return refreshInFlight;
		const tokenObject = getToken();
		const data = {
			grant_type: "refresh_token",
			refresh_token: tokenObject.refresh_token,
		};
		refreshInFlight = httpClient
			.post(authUrl, data)
			.then((response) => {
				if (response.data.access_token) {
					const token = response.data;
					setToken(token, tokenObject.session_id);
					return token.access_token;
				}
				return Promise.reject(response);
			})
			.finally(() => {
				refreshInFlight = null;
			});
		return refreshInFlight;
	};

	return {
		getToken,
		removeToken,
		fetchToken,
		refreshToken,
	};
};
