import { describe, expect, it } from "vitest";
import { DEFAULT_SHARE_DOMAIN, buildShareUrl, shareDomain } from "./index";

const configWith = (domain) => ({
	provider: { shareDomain: domain },
});

describe("buildShareUrl", () => {
	it("uses the publisher share domain", () => {
		expect(buildShareUrl(configWith("debat.krone.at"), "a", 42)).toBe(
			"https://debat.krone.at/share/a/42",
		);
	});

	it("normalises a configured url", () => {
		expect(buildShareUrl(configWith("https://Debat.Krone.AT/"), "p", 7)).toBe(
			"https://debat.krone.at/share/p/7",
		);
	});

	it("falls back to the logora domain when the setting is missing", () => {
		expect(buildShareUrl({ provider: {} }, "g", 1)).toBe(
			`https://${DEFAULT_SHARE_DOMAIN}/share/g/1`,
		);
		expect(buildShareUrl(undefined, "c", 2)).toBe(
			`https://${DEFAULT_SHARE_DOMAIN}/share/c/2`,
		);
	});

	it("falls back to the logora domain when the setting is blank or invalid", () => {
		expect(shareDomain(configWith("  "))).toBe(DEFAULT_SHARE_DOMAIN);
		expect(shareDomain(configWith("not a host"))).toBe(DEFAULT_SHARE_DOMAIN);
	});
});
