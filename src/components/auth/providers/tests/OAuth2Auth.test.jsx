import { OAuth2Auth } from '../OAuth2Auth';

describe('OAuth2Auth', () => {
	describe("shouldInitAuth", () => {
		it('should return true if sessionId present', () => {
			const oauth2Auth = new OAuth2Auth("provider", "sessionId");
			
			expect(oauth2Auth.shouldInitAuth()).toBe(true);
		});

		it('should return true if sessionId null', () => {
			const oauth2Auth = new OAuth2Auth("provider", null);
			
			expect(oauth2Auth.shouldInitAuth()).toBe(false);
		});

		it('should return true if sessionId empty', () => {
			const oauth2Auth = new OAuth2Auth("provider", "");
			
			expect(oauth2Auth.shouldInitAuth()).toBe(false);
		});
	});
	
	describe("isSameUser", () => {
		const sessionId = "new-random-session-id";

		it('should return true if same session id', () => {
			const oauth2Auth = new OAuth2Auth("provider", sessionId);
			
			expect(oauth2Auth.isSameUser(sessionId)).toBe(true);
		});

		it('should return false if empty session ID', () => {
			const oauth2Auth = new OAuth2Auth("provider", null);
			
			expect(oauth2Auth.isSameUser("random")).toBe(false);
		});

		it('should return false if wrong session id', () => {
			const oauth2Auth = new OAuth2Auth("provider", sessionId);
			
			expect(oauth2Auth.isSameUser("random")).toBe(false);
		});
	});

	describe("getAuthorizationParams", () => {
		it('should return correct params', () => {
			const sessionId = "random-session-id";
			const oauth2Auth = new OAuth2Auth("provider", sessionId);
			const authorizationParams = oauth2Auth.getAuthorizationParams();
			
			expect(authorizationParams.grant_type).toBe("assertion");
			expect(authorizationParams.assertion_type).toBe("oauth2");
			expect(authorizationParams.assertion).toBe(sessionId);
			expect(authorizationParams.session_id).toBe(sessionId);
		});
	});
});