import { describe, expect, it } from "vitest";
import {
	EMAIL_UNAVAILABLE_ERROR,
	getAuthErrorCode,
	isEmailUnavailableError,
} from "./authErrors";

describe("authErrors", () => {
	const emailUnavailable = {
		response: { data: { error: "invalid_grant", error_description: "email_unavailable" } },
	};

	it("reads the error code from the token endpoint response", () => {
		expect(getAuthErrorCode(emailUnavailable)).toBe(EMAIL_UNAVAILABLE_ERROR);
	});

	it("returns null for errors without a response", () => {
		expect(getAuthErrorCode(true)).toBeNull();
		expect(getAuthErrorCode(undefined)).toBeNull();
	});

	it("detects the email_unavailable error", () => {
		expect(isEmailUnavailableError(emailUnavailable)).toBe(true);
		expect(isEmailUnavailableError({ response: { data: { error_description: "user_not_found" } } })).toBe(false);
		expect(isEmailUnavailableError(true)).toBe(false);
	});
});
