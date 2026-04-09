import { AuthProvider } from "@logora/debate/auth/use_auth";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { IntlProvider } from "react-intl";
import { TranslationButton } from "./TranslationButton";

const callback = vi.fn();

it("should render with the correct text", () => {
	const translationButton = render(
		<IntlProvider locale="en">
			<AuthProvider>
				<TranslationButton language="fr" callback={callback} />
			</AuthProvider>
		</IntlProvider>,
	);
	const renderedButton = translationButton.getByText(
		/Translated from French - Show original/i,
	);
	expect(renderedButton).toBeTruthy();
});

it("should call callback func on click", async () => {
	const translationButton = render(
		<IntlProvider locale="en">
			<AuthProvider>
				<TranslationButton language="fr" callback={callback} />
			</AuthProvider>
		</IntlProvider>,
	);
	const renderedButton = translationButton.getByText(
		/Translated from French - Show original/i,
	);
	expect(renderedButton).toBeTruthy();

	await userEvent.click(renderedButton);
	expect(callback).toHaveBeenCalledTimes(1);
});
