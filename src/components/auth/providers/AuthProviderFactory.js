import { FormAuth } from './FormAuth';
import { PasswordAuth } from './PasswordAuth';
import { JWTAuth } from './JWTAuth';
import { OAuth2Auth } from './OAuth2Auth';
import { OAuth2ServerAuth } from './OAuth2ServerAuth';

export class AuthProviderFactory {
    static create = (authType, provider, assertion, socialProvider) => {
        if(authType === "oauth2") {
            return new OAuth2Auth(provider, assertion);
        } else if(authType === "oauth2_server") {
            return new OAuth2ServerAuth(provider, assertion, "oauth2_server");
        } else if(authType === "social" && socialProvider === "form") {
            return new FormAuth(provider, assertion);
        } else if(authType === "social" && socialProvider === "password") {
            return new PasswordAuth(provider, assertion);
        } else if(authType === "social") {
            return new OAuth2ServerAuth(provider, assertion, socialProvider);
        } else {
            return new JWTAuth(provider, assertion);
        }
    }
}