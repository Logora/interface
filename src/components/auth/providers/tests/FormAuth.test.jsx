import { FormAuth } from "../FormAuth";
import { utf8ToBase64url } from "@logora/debate/auth/use_auth";

describe("FormAuth", () => {
	it("should return correct default values", () => {
		const formAuth = new FormAuth("provider", "userData");

		expect(formAuth.getSessionId()).toBeNull();
		expect(formAuth.isSameUser("random")).toBe(true);
	});

	describe("shouldInitAuth", () => {
		it("should return true if userData present", () => {
			const formAuth = new FormAuth("provider", "userData");

			expect(formAuth.shouldInitAuth()).toBe(true);
		});

		it("should return true if userData null", () => {
			const formAuth = new FormAuth("provider", null);

			expect(formAuth.shouldInitAuth()).toBe(false);
		});

		it("should return true if userData empty", () => {
			const formAuth = new FormAuth("provider", "");

			expect(formAuth.shouldInitAuth()).toBe(false);
		});
	});

	describe("getAuthorizationParams", () => {
		it("should return correct params", () => {
			const userData = { data: "mydata" };
			const userDataStr = JSON.stringify(userData);
			const formAuth = new FormAuth("provider", userData);

			const authorizationParams = formAuth.getAuthorizationParams();

			expect(authorizationParams.grant_type).toBe("assertion");
			expect(authorizationParams.assertion).toBe(utf8ToBase64url(userDataStr));
			expect(authorizationParams.assertion_type).toBe("form");
			expect(authorizationParams.session_id).toBe(null);
		});

		it("should encode user data with accented characters", () => {
			const userData = { name: "Hélène", email: "hélène@example.com" };
			const userDataStr = JSON.stringify(userData);
			const formAuth = new FormAuth("provider", userData);

			const authorizationParams = formAuth.getAuthorizationParams();

			expect(authorizationParams.assertion).toBe(utf8ToBase64url(userDataStr));
		});

		it("should encode user data with CJK characters", () => {
			const userData = { name: "张伟", email: "zhangwei@example.com" };
			const userDataStr = JSON.stringify(userData);
			const formAuth = new FormAuth("provider", userData);

			const authorizationParams = formAuth.getAuthorizationParams();

			expect(authorizationParams.assertion).toBe(utf8ToBase64url(userDataStr));
		});

		it("should encode user data with emoji", () => {
			const userData = { name: "José 😀", email: "jose@example.com" };
			const userDataStr = JSON.stringify(userData);
			const formAuth = new FormAuth("provider", userData);

			const authorizationParams = formAuth.getAuthorizationParams();

			expect(authorizationParams.assertion).toBe(utf8ToBase64url(userDataStr));
		});

		it("should produce a valid base64url string (no +, /, =)", () => {
			const userData = { name: "François Müller", email: "francois@example.com" };
			const formAuth = new FormAuth("provider", userData);

			const assertion = formAuth.getAuthorizationParams().assertion;

			expect(assertion).not.toContain("+");
			expect(assertion).not.toContain("/");
			expect(assertion).not.toContain("=");
		});
	});
});
