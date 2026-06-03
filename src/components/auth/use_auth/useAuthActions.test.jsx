import { render, screen, act } from "@testing-library/react";
import React from "react";
import { AuthProvider } from "./AuthProvider";
import { useAuth } from "./useAuth";
import { DataProviderContext } from "@logora/debate/data/data_provider";
import { authTokenHandler } from "./authTokenHandler";
import { useAuthActions } from "./useAuthActions";

vi.mock("./authTokenHandler", () => ({
	authTokenHandler: vi.fn(),
}));

const AUTH_URL = "https://example.com/auth";
const TOKEN_KEY = "token-key";

const AuthStateDisplay = () => {
	const { authError, isLoggingIn, isLoggedIn } = useAuth();
	return (
		<div>
			<span data-testid="auth-error">{authError ? "true" : "false"}</span>
			<span data-testid="is-logging-in">{isLoggingIn ? "true" : "false"}</span>
			<span data-testid="is-logged-in">{isLoggedIn ? "true" : "false"}</span>
		</div>
	);
};

const LoginWithNullComponent = () => {
	const { loginUser } = useAuthActions(null, AUTH_URL, TOKEN_KEY);
	return (
		<div>
			<button data-testid="login-btn" onClick={() => loginUser(null)}>
				Login
			</button>
			<AuthStateDisplay />
		</div>
	);
};

const LoginWithParamsComponent = () => {
	const { loginUser } = useAuthActions(null, AUTH_URL, TOKEN_KEY);
	const authParams = { grant_type: "password", username: "test", password: "secret" };
	return (
		<div>
			<button data-testid="login-btn" onClick={() => loginUser(authParams)}>
				Login
			</button>
			<AuthStateDisplay />
		</div>
	);
};

describe("useAuthActions", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should set auth error when authParams is null without calling fetchToken", () => {
		const dataProvider = { getOneWithToken: vi.fn() };
		const fetchToken = vi.fn();
		const removeToken = vi.fn();
		authTokenHandler.mockReturnValue({ fetchToken, removeToken });

		render(
			<DataProviderContext.Provider value={{ dataProvider }}>
				<AuthProvider>
					<LoginWithNullComponent />
				</AuthProvider>
			</DataProviderContext.Provider>,
		);

		act(() => {
			screen.getByTestId("login-btn").click();
		});

		expect(fetchToken).not.toHaveBeenCalled();
		expect(screen.getByTestId("auth-error").textContent).toBe("true");
		expect(screen.getByTestId("is-logging-in").textContent).toBe("false");
	});

	it("should call fetchToken and fetchUser on successful auth", async () => {
		const dataProvider = { getOneWithToken: vi.fn() };
		const fetchToken = vi.fn().mockResolvedValue({ data: { access_token: "token" } });
		const removeToken = vi.fn();
		authTokenHandler.mockReturnValue({ fetchToken, removeToken });

		dataProvider.getOneWithToken.mockResolvedValue({
			data: { success: true, data: { resource: { id: 1, name: "Test User" } } },
		});

		render(
			<DataProviderContext.Provider value={{ dataProvider }}>
				<AuthProvider>
					<LoginWithParamsComponent />
				</AuthProvider>
			</DataProviderContext.Provider>,
		);

		await act(async () => {
			screen.getByTestId("login-btn").click();
		});

		expect(fetchToken).toHaveBeenCalled();
		expect(dataProvider.getOneWithToken).toHaveBeenCalledWith("me", "");
		expect(screen.getByTestId("is-logged-in").textContent).toBe("true");
		expect(screen.getByTestId("auth-error").textContent).toBe("false");
	});
});