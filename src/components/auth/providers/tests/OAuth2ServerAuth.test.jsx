import { OAuth2ServerAuth } from '../OAuth2ServerAuth';

describe('OAuth2ServerAuth', () => {
	describe("shouldInitAuth", () => {
		it('should return true if code present in URL', () => {
			const assertion = "random-assertion";

			delete window.location;
			window.location = { search: `?code=${assertion}` };

			const oauth2ServerAuth = new OAuth2ServerAuth("provider", null);
			
			expect(oauth2ServerAuth.shouldInitAuth()).toBe(true);
		});

		it('should return true if assertion passed as argument', () => {
			const oauth2ServerAuth = new OAuth2ServerAuth("provider", "assertion");
			
			expect(oauth2ServerAuth.shouldInitAuth()).toBe(true);
		});

		it('should return true if assertion null', () => {
			window.location = {}
			const oauth2ServerAuth = new OAuth2ServerAuth("provider", null);
			
			expect(oauth2ServerAuth.shouldInitAuth()).toBe(false);
		});

		it('should return true if assertion empty', () => {
			window.location = {}
			const oauth2ServerAuth = new OAuth2ServerAuth("provider", "");
			
			expect(oauth2ServerAuth.shouldInitAuth()).toBe(false);
		});
	});

	describe("isSameUser", () => {
		it('should return always return true', () => {
			const oauth2ServerAuth = new OAuth2ServerAuth("provider", "random-id");
			
			expect(oauth2ServerAuth.isSameUser()).toBe(true);
		});
	});

	describe("getAuthorizationParams", () => {
		it('should return correct params', () => {
			const assertion = "random-assertion";

			delete window.location;
			window.location = { search: `?code=${assertion}` };
		 
			const socialProvider = "my-social-network";
			const oauth2ServerAuth = new OAuth2ServerAuth("provider", assertion, socialProvider);
			const authorizationParams = oauth2ServerAuth.getAuthorizationParams();
			
			expect(authorizationParams.grant_type).toBe("assertion");
			expect(authorizationParams.assertion_type).toBe(socialProvider);
			expect(authorizationParams.assertion).toBe(assertion);
			expect(authorizationParams.session_id).toBe(null);
		});
	});

	describe("code parameter handling", () => {
		it('should not duplicate code parameter', () => {
			const assertion = "new-code";
			const existingCode = "old-code";

			delete window.location;
			window.location = { search: `?code=${existingCode}` };

			const oauth2ServerAuth = new OAuth2ServerAuth("provider", assertion);
			const urlParams = new URLSearchParams(window.location.search);
			
			expect(urlParams.getAll('code').length).toBe(1);
			expect(urlParams.get('code')).toBe(existingCode);
		});
	});
});
