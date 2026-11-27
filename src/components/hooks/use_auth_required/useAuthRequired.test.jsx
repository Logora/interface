import { ConfigContext } from "@logora/debate/data/config_provider";
import { ModalProvider, useModal } from "@logora/debate/dialog/modal";
import { IconProvider } from "@logora/debate/icons/icon_provider";
import * as regularIcons from "@logora/debate/icons/regular_icons";
import { fireEvent, render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router";
import React from "react";
import { AuthContext } from "@logora/debate/auth/use_auth";
import { ModuleContext, useAuthRequired } from "./useAuthRequired";

vi.mock("@logora/debate/dialog/modal", async (importOriginal) => ({
	...(await importOriginal()),
	useModal: vi.fn(),
}));

const TestComponent = () => {
	const requireAuthentication = useAuthRequired();

	return (
		<div>
			<button onClick={() => requireAuthentication({ foo: "bar" })}>
				Authenticate
			</button>
		</div>
	);
};

describe("useAuthRequired", () => {
	beforeAll(() => {
		HTMLDialogElement.prototype.showModal ||= function () {
			this.setAttribute("open", "");
		};
		HTMLDialogElement.prototype.close ||= function () {
			this.removeAttribute("open");
		};
	});

	const showModal = vi.fn();
	const hideModal = vi.fn();

	beforeEach(() => {
		useModal.mockReturnValue({
			showModal,
			hideModal,
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should call requireAuthentication on button click", () => {
		const config = {
			auth: {
				disableLoginModal: false,
			},
		};

		const redirectUrl = window.location.href;

		window.dispatchEvent = vi.fn();

		const { getByText } = render(
			<ConfigContext.Provider value={{ config }}>
				<TestComponent />
			</ConfigContext.Provider>,
		);

		fireEvent.click(getByText("Authenticate"));

		expect(window.dispatchEvent).toHaveBeenCalledWith(
			new CustomEvent("logora:authentication:requested", {
				detail: { redirectUrl },
			}),
		);
	});

	it("should not show AuthModal if disableLoginModal is true", () => {
		const config = {
			auth: {
				disableLoginModal: true,
			},
		};

		const redirectUrl = window.location.href;

		const { getByText } = render(
			<ConfigContext.Provider value={{ config }}>
				<TestComponent />
			</ConfigContext.Provider>,
		);

		fireEvent.click(getByText("Authenticate"));

		expect(window.dispatchEvent).toHaveBeenCalledWith(
			new CustomEvent("logora:authentication:requested", {
				detail: { redirectUrl },
			}),
		);

		expect(showModal).not.toHaveBeenCalled();
	});

	const renderInComments = (
		auth,
		comments = { subscribersOnly: true },
		extraConfig = {},
	) =>
		render(
			<ConfigContext.Provider value={{ config: { comments, ...extraConfig } }}>
				<AuthContext.Provider value={auth}>
					<ModuleContext.Provider value="comments">
						<TestComponent />
					</ModuleContext.Provider>
				</AuthContext.Provider>
			</ConfigContext.Provider>,
		);

	it("shows the subscription modal to a logged-in non-subscriber", () => {
		window.dispatchEvent = vi.fn();
		const { getByText } = renderInComments({
			isLoggedIn: true,
			currentUser: { is_subscriber: false },
		});

		fireEvent.click(getByText("Authenticate"));

		expect(showModal).toHaveBeenCalledTimes(1);
		expect(window.dispatchEvent).toHaveBeenCalledTimes(1);
		expect(window.dispatchEvent).toHaveBeenCalledWith(
			new CustomEvent("logora:subscription:requested", {
				detail: { module: "comments", redirectUrl: window.location.href },
			}),
		);
	});

	it("only dispatches the subscription event when the subscription modal is disabled", () => {
		window.dispatchEvent = vi.fn();
		const { getByText } = renderInComments(
			{ isLoggedIn: true, currentUser: { is_subscriber: false } },
			{ subscribersOnly: true },
			{ auth: { disableSubscriptionModal: true } },
		);

		fireEvent.click(getByText("Authenticate"));

		expect(window.dispatchEvent).toHaveBeenCalledTimes(1);
		expect(window.dispatchEvent.mock.calls[0][0].type).toBe(
			"logora:subscription:requested",
		);
		expect(showModal).not.toHaveBeenCalled();
	});

	it("passes the module subscription texts and link to the subscription modal", async () => {
		window.dispatchEvent = vi.fn();
		const subscriptionModal = {
			title: "Abonnez-vous",
			text: "Réservé aux abonnés",
			buttonLabel: "Je m'abonne",
			url: "https://example.com/abonnement",
		};
		const { getByText } = renderInComments(
			{ isLoggedIn: true, currentUser: { is_subscriber: false } },
			{ subscribersOnly: true, subscriptionModal },
		);

		fireEvent.click(getByText("Authenticate"));

		render(
			<MemoryRouter>
				<ConfigContext.Provider value={{ config: {} }}>
					<IntlProvider locale="en">
						<IconProvider library={regularIcons}>
							<ModalProvider>{showModal.mock.calls[0][0]}</ModalProvider>
						</IconProvider>
					</IntlProvider>
				</ConfigContext.Provider>
			</MemoryRouter>,
		);

		expect(await screen.findByText("Abonnez-vous")).toBeInTheDocument();
		expect(screen.getByText("Réservé aux abonnés")).toBeInTheDocument();
		expect(screen.getByText("Je m'abonne").closest("a")).toHaveAttribute(
			"href",
			subscriptionModal.url,
		);
	});

	it("treats a user without the subscriber attribute as a non-subscriber", () => {
		window.dispatchEvent = vi.fn();
		const { getByText } = renderInComments({
			isLoggedIn: true,
			currentUser: {},
		});

		fireEvent.click(getByText("Authenticate"));

		expect(showModal).toHaveBeenCalledTimes(1);
		expect(window.dispatchEvent).toHaveBeenCalledTimes(1);
		expect(window.dispatchEvent).toHaveBeenCalledWith(
			new CustomEvent("logora:subscription:requested", {
				detail: { module: "comments", redirectUrl: window.location.href },
			}),
		);
	});

	it("does not restrict a module whose subscribersOnly is false", () => {
		window.dispatchEvent = vi.fn();
		const { getByText } = renderInComments(
			{ isLoggedIn: true, currentUser: { is_subscriber: false } },
			{ subscribersOnly: false },
		);

		fireEvent.click(getByText("Authenticate"));

		expect(window.dispatchEvent).toHaveBeenCalled();
	});

	it("shows the subscription modal to a visitor, with a link to the login modal", () => {
		window.dispatchEvent = vi.fn();
		const { getByText } = renderInComments(
			{ isLoggedIn: false, currentUser: {} },
			{ subscribersOnly: true, loginModal: { title: "Connectez-vous" } },
		);

		fireEvent.click(getByText("Authenticate"));

		expect(window.dispatchEvent).toHaveBeenCalledTimes(1);
		expect(window.dispatchEvent.mock.calls[0][0].type).toBe(
			"logora:subscription:requested",
		);
		const subscriptionModal = showModal.mock.calls[0][0].props.children;
		expect(subscriptionModal.props.onLogin).toBeTypeOf("function");

		subscriptionModal.props.onLogin();

		expect(window.dispatchEvent.mock.calls.map(([e]) => e.type)).toContain(
			"logora:authentication:requested",
		);
		expect(showModal).toHaveBeenCalledTimes(2);
		// Module settings are not passed to the login modal.
		expect(showModal.mock.calls[1][0].props.children.props).toEqual({
			foo: "bar",
		});
	});

	it("does not offer the login link to a logged-in non-subscriber", () => {
		window.dispatchEvent = vi.fn();
		const { getByText } = renderInComments({
			isLoggedIn: true,
			currentUser: { is_subscriber: false },
		});

		fireEvent.click(getByText("Authenticate"));

		expect(
			showModal.mock.calls[0][0].props.children.props.onLogin,
		).toBeUndefined();
	});

	it("shows the login modal to a visitor on a module that is not restricted", () => {
		window.dispatchEvent = vi.fn();
		const { getByText } = renderInComments(
			{ isLoggedIn: false, currentUser: {} },
			{ subscribersOnly: false },
		);

		fireEvent.click(getByText("Authenticate"));

		expect(window.dispatchEvent.mock.calls.map(([e]) => e.type)).toContain(
			"logora:authentication:requested",
		);
		expect(showModal.mock.calls[0][0].props.children.props).toEqual({
			foo: "bar",
		});
	});

	it("does not ask a subscriber to subscribe", () => {
		window.dispatchEvent = vi.fn();
		const { getByText } = renderInComments({
			isLoggedIn: true,
			currentUser: { is_subscriber: true },
		});

		fireEvent.click(getByText("Authenticate"));

		expect(window.dispatchEvent).toHaveBeenCalled();
	});
});
