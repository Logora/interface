import { FormAuth } from '../FormAuth';

describe("FormAuth", () => {
	it('should return correct default values', () => {
		const formAuth = new FormAuth("provider", "userData");
		
		expect(formAuth.getSessionId()).toBeNull();
		expect(formAuth.isSameUser("random")).toBe(true);
	});

	describe("shouldInitAuth", () => {
		it('should return true if userData present', () => {
			const formAuth = new FormAuth("provider", "userData");
			
			expect(formAuth.shouldInitAuth()).toBe(true);
		});

		it('should return true if userData null', () => {
			const formAuth = new FormAuth("provider", null);
			
			expect(formAuth.shouldInitAuth()).toBe(false);
		});

		it('should return true if userData empty', () => {
			const formAuth = new FormAuth("provider", "");
			
			expect(formAuth.shouldInitAuth()).toBe(false);
		});
	});

	describe("getAuthorizationParams", () => {
		it('should return correct params', () => {
			const userData = {"data": "mydata"};
			const userDataStr = JSON.stringify(userData);
			const formAuth = new FormAuth("provider", userData);
			
			const authorizationParams = formAuth.getAuthorizationParams();
			
			expect(authorizationParams.grant_type).toBe("assertion");
			expect(authorizationParams.assertion).toBe(btoa(userDataStr));
			expect(authorizationParams.assertion_type).toBe("form");
			expect(authorizationParams.session_id).toBe(null);
		});
	});
});