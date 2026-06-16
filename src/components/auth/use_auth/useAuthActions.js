import { useDataProvider } from "@logora/debate/data/data_provider";
import { authTokenHandler } from "./authTokenHandler";
import { useAuth } from "./useAuth";

export const EMAIL_CONSENT_STORAGE_KEY = "logora:emailConsent";

export const useAuthActions = (httpClient, authUrl, tokenKey) => {
	const { removeToken, fetchToken } = authTokenHandler(
		httpClient,
		authUrl,
		tokenKey,
	);
	const { setCurrentUser, setIsLoggedIn, setIsLoggingIn, setAuthError } =
		useAuth();
	const api = useDataProvider();

	const loginUser = (authParams) => {
		if (!authParams) {
			setAuthError(true);
			setIsLoggingIn(false);
			return;
		}
    return fetchToken(authParams)
        .then((response) => {
            return fetchUser();
        })
        .catch((error) => {
            setAuthError(error);
        });
	};

	const logoutUser = () => {
		setIsLoggedIn(false);
		setIsLoggingIn(false);
		setCurrentUser({});
		removeToken();
		sessionStorage.removeItem(EMAIL_CONSENT_STORAGE_KEY);
		dispatchLogoutEvent();
	};

	const fetchUser = () => {
		return api
			.getOneWithToken("me", "")
			.then((response) => {
				if (response.data.success) {
					const currentUser = response.data.data.resource;
					setCurrentUser(currentUser);
					setIsLoggedIn(true);
					setIsLoggingIn(false);
					dispatchLoginEvent(currentUser);
				} else {
					setAuthError(true);
					setIsLoggedIn(false);
					setIsLoggingIn(false);
					setCurrentUser({});
					removeToken();
				}
			})
			.catch((error) => {
				setAuthError(true);
				setIsLoggedIn(false);
				setIsLoggingIn(false);
				setCurrentUser({});
				removeToken();
			});
	};

	const dispatchLoginEvent = (currentUser) => {
		if (typeof window !== "undefined") {
			window.dispatchEvent(
				new CustomEvent("logora:authentication:success", {
					detail: {
						user: currentUser,
					},
				}),
			);
		}
	};

	const dispatchLogoutEvent = () => {
		if (typeof window !== "undefined") {
			window.dispatchEvent(new CustomEvent("logora:authentication:logout"));
		}
	};

	return {
		loginUser,
		logoutUser,
		fetchUser,
	};
};
