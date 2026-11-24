import { ConfigProvider } from "@logora/debate/data/config_provider";
import { ModalProvider } from "@logora/debate/dialog/modal";
import { IconProvider } from "@logora/debate/icons/icon_provider";
import * as regularIcons from "@logora/debate/icons/regular_icons";
import { render, screen } from "@testing-library/react";
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

	it("hides the button without a link", () => {
		renderModal({});

		expect(screen.queryByText("Subscribe")).toBeNull();
	});
});
