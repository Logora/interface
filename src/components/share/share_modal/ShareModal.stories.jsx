export default {
	title: "Share/Share Modal",
	component: ShareModal,
	args: {
		title: "Modal title",
		shareUrl: "https://app.logora.fr/share/p/48656",
		shareText: "Text",
		shareTitle: "Title",
		shareCode: '<iframe src="https://api.logora.fr/embed.html?shortname="[...]',
		showShareCode: true,
	},
	argTypes: {
		title: { control: "text" },
		shareUrl: { control: "text" },
		shareText: { control: "text" },
		shareTitle: { control: "text" },
		shareCode: { control: "text" },
		showShareCode: { control: "boolean" },
	},
};

import { ModalProvider } from "@logora/debate/dialog/modal";
import React from "react";
import { IntlProvider } from "react-intl";
import { ShareModal } from "./ShareModal";

export const DefaultShareModal = () => {
	return (
		<div style={{ width: "300px", height: "300px" }}>
			<IntlProvider locale="en">
				<ModalProvider>
					<ShareModal
						title="Modal title"
						shareUrl="https://app.logora.fr/share/p/48656"
						shareText="Text"
						shareTitle="Title"
						shareCode='<iframe src="https://api.logora.fr/embed.html?shortname="[...]'
						showShareCode={true}
					/>
				</ModalProvider>
			</IntlProvider>
		</div>
	);
};
