import { JWTAuth } from '../JWTAuth';

describe('JWTAuth', () => {
	const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

	describe("shouldInitAuth", () => {
		it('should return true if token present', () => {
			const jwtAuth = new JWTAuth("provider", "token");
			
			expect(jwtAuth.shouldInitAuth()).toBe(true);
		});

		it('should return true if token null', () => {
			const jwtAuth = new JWTAuth("provider", null);
			
			expect(jwtAuth.shouldInitAuth()).toBe(false);
		});

		it('should return true if token empty', () => {
			const jwtAuth = new JWTAuth("provider", "");
			
			expect(jwtAuth.shouldInitAuth()).toBe(false);
		});
	});
	
	describe("isSameUser", () => {
		it('should return true if same session id', () => {
			const jwtAuth = new JWTAuth("provider", jwtToken);
			
			expect(jwtAuth.isSameUser("SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")).toBe(true);
		});

		it('should return false if empty token', () => {
			const jwtAuth = new JWTAuth("provider", null);
			
			expect(jwtAuth.isSameUser("random")).toBe(false);
		});

		it('should return false if wrong signature', () => {
			const jwtAuth = new JWTAuth("provider", jwtToken);
			
			expect(jwtAuth.isSameUser("random")).toBe(false);
		});
	});

	describe("getAuthorizationParams", () => {
		it('should return correct params', () => {
			const jwtAuth = new JWTAuth("provider", jwtToken);
			const authorizationParams = jwtAuth.getAuthorizationParams();
			
			expect(authorizationParams.grant_type).toBe("assertion");
			expect(authorizationParams.assertion_type).toBe("jwt");
			expect(authorizationParams.assertion).toBe(jwtToken);
			expect(authorizationParams.session_id).toBe("SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
		});
	});
});