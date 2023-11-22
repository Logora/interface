import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { httpClient } from '@logora/debate.data.axios_client';
import { useAuthToken, useAuthActions } from '@logora/debate.auth.use_auth';
import { useAuthInterceptor } from '@logora/debate.auth.use_auth';
import { useAuthRequired } from "@logora/debate.hooks.use_auth_required";
import AuthProviderFactory from '@logora/debate.auth.providers';

export const AuthInitializer = ({ authType, provider, assertion }) => {
    const tokenKey = "logora_user_token";
    useAuthInterceptor(httpClient, process.env.API_AUTH_URL, tokenKey);

    const { getToken, removeToken } = useAuthToken(httpClient, process.env.API_AUTH_URL, tokenKey);
    const { loginUser, logoutUser, fetchUser } = useAuthActions(httpClient, process.env.API_AUTH_URL, tokenKey);
	const requireAuthentication = useAuthRequired();

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if(typeof window !== "undefined") {
            window.addEventListener('logora:authentication:require', requireAuthentication);
            return () => {
                window.removeEventListener('logora:authentication:require', requireAuthentication);
            };
        }
    }, []);

    const checkAuth = () => {
        const authProvider = getAuthProvider();
        const tokenObject = getToken();
        if(!!tokenObject) {
            const currentSessionId = tokenObject.session_id;
            if(authProvider.isSameUser(currentSessionId)) {
                fetchUser();
            } else {
                removeToken();
                initAuth(authProvider);
            }
        } else {
            initAuth(authProvider);
        }
    }

    const initAuth = (authProvider) => {
        if(authProvider.shouldInitAuth()) {
            const authParams = authProvider.getAuthorizationParams();
            if(authParams) {
                loginUser(authParams);
            }
        } else {
            logoutUser();
        }
    }

    const getAuthProvider = () => {
        return AuthProviderFactory.create(authType, provider, assertion);
    }

    return null;
}

AuthInitializer.propTypes = {
    /** Authentication type, can be 'oauth2', 'oauth2_server', 'social' or 'jwt' */
    authType: PropTypes.string.isRequired,
    /** User provider name */
    provider: PropTypes.string,
    /** Auth assertion, for example an OAuth2 authorization code, depending on the auth type */
    assertion: PropTypes.string
}