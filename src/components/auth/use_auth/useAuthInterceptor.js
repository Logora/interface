import { useEffect } from "react";
import { useAuthToken } from '@logora/debate.auth.use_auth';

export const useAuthInterceptor = (httpClient, authUrl, tokenKey) => {
    const { getToken, refreshToken } = useAuthToken(httpClient, authUrl, tokenKey);

    const isTokenExpired = (tokenObject) => {
        try {
            return tokenObject.expires_at < (Date.now() / 1000);
        } catch (err) {
            return false;
        }
    }

    useEffect(() => {
        httpClient.interceptors.request.use(
            (config) => {
                const originalRequest = config;
                if(originalRequest.headers.Authorization) {
                    const tokenObject = getToken();
                    if (
                        tokenObject &&
                        isTokenExpired(tokenObject) &&
                        config.url !== authUrl
                    ) {
                        return refreshToken().then((accessToken) => {
                            const header = "Bearer " + accessToken;
                            originalRequest.headers.Authorization = header;
                            return Promise.resolve(originalRequest);
                        });
                    }
                }
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );
    }, []);

    return null;
}