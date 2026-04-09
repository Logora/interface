export default {
	title: "Share/Share Button",
	component: ShareButton,
	args: {
		shareUrl: "https://example.fr/test/",
		shareTitle: "Share this !",
		shareText: "You should check this interesting link",
		showText: false,
	},
	argTypes: {
		shareUrl: { control: "text" },
		shareTitle: { control: "text" },
		shareText: { control: "text" },
		showText: { control: "boolean" },
	},
};

import { ConfigProvider } from "@logora/debate/data/config_provider";
import React from "react";
import { IntlProvider } from "react-intl";
import { ShareButton } from "./ShareButton";

export const DefaultShareButton = () => {
	return (
		<div style={{ width: "200px" }}>
			<IntlProvider locale="en">
				<ConfigProvider config={{ theme: {} }}>
					<ShareButton
						shareUrl={"https://example.fr/test/"}
						shareTitle="Share this !"
						shareText={"You should check this interesting link"}
					/>
				</ConfigProvider>
			</IntlProvider>
		</div>
	);
};

export const ShareButtonWithText = () => {
	return (
		<div style={{ width: "200px" }}>
			<IntlProvider locale="en">
				<ConfigProvider config={{ theme: {} }}>
					<ShareButton
						showText
						shareUrl={"https://example.fr/test/"}
						shareTitle="Share this !"
						shareText={"You should check this interesting link"}
					/>
				</ConfigProvider>
			</IntlProvider>
		</div>
	);
};
