import { AuthProviderFactory } from '../AuthProviderFactory';
import { OAuth2Auth } from '../OAuth2Auth';
import { OAuth2ServerAuth } from '../OAuth2ServerAuth';
import { FormAuth } from '../FormAuth';
import { PasswordAuth } from '../PasswordAuth';
import { JWTAuth } from '../JWTAuth';

describe("AuthProviderFactory", () => {
    describe("create", () => {
        it('should return OAuth2Auth with correct params', () => {
            const oAuth2Auth = AuthProviderFactory.create("oauth2", "provider", "assertion");

            expect(oAuth2Auth instanceof OAuth2Auth).toBeTruthy();
            const authParams = oAuth2Auth.getAuthorizationParams();
            expect(authParams.grant_type).toBe("assertion");
            expect(authParams.assertion_type).toBe("oauth2");
            expect(authParams.assertion).toBe("assertion");
            expect(authParams.session_id).toBe("assertion");
        });

        it('should return OAuth2ServerAuth with correct params', () => {
            const oAuth2ServerAuth = AuthProviderFactory.create("oauth2_server", "provider", "assertion");

            expect(oAuth2ServerAuth instanceof OAuth2ServerAuth).toBeTruthy();
            const authParams = oAuth2ServerAuth.getAuthorizationParams();
            expect(authParams.grant_type).toBe("assertion");
            expect(authParams.assertion_type).toBe("oauth2_server");
        });

        it('should return PasswordAuth with correct params', () => {
            const passwordAuth = AuthProviderFactory.create("social", "provider", "assertion", "password");

            expect(passwordAuth instanceof PasswordAuth).toBeTruthy();
            const authParams = passwordAuth.getAuthorizationParams();
            expect(authParams.grant_type).toBe("password");
        });

        it('should return FormAuth with correct params', () => {
            const formAuth = AuthProviderFactory.create("social", "provider", "assertion", "form");

            expect(formAuth instanceof FormAuth).toBeTruthy();
            const authParams = formAuth.getAuthorizationParams();
            expect(authParams.grant_type).toBe("assertion");
            expect(authParams.assertion_type).toBe("form");
        });

        it('should return OAuth2ServerAuth with correct params', () => {
            const oAuth2ServerAuth = AuthProviderFactory.create("social", "provider", "assertion", "random-provider");

            expect(oAuth2ServerAuth instanceof OAuth2ServerAuth).toBeTruthy();
            const authParams = oAuth2ServerAuth.getAuthorizationParams();
            expect(authParams.grant_type).toBe("assertion");
            expect(authParams.assertion_type).toBe("random-provider");
        });

        it('should return JWTAuth by default with correct params', () => {
            const jwtAuth = AuthProviderFactory.create("jwt", "provider", "assertion");

            expect(jwtAuth instanceof JWTAuth).toBeTruthy();
            const authParams = jwtAuth.getAuthorizationParams();
            expect(authParams.grant_type).toBe("assertion");
            expect(authParams.assertion_type).toBe("jwt");
        });
    });
});