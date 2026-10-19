export const utf8ToBase64url = (str) =>
	btoa(String.fromCharCode(...new TextEncoder().encode(str)))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");