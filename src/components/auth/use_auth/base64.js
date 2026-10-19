export const utf8ToBase64url = (str) =>
	btoa(String.fromCharCode(...new TextEncoder().encode(str)))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");

export const base64urlToUtf8 = (str) => {
	const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
	const padded = base64.padEnd(
		base64.length + ((4 - (base64.length % 4)) % 4),
		"=",
	);
	const bytes = Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
	return new TextDecoder("utf-8").decode(bytes);
};
