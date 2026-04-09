export default {
	title: "Share/Share Box",
	component: ShareBox,
	args: {
		shareUrl: "https://example.fr/test/",
		shareTitle: "Share this !",
		shareText: "You should check this interesting link",
		showShareCode: false,
	},
	argTypes: {
		shareUrl: { control: "text" },
		shareTitle: { control: "text" },
		shareText: { control: "text" },
		showShareCode: { control: "boolean" },
	},
};

import React from "react";
import { IntlProvider } from "react-intl";
import { ShareBox } from "./ShareBox";

export const DefaultShareBox = () => {
	return (
		<IntlProvider locale="en">
			<ShareBox
				shareUrl={"https://example.fr/test/"}
				shareTitle="Share this !"
				shareText={"You should check this interesting link"}
			/>
		</IntlProvider>
	);
};

export const ShareBoxWithCodeShare = () => {
	return (
		<IntlProvider locale="en">
			<ShareBox
				showShareCode
				shareUrl={"https://example.fr/test/"}
				shareTitle="Share this !"
				shareText={"You should check this interesting link"}
			/>
		</IntlProvider>
	);
};
