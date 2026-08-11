import { decodeJwtPayload } from "./AuthInitializer";

const base64Url = (value) =>
        btoa(JSON.stringify(value))
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
                .replace(/=+$/, "");

describe("decodeJwtPayload", () => {
        it("decodes a JWT payload with user profile fields", () => {
                const token = `${base64Url({ alg: "HS256" })}.${base64Url({
                        first_name: "Jane",
                        last_name: "Doe",
                        image_url: "https://example.com/a.png",
                })}.signature`;

                expect(decodeJwtPayload(token)).toEqual({
                        first_name: "Jane",
                        last_name: "Doe",
                        image_url: "https://example.com/a.png",
                });
        });

        it("returns null for an invalid token", () => {
                expect(decodeJwtPayload("not-a-jwt")).toBeNull();
                expect(decodeJwtPayload("header.%%invalid%%payload")).toBeNull();
        });

        it("returns null when the token is missing", () => {
                expect(decodeJwtPayload(null)).toBeNull();
                expect(decodeJwtPayload(undefined)).toBeNull();
                expect(decodeJwtPayload("")).toBeNull();
        });
});
