import { render, screen } from "@testing-library/react";
import React from "react";
import { IntlProvider } from "react-intl";
import { TranslatedContent } from "./TranslatedContent";

describe("useTranslatedContent", () => {
	it("should render translated content", () => {
		const translation_entries = [
			{
				target_language: "fr",
				is_approved: true,
				origin_field: "title",
				translated_content: "Un titre",
			},
		];

		const component = render(
			<IntlProvider locale="fr">
				<TranslatedContent
					originalContent={"A title"}
					originalLanguage={"en"}
					targetField={"title"}
					translations={translation_entries}
				/>
			</IntlProvider>,
		);

		expect(screen.getByText("Un titre"));
	});
});
