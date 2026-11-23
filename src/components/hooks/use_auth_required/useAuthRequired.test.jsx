import { ConfigContext } from "@logora/debate/data/config_provider";
import { useModal } from "@logora/debate/dialog/modal";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { AuthContext } from "@logora/debate/auth/use_auth";
import { ModuleContext, useAuthRequired } from "./useAuthRequired";

vi.mock("@logora/debate/dialog/modal", () => ({
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

	const renderInComments = (auth, comments = { subscribersOnly: true }) =>
		render(
			<ConfigContext.Provider value={{ config: { comments } }}>
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
		expect(window.dispatchEvent).not.toHaveBeenCalled();
	});

	it("shows the login modal to a visitor with the module texts", () => {
		window.dispatchEvent = vi.fn();
		const { getByText } = renderInComments(
			{ isLoggedIn: false, currentUser: {} },
			{ subscribersOnly: true, loginModal: { title: "Connectez-vous" } },
		);

		fireEvent.click(getByText("Authenticate"));

		expect(window.dispatchEvent).toHaveBeenCalled();
		expect(showModal.mock.calls[0][0].props.children.props.title).toBe(
			"Connectez-vous",
		);
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
