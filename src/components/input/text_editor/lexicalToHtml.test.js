import { describe, expect, it } from "vitest";
import { lexicalToHtml } from "./lexicalToHtml";

describe("lexicalToHtml", () => {
	it("should convert lexical content to HTML", () => {
		const lexicalContent = {
			root: {
				children: [
					{
						children: [
							{
								detail: 0,
								format: 0,
								mode: "normal",
								style: "",
								text: "Hello world",
								type: "text",
								version: 1,
							},
						],
						direction: "ltr",
						format: "",
						indent: 0,
						type: "paragraph",
						version: 1,
					},
				],
				direction: "ltr",
				format: "",
				indent: 0,
				type: "root",
				version: 1,
			},
		};

		const html = lexicalToHtml(lexicalContent);
		expect(html).toContain("Hello world");
		expect(html).toContain("<p");
	});

	it("should handle non-breaking spaces correctly", () => {
		const lexicalContent = {
			root: {
				children: [
					{
						children: [
							{
								detail: 0,
								format: 0,
								mode: "normal",
								style: "",
								text: "86\u00A0523",
								type: "text",
								version: 1,
							},
						],
						direction: "ltr",
						format: "",
						indent: 0,
						type: "paragraph",
						version: 1,
					},
				],
				direction: "ltr",
				format: "",
				indent: 0,
				type: "root",
				version: 1,
			},
		};

		const html = lexicalToHtml(lexicalContent);
		// Should contain nbsp entity, not literal &nbsp; text
		expect(html).toMatch(/86(&nbsp;|\u00A0)523/);
		// Should NOT contain the literal string &nbsp; (which would be double-encoded as &amp;nbsp;)
		expect(html).not.toContain("&amp;nbsp;");
	});

	it("should handle text with multiple non-breaking spaces", () => {
		const lexicalContent = {
			root: {
				children: [
					{
						children: [
							{
								detail: 0,
								format: 0,
								mode: "normal",
								style: "",
								text: "Word\u00A0from\u00A0document",
								type: "text",
								version: 1,
							},
						],
						direction: "ltr",
						format: "",
						indent: 0,
						type: "paragraph",
						version: 1,
					},
				],
				direction: "ltr",
				format: "",
				indent: 0,
				type: "root",
				version: 1,
			},
		};

		const html = lexicalToHtml(lexicalContent);
		// Should properly handle multiple non-breaking spaces
		expect(html).toMatch(/Word.*from.*document/);
		expect(html).not.toContain("&amp;nbsp;");
	});
});
