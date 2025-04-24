import { makeStorage } from "./AuthStorage";

export const authTokenHandler = (httpClient, authUrl, tokenKey) => {
    const storage = makeStorage(tokenKey);

    const getToken = () => {
        return storage.getToken();
    }

    const removeToken = () => {
        storage.removeToken();
    }

    const setToken = (token, sessionId) => {
        const tokenObject = {
            ...token,
            expires_at: token.created_at + token.expires_in,
            session_id: sessionId
        };
        storage.setToken(tokenObject);
    }

    const fetchToken = (authParams) => {
        const sessionId = authParams.session_id;
        return new Promise((resolve, reject) => {
            return httpClient.post(authUrl, authParams).then(response => {
                if(response.data.access_token) {
                    const token = response.data;
                    setToken(token, sessionId);
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(error => {
                reject(error);
            });
        });
    }

    const refreshToken = () => {
        const tokenObject = getToken();
        const data = {
            grant_type: 'refresh_token',
            refresh_token: tokenObject.refresh_token,
        };
        return new Promise((resolve, reject) => {
            return httpClient.post(authUrl, data).then(response => {
                if(response.data.access_token) {
                    const token = response.data;
                    setToken(token, tokenObject.session_id);
                    resolve(token.access_token);
                } else {
                    reject(response);
                }
            }).catch(error => {
                reject(error);
            });
        });
    }

    return {
        getToken,
        removeToken,
        fetchToken,
        refreshToken
    }
}