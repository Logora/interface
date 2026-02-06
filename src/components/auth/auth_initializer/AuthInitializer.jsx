import { useEffect } from 'react';
import { httpClient } from '@logora/debate.data.axios_client';
import { authTokenHandler, useAuthActions } from '@logora/debate.auth.use_auth';
import { useAuthInterceptor } from '@logora/debate.auth.use_auth';
import { useAuthRequired } from "@logora/debate.hooks.use_auth_required";
import AuthProviderFactory from '@logora/debate.auth.providers';

export const AuthInitializer = ({ authUrl, authType, provider, assertion }) => {
    const tokenKey = "logora_user_token";
    useAuthInterceptor(httpClient, authUrl, tokenKey);

    const { getToken, removeToken } = authTokenHandler(httpClient, authUrl, tokenKey);
    const { loginUser, logoutUser, fetchUser } = useAuthActions(httpClient, authUrl, tokenKey);
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