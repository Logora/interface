import { PasswordAuth } from '../PasswordAuth';

describe("PasswordAuth", () => {
	it('should return correct default values', () => {
		const passwordAuth = new PasswordAuth("provider", "userData");
		
		expect(passwordAuth.getSessionId()).toBeNull();
		expect(passwordAuth.isSameUser("random")).toBe(true);
	});

	describe("shouldInitAuth", () => {
		it('should return true if userData present', () => {
			const passwordAuth = new PasswordAuth("provider", "userData");
			
			expect(passwordAuth.shouldInitAuth()).toBe(true);
		});

		it('should return true if userData null', () => {
			const passwordAuth = new PasswordAuth("provider", null);
			
			expect(passwordAuth.shouldInitAuth()).toBe(false);
		});

		it('should return true if userData empty', () => {
			const passwordAuth = new PasswordAuth("provider", "");
			
			expect(passwordAuth.shouldInitAuth()).toBe(false);
		});
	});

	describe("getAuthorizationParams", () => {
		it('should return correct params', () => {
			const userData = {email: "myusername", password: "mypassword"};
			const passwordAuth = new PasswordAuth("provider", userData);
			const authorizationParams = passwordAuth.getAuthorizationParams();
			
			expect(authorizationParams.grant_type).toBe("password");
			expect(authorizationParams.username).toBe(userData.email);
			expect(authorizationParams.password).toBe(userData.password);
			expect(authorizationParams.session_id).toBe(null);
		});
	});
});