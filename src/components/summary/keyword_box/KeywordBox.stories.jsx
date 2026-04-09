export default {
	title: "Summary/Keyword Box",
	component: KeywordBox,
	args: {},
	argTypes: {},
};

import React from "react";
import { IntlProvider } from "react-intl";
import { KeywordBox } from "./KeywordBox";

export const DefaultKeywordBox = () => {
	return (
		<IntlProvider locale="en">
			<KeywordBox
				keyword={"Politics"}
				occurrences={879}
				color={"#FBC62F"}
				handleClick={() => console.log("DO SOMETHING")}
			/>
		</IntlProvider>
	);
};

export const KeywordBoxRed = () => {
	return (
		<IntlProvider locale="en">
			<KeywordBox
				keyword={"Sports"}
				occurrences={475}
				color={"red"}
				handleClick={() => console.log("DO SOMETHING")}
			/>
		</IntlProvider>
	);
};

export const KeywordBoxPurple = () => {
	return (
		<IntlProvider locale="en">
			<KeywordBox
				keyword={"Medical"}
				occurrences={321}
				color={"purple"}
				handleClick={() => console.log("DO SOMETHING")}
			/>
		</IntlProvider>
	);
};
