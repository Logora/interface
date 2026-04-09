import React from "react";
import { IntlProvider } from "react-intl";
import { Modal } from "./Modal";
import { ModalProvider } from "./ModalProvider";

export default {
	title: "Dialog/Modal",
	component: Modal,
	args: {
		title: null,
		showCloseButton: false,
		fullScreen: false,
		children: "Are you sure you want to continue ?",
	},
	argTypes: {
		title: { control: "text" },
		showCloseButton: { control: "boolean" },
		fullScreen: { control: "boolean" },
		children: { control: "text" },
	},
	render: ({ children, ...args }) => (
		<div style={{ width: "150px", height: "80px" }}>
			<IntlProvider locale="en">
				<ModalProvider>
					<Modal {...args}>
						<div>{children}</div>
					</Modal>
				</ModalProvider>
			</IntlProvider>
		</div>
	),
};

export const DefaultModal = {};

export const ModalWithCloseButton = {
	args: {
		title: "Confirm your action",
		showCloseButton: true,
	},
};

export const ModalFullScreen = {
	args: {
		title: "Confirm your action",
		fullScreen: true,
		showCloseButton: true,
	},
};
