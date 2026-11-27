import { ConfigProvider } from "@logora/debate/data/config_provider";
import { ModalProvider } from "@logora/debate/dialog/modal";
import { IconProvider } from "@logora/debate/icons/icon_provider";
import * as regularIcons from "@logora/debate/icons/regular_icons";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router";
import { SubscriptionModal } from "./SubscriptionModal";

beforeAll(() => {
	HTMLDialogElement.prototype.showModal ||= function () {
		this.setAttribute("open", "");
	};
	HTMLDialogElement.prototype.close ||= function () {
		this.removeAttribute("open");
	};
});

const renderModal = (props, config = {}) =>
	render(
		<MemoryRouter>
			<ConfigProvider config={config}>
				<IntlProvider locale="en">
					<IconProvider library={regularIcons}>
						<ModalProvider>
							<SubscriptionModal {...props} />
						</ModalProvider>
					</IconProvider>
				</IntlProvider>
			</ConfigProvider>
		</MemoryRouter>,
	);

describe("SubscriptionModal", () => {
	it("renders the configured texts and link", () => {
		renderModal({
			title: "Abonnez-vous pour commenter",
			text: "Réservé aux abonnés",
			buttonLabel: "Je m'abonne",
			url: "https://example.com/subscribe",
		});

		expect(screen.getByText("Abonnez-vous pour commenter")).toBeTruthy();
		expect(screen.getByText("Réservé aux abonnés")).toBeTruthy();
		expect(
			screen.getByText("Je m'abonne").closest("a").getAttribute("href"),
		).toBe("https://example.com/subscribe");
	});

	it("falls back to default texts", () => {
		renderModal({ url: "https://example.com/subscribe" });

		expect(screen.getByText("Subscribe to comment")).toBeTruthy();
		expect(screen.getByText("Subscribe")).toBeTruthy();
	});

	it("shows the client logo like the login modal", () => {
		renderModal(
			{},
			{
				logo_url: "https://example.com/logo.png",
				provider: { companyName: "Example" },
			},
		);

		expect(screen.getByAltText("Logo Example").getAttribute("src")).toBe(
			"https://example.com/logo.png",
		);
	});

	it("offers a login link when onLogin is given", () => {
		const onLogin = vi.fn();
		renderModal({ onLogin });

		expect(screen.getByText("Already a subscriber ?")).toBeTruthy();
		fireEvent.click(screen.getByText("Sign in"));
		expect(onLogin).toHaveBeenCalledTimes(1);
	});

	it("links SSO clients straight to their login page", () => {
		const onLogin = vi.fn();
		renderModal(
			{ onLogin },
			{ auth: { type: "jwt", login_url: "https://example.com/login" } },
		);

		const link = screen.getByText("Sign in").closest("a");
		const href = new URL(link.getAttribute("href"));
		expect(href.origin + href.pathname).toBe("https://example.com/login");
		expect(href.searchParams.get("logora_redirect")).toBe(window.location.href);
		fireEvent.click(link);
		expect(onLogin).not.toHaveBeenCalled();
	});

	it("keeps the login modal when the client handles login itself", () => {
		const onLogin = vi.fn();
		renderModal(
			{ onLogin },
			{
				auth: {
					type: "jwt",
					login_url: "https://example.com/login",
					disableLoginModal: true,
				},
			},
		);

		fireEvent.click(screen.getByText("Sign in"));
		expect(onLogin).toHaveBeenCalledTimes(1);
	});

	it("has no login link without onLogin", () => {
		renderModal({});

		expect(screen.queryByText("Sign in")).toBeNull();
	});

	it("hides the button without a link", () => {
		renderModal({});

		expect(screen.queryByText("Subscribe")).toBeNull();
	});
});
