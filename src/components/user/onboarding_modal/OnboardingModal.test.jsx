import { faker } from "@faker-js/faker";
import { AuthContext } from "@logora/debate/auth/use_auth";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import {
	DataProviderContext,
	dataProvider,
} from "@logora/debate/data/data_provider";
import { ModalProvider } from "@logora/debate/dialog/modal";
import { IconProvider } from "@logora/debate/icons/icon_provider";
import * as regularIcons from "@logora/debate/icons/regular_icons";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { IntlProvider } from "react-intl";
import { OnboardingModal } from "./OnboardingModal";

const httpClient = {
	get: vi.fn(),
	post: vi.fn(),
	patch: vi.fn(),
};

const currentUser = {
	id: faker.number.int(),
	full_name: faker.person.fullName(),
	image_url: faker.image.avatarGitHub(),
	points: faker.number.int(),
};

const currentUserWithInfos = {
	id: faker.number.int(),
	full_name: faker.person.fullName(),
	first_name: faker.person.firstName(),
	last_name: faker.person.lastName(),
	description: faker.person.jobTitle(),
	image_url: faker.image.avatarGitHub(),
	points: faker.number.int(),
};

const data = dataProvider(httpClient, "https://mock.example.api");

beforeAll(() => {
	HTMLDialogElement.prototype.showModal = function () {
		this.setAttribute("open", "");
	};
	HTMLDialogElement.prototype.close = function () {
		this.removeAttribute("open");
	};
});

describe("OnboardingModal", () => {
	it("should appear normally", async () => {
		const { queryByText } = render(
			<ModalProvider>
				<ConfigProvider
					config={{
						translation: { translationMethods: [{ fr: "en" }] },
						actions: { disableNameUpdate: true },
					}}
				>
					<IntlProvider locale="en">
						<IconProvider library={regularIcons}>
							<DataProviderContext.Provider value={{ dataProvider: data }}>
								<AuthContext.Provider
									value={{ currentUser: currentUser, isLoggedIn: true }}
								>
									<OnboardingModal />
								</AuthContext.Provider>
							</DataProviderContext.Provider>
						</IconProvider>
					</IntlProvider>
				</ConfigProvider>
			</ModalProvider>,
		);
		expect(queryByText("Last name")).toBeInTheDocument();
		expect(queryByText("First name")).toBeInTheDocument();
		expect(queryByText("0")).toBeInTheDocument();
		expect(queryByText("Update your profile")).toBeInTheDocument();
		expect(queryByText("Select an avatar")).toBeInTheDocument();
		expect(queryByText("Save")).toBeInTheDocument();
		expect(
			queryByText(
				"I declare I have read the General Conditions of Use and the Privacy policy of the debate space and accept them.",
			),
		).not.toBeInTheDocument();
		expect(
			queryByText("I agree to receive emails from the editor"),
		).not.toBeInTheDocument();
	});

	it("should appear with terms and consent", async () => {
		const { queryByText } = render(
			<ModalProvider>
				<ConfigProvider
					config={{
						translation: { translationMethods: [{ fr: "en" }] },
						actions: { disableNameUpdate: true },
					}}
				>
					<IntlProvider locale="en">
						<IconProvider library={regularIcons}>
							<DataProviderContext.Provider value={{ dataProvider: data }}>
								<AuthContext.Provider
									value={{ currentUser: currentUser, isLoggedIn: true }}
								>
									<OnboardingModal showEmailConsent showTerms />
								</AuthContext.Provider>
							</DataProviderContext.Provider>
						</IconProvider>
					</IntlProvider>
				</ConfigProvider>
			</ModalProvider>,
		);
		expect(queryByText("Last name")).toBeInTheDocument();
		expect(queryByText("First name")).toBeInTheDocument();
		expect(queryByText("0")).toBeInTheDocument();
		expect(queryByText("Update your profile")).toBeInTheDocument();
		expect(queryByText("Select an avatar")).toBeInTheDocument();
		expect(queryByText("Save")).toBeInTheDocument();
		expect(queryByText(/I declare I have read the /i)).toBeInTheDocument();
		expect(
			queryByText(/ of the debate space and accept them./i),
		).toBeInTheDocument();
		expect(
			queryByText("I agree to receive emails from the editor"),
		).toBeInTheDocument();
	});

	it("should throw an error if the name field is less than 2 characters", async () => {
		const { getByTestId, queryByText } = render(
			<ModalProvider>
				<ConfigProvider
					config={{
						translation: { translationMethods: [{ fr: "en" }] },
						actions: { disableNameUpdate: true },
					}}
				>
					<IntlProvider locale="en">
						<IconProvider library={regularIcons}>
							<DataProviderContext.Provider value={{ dataProvider: data }}>
								<AuthContext.Provider
									value={{ currentUser: currentUser, isLoggedIn: true }}
								>
									<OnboardingModal />
								</AuthContext.Provider>
							</DataProviderContext.Provider>
						</IconProvider>
					</IntlProvider>
				</ConfigProvider>
			</ModalProvider>,
		);

		const saveButton = getByTestId("save-button");
		await userEvent.click(saveButton);
		expect(queryByText("first_name is too short.")).toBeInTheDocument();
		expect(queryByText("last_name is too short.")).toBeInTheDocument();
	});

	it("should display back button when choosing an avatar", async () => {
		const { getByTestId, queryByText } = render(
			<ModalProvider>
				<ConfigProvider
					config={{
						translation: { translationMethods: [{ fr: "en" }] },
						actions: { disableNameUpdate: true },
					}}
				>
					<IntlProvider locale="en">
						<IconProvider library={regularIcons}>
							<DataProviderContext.Provider value={{ dataProvider: data }}>
								<AuthContext.Provider
									value={{ currentUser: currentUser, isLoggedIn: true }}
								>
									<OnboardingModal showEmailConsent showTerms />
								</AuthContext.Provider>
							</DataProviderContext.Provider>
						</IconProvider>
					</IntlProvider>
				</ConfigProvider>
			</ModalProvider>,
		);

		const avatarButton = getByTestId("avatar-button");
		await userEvent.click(avatarButton);

		expect(queryByText("Back")).toBeInTheDocument();
	});

	it("should throw an error if the terms are not accepted", async () => {
		const { getByTestId, queryByText } = render(
			<ModalProvider>
				<ConfigProvider
					config={{
						translation: { translationMethods: [{ fr: "en" }] },
						actions: { disableNameUpdate: true },
					}}
				>
					<IntlProvider locale="en">
						<IconProvider library={regularIcons}>
							<DataProviderContext.Provider value={{ dataProvider: data }}>
								<AuthContext.Provider
									value={{ currentUser: currentUser, isLoggedIn: true }}
								>
									<OnboardingModal showEmailConsent showTerms />
								</AuthContext.Provider>
							</DataProviderContext.Provider>
						</IconProvider>
					</IntlProvider>
				</ConfigProvider>
			</ModalProvider>,
		);

		const firstName = getByTestId("first-name");
		await userEvent.click(firstName);
		await userEvent.keyboard("First name");

		const lastName = getByTestId("last-name");
		await userEvent.click(lastName);
		await userEvent.keyboard("Last name");

		const saveButton = getByTestId("save-button");
		await userEvent.click(saveButton);
		expect(queryByText("accepts_terms must be true.")).toBeInTheDocument();
	});

	it("should displays the current user's info", async () => {
		const { getByTestId } = render(
			<ModalProvider>
				<ConfigProvider
					config={{
						translation: { translationMethods: [{ fr: "en" }] },
						actions: { disableNameUpdate: true },
					}}
				>
					<IntlProvider locale="en">
						<IconProvider library={regularIcons}>
							<DataProviderContext.Provider value={{ dataProvider: data }}>
								<AuthContext.Provider
									value={{
										currentUser: currentUserWithInfos,
										isLoggedIn: true,
									}}
								>
									<OnboardingModal />
								</AuthContext.Provider>
							</DataProviderContext.Provider>
						</IconProvider>
					</IntlProvider>
				</ConfigProvider>
			</ModalProvider>,
		);

		const firstName = getByTestId("first-name");
		expect(firstName.value).toBe(currentUserWithInfos.first_name);

		const lastName = getByTestId("last-name");
		expect(lastName.value).toBe(currentUserWithInfos.last_name);

		const description = getByTestId("description");
		expect(description.value).toBe(currentUserWithInfos.description);
	});

	describe("pendingAuth mode", () => {
		it("should render consent modal with name inputs and toggles", async () => {
			const { queryByText, queryByTestId } = render(
				<ModalProvider>
					<ConfigProvider
						config={{
							translation: { translationMethods: [{ fr: "en" }] },
							actions: { disableNameUpdate: true },
						}}
					>
						<IntlProvider locale="en">
							<IconProvider library={regularIcons}>
								<DataProviderContext.Provider value={{ dataProvider: data }}>
									<AuthContext.Provider
										value={{ currentUser: {}, isLoggedIn: false }}
									>
										<OnboardingModal
											pendingAuth={true}
											showTerms={true}
											showEmailConsent={true}
											termsUrl="https://example.com/cgu"
											privacyUrl="https://example.com/privacy"
										/>
									</AuthContext.Provider>
								</DataProviderContext.Provider>
							</IconProvider>
						</IntlProvider>
					</ConfigProvider>
				</ModalProvider>,
			);

			expect(queryByText("Complete your registration")).toBeInTheDocument();
			expect(queryByText("First name")).toBeInTheDocument();
			expect(queryByText("Last name")).toBeInTheDocument();
			expect(queryByText("Save")).toBeInTheDocument();
			expect(queryByText(/I declare I have read the /i)).toBeInTheDocument();
			expect(
				queryByText("I agree to receive emails from the editor"),
			).toBeInTheDocument();
expect(queryByText("Select an avatar")).not.toBeInTheDocument();
			expect(queryByTestId("description")).not.toBeInTheDocument();
		});

		it("should call onConsentConfirmed with profile data when submitted with valid inputs", async () => {
			const onConsentConfirmed = vi.fn();
			const { getByTestId, getByText } = render(
				<ModalProvider>
					<ConfigProvider
						config={{
							translation: { translationMethods: [{ fr: "en" }] },
							actions: { disableNameUpdate: true },
						}}
					>
						<IntlProvider locale="en">
							<IconProvider library={regularIcons}>
								<DataProviderContext.Provider value={{ dataProvider: data }}>
									<AuthContext.Provider
										value={{ currentUser: {}, isLoggedIn: false }}
									>
										<OnboardingModal
											pendingAuth={true}
											onConsentConfirmed={onConsentConfirmed}
											showTerms={true}
											showEmailConsent={true}
										/>
									</AuthContext.Provider>
								</DataProviderContext.Provider>
							</IconProvider>
						</IntlProvider>
					</ConfigProvider>
				</ModalProvider>,
			);

			const firstName = getByTestId("first-name");
			await userEvent.click(firstName);
			await userEvent.keyboard("John");

			const lastName = getByTestId("last-name");
			await userEvent.click(lastName);
			await userEvent.keyboard("Doe");

			const termsToggle = getByTestId("accepts-terms-input");
			await userEvent.click(termsToggle);

			const saveButton = getByText("Save");
			await userEvent.click(saveButton);

			expect(onConsentConfirmed).toHaveBeenCalledTimes(1);
			const formData = onConsentConfirmed.mock.calls[0][0];
			expect(formData).toBeInstanceOf(FormData);
			expect(formData.get("first_name")).toBe("John");
			expect(formData.get("last_name")).toBe("Doe");
			expect(formData.get("accepts_terms")).toBe("true");
			expect(formData.get("accepts_provider_email")).toBe("false");
			expect(formData.get("is_onboarded")).toBe("true");
		});

		it("should reject submission when terms not accepted", async () => {
			const onConsentConfirmed = vi.fn();
			const { getByTestId, queryByText } = render(
				<ModalProvider>
					<ConfigProvider
						config={{
							translation: { translationMethods: [{ fr: "en" }] },
							actions: { disableNameUpdate: true },
						}}
					>
						<IntlProvider locale="en">
							<IconProvider library={regularIcons}>
								<DataProviderContext.Provider value={{ dataProvider: data }}>
									<AuthContext.Provider
										value={{ currentUser: {}, isLoggedIn: false }}
									>
										<OnboardingModal
											pendingAuth={true}
											onConsentConfirmed={onConsentConfirmed}
											showTerms={true}
											showEmailConsent={true}
										/>
									</AuthContext.Provider>
								</DataProviderContext.Provider>
							</IconProvider>
						</IntlProvider>
					</ConfigProvider>
				</ModalProvider>,
			);

			const firstName = getByTestId("first-name");
			await userEvent.click(firstName);
			await userEvent.keyboard("John");

			const lastName = getByTestId("last-name");
			await userEvent.click(lastName);
			await userEvent.keyboard("Doe");

			const saveButton = queryByText("Save");
			await userEvent.click(saveButton);

			expect(queryByText("accepts_terms must be true.")).toBeInTheDocument();
			expect(onConsentConfirmed).not.toHaveBeenCalled();
		});
	});
});