import { AuthProvider } from "@logora/debate/auth/use_auth";
import { httpClient } from "@logora/debate/data/axios_client";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import { DataProviderContext } from "@logora/debate/data/data_provider";
import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { AuthInitializer, decodeJwtPayload } from "./AuthInitializer";

vi.mock("@logora/debate/data/axios_client", () => ({
	httpClient: { post: vi.fn(), interceptors: { request: { use: vi.fn(), eject: vi.fn() }, response: { use: vi.fn(), eject: vi.fn() } } },
}));
vi.mock("@logora/debate/hooks/use_auth_required", () => ({ useAuthRequired: () => vi.fn() }));
vi.mock("@logora/debate/user/onboarding_modal", () => ({
	saveOnboardingBeforeLogin: vi.fn(),
	OnboardingModal: ({ onConsentConfirmed }) => (
		<button data-testid="onboarding-modal" onClick={() => onConsentConfirmed(null, { accepts_terms: true })} />
	),
}));

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

        it("decodes UTF-8 characters in the payload", () => {
                const payload = Buffer.from(JSON.stringify({ first_name: "Hélène", last_name: "Müller-Çelik" })).toString("base64url");
                expect(decodeJwtPayload(`header.${payload}.signature`)).toEqual({ first_name: "Hélène", last_name: "Müller-Çelik" });
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

describe("AuthInitializer with showOnboardingBeforeLogin", () => {
	const assertion = `${base64Url({ alg: "HS256" })}.${base64Url({ first_name: "Jane", last_name: "Doe" })}.sig`;
	const config = { shortname: "myapp", auth: { type: "jwt", showOnboardingBeforeLogin: true } };

	const renderInitializer = (dataProvider) =>
		render(
			<ConfigProvider config={config}>
				<DataProviderContext.Provider value={{ dataProvider }}>
					<AuthProvider>
						<AuthInitializer authUrl="https://auth.com/" authType="jwt" provider="myapp" assertion={assertion} />
					</AuthProvider>
				</DataProviderContext.Provider>
			</ConfigProvider>,
		);

	const me = () => ({ getOneWithToken: vi.fn().mockResolvedValue({ data: { success: true, data: { resource: { slug: "jane" } } } }) });

	beforeEach(() => {
		vi.clearAllMocks();
		localStorage.clear();
	});

	it("logs in an existing user without showing the modal", async () => {
		httpClient.post.mockResolvedValue({ data: { access_token: "t", created_at: 0, expires_in: 3600 } });
		const dataProvider = me();
		renderInitializer(dataProvider);

		await waitFor(() => expect(dataProvider.getOneWithToken).toHaveBeenCalled());
		expect(httpClient.post).toHaveBeenCalledWith("https://auth.com/", expect.objectContaining({ create_user: false }));
		expect(screen.queryByTestId("onboarding-modal")).toBeNull();
	});

	it("shows the modal for a new user, then creates the account after consent", async () => {
		httpClient.post
			.mockRejectedValueOnce({ response: { data: { error: "invalid_grant", error_description: "user_not_found" } } })
			.mockResolvedValueOnce({ data: { access_token: "t", created_at: 0, expires_in: 3600 } });
		const dataProvider = me();
		renderInitializer(dataProvider);

		await screen.findByTestId("onboarding-modal");
		expect(dataProvider.getOneWithToken).not.toHaveBeenCalled();

		await act(async () => screen.getByTestId("onboarding-modal").click());

		await waitFor(() => expect(dataProvider.getOneWithToken).toHaveBeenCalled());
		expect(httpClient.post).toHaveBeenCalledTimes(2);
		expect(httpClient.post.mock.calls[1][1]).not.toHaveProperty("create_user");
		expect(screen.queryByTestId("onboarding-modal")).toBeNull();
	});

	it("does not show the modal on other login errors", async () => {
		httpClient.post.mockRejectedValue({ response: { data: { error: "invalid_grant", error_description: "expired" } } });
		renderInitializer(me());

		await waitFor(() => expect(httpClient.post).toHaveBeenCalled());
		expect(screen.queryByTestId("onboarding-modal")).toBeNull();
	});
});
