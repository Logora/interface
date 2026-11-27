import { utf8ToBase64url } from "@logora/debate/auth/use_auth";
import { useLocation } from "react-router";

// Builds the SSO login/signup link (redirect and tracking parameters, or OAuth2 dialog URL).
export const useAuthLink = ({
	authType,
	clientId,
	oAuthRedirectUri,
	scope,
	redirectParameter = "logora_redirect",
	trackingParameters = {},
}) => {
	const location = useLocation();

	const getLinkWithRedirect = (url) => {
		if (typeof window !== "undefined") {
			const redirectUrl = url === "CURRENT_LOCATION" ? window.location : url;
			const parsedUrl = new URL(redirectUrl, window.location.origin);
			const params = parsedUrl.searchParams;
			const originalParams = new URLSearchParams(location.search);

			if (params.has("code")) {
				params.delete("code");
			}

			if (redirectParameter) {
				params.append(redirectParameter, window.location.toString());
			}
			for (const [key, value] of Object.entries(trackingParameters)) {
				let parsedValue = value;
				if (parsedValue) {
					const currentPath = location.pathname.slice(
						0,
						location.pathname.lastIndexOf("/"),
					);
					parsedValue = parsedValue.replace(
						"{{UTM_CAMPAIGN}}",
						originalParams.get("utm_campaign"),
					);
					parsedValue = parsedValue.replace(
						"{{CURRENT_PATH}}",
						decodeURIComponent(currentPath),
					);
				}
				if (key === "metadata" && parsedValue) {
					parsedValue = utf8ToBase64url(parsedValue);
				}
				params.append(key, parsedValue);
			}
			parsedUrl.search = params.toString();
			return parsedUrl.toString();
		}
		return "";
	};

	const getOAuthDialogUrl = (url) => {
		const baseUrl = new URL(url);
		baseUrl.searchParams.delete("code");
		baseUrl.searchParams.append("client_id", clientId);
		baseUrl.searchParams.append("redirect_uri", oAuthRedirectUri);
		baseUrl.searchParams.append("scope", scope);
		baseUrl.searchParams.append("response_type", "code");
		if (typeof window !== "undefined") {
			const parsedUrl = new URL(window.location.href);
			parsedUrl.searchParams.delete("code");
			baseUrl.searchParams.append("state", window.btoa(parsedUrl.toString()));
		}

		return baseUrl.href;
	};

	const getAuthLink = (url) => {
		if (authType === "oauth2_server") {
			return getOAuthDialogUrl(url);
		}
		return getLinkWithRedirect(url);
	};

	return getAuthLink;
};
