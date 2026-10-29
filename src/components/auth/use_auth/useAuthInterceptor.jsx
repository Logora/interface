import { useEffect } from "react";
import { authTokenHandler } from "./authTokenHandler";

export const useAuthInterceptor = (httpClient, authUrl, tokenKey) => {
	useEffect(() => {
		const { ensureValidToken } = authTokenHandler(
			httpClient,
			authUrl,
			tokenKey,
		);
		const ejectInterceptor =
			httpClient.interceptors.request.use(ensureValidToken);

		return () => {
			httpClient.interceptors.request.eject?.(ejectInterceptor);
		};
	}, []);

	return null;
};
