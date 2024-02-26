import { useAuth } from "./useAuth";
import { authTokenHandler } from "./authTokenHandler";
import { useDataProvider } from '@logora/debate.data.data_provider';

export const useAuthActions = (httpClient, authUrl, tokenKey) => {
    const { removeToken, fetchToken } = authTokenHandler(httpClient, authUrl, tokenKey);
    const { setCurrentUser, setIsLoggedIn, setIsLoggingIn, setAuthError } = useAuth();
    const api = useDataProvider();

    const loginUser = (authParams) => {
        fetchToken(authParams).then(response => {
            fetchUser();
        }).catch(error => {
            setAuthError(error);
        });
    }

    const logoutUser = () => {
        setIsLoggedIn(false);
        setIsLoggingIn(false);
        setCurrentUser({});
        removeToken();
    }

    const fetchUser = () => {
        api.getOneWithToken('me', '').then(response => {
            if(response.data.success) {
                const currentUser = response.data.data.resource;
                setCurrentUser(currentUser);
                setIsLoggedIn(true);
                setIsLoggingIn(false);
                dispatchLoginEvent(currentUser);
            } else {
                setAuthError(true);
                setIsLoggedIn(false);
                setIsLoggingIn(false);
            }
        }).catch(error => {
            setAuthError(true);
        });
    }

    const dispatchLoginEvent = (currentUser) => {
        if(typeof window !== "undefined") {
            window.dispatchEvent(
                new CustomEvent("logora:authentication:success", {
                    detail: {
                        user: currentUser
                    }
                })
            );
        }
    }

    return {
        loginUser,
        logoutUser,
        fetchUser
    };
}