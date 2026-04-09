import { ModalProvider } from "@logora/debate/dialog/modal";
import React from "react";
import { IntlProvider } from "react-intl";
import { ConfirmModal } from "./ConfirmModal";

export default {
	title: "Dialog/Confirm Modal",
	component: ConfirmModal,
	args: {
		title: "Modal Title",
		question: "Are you sure you want to start this debate ?",
		confirmLabel: "Yes",
		cancelLabel: "No",
	},
	argTypes: {
		title: { control: "text" },
		question: { control: "text" },
		confirmLabel: { control: "text" },
		cancelLabel: { control: "text" },
	},
	render: (args) => (
		<div style={{ width: "350px", height: "100px" }}>
			<IntlProvider locale="en">
				<ModalProvider>
					<ConfirmModal {...args} />
				</ModalProvider>
			</IntlProvider>
		</div>
	),
};

export const DefaultConfirmModal = {};
