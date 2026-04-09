export default {
	title: "Modal/Side Modal",
	component: SideModal,
	args: {
		modalTitle: "Choose your side",
		title: "Example Debate",
		isNeutral: false,
	},
	argTypes: {
		modalTitle: { control: "text" },
		title: { control: "text" },
		isNeutral: { control: "boolean" },
	},
};

import { ModalProvider } from "@logora/debate/dialog/modal";
import React from "react";
import { IntlProvider } from "react-intl";
import { SideModal } from "./SideModal";

const debateName = "Example Debate";
const debatePositions = [
	{ id: 1, name: "Position A" },
	{ id: 2, name: "Position B" },
	{ id: 3, name: "Position C" },
];

export const SideModalExample = () => {
	const disabledPositions = [];

	const handleChooseSide = (positionId) => {
		console.log(`Selected position: ${positionId}`);
	};

	return (
		<div style={{ width: "400px", height: "100px" }}>
			<ModalProvider>
				<IntlProvider locale="en">
					<SideModal
						modalTitle={"Choose your side"}
						title={debateName}
						positions={debatePositions}
						disabledPositions={disabledPositions}
						onChooseSide={handleChooseSide}
						isNeutral={false}
					/>
				</IntlProvider>
			</ModalProvider>
		</div>
	);
};

export const SideModalWithNeutralPosition = () => {
	const disabledPositions = [];

	const handleChooseSide = (positionId) => {
		console.log(`Selected position: ${positionId}`);
	};

	return (
		<div style={{ width: "400px", height: "100px" }}>
			<ModalProvider>
				<IntlProvider locale="en">
					<SideModal
						modalTitle={"Choose your side"}
						title={debateName}
						positions={debatePositions}
						disabledPositions={disabledPositions}
						onChooseSide={handleChooseSide}
						isNeutral={true}
					/>
				</IntlProvider>
			</ModalProvider>
		</div>
	);
};

export const SideModalWithDisabledPositions = () => {
	const disabledPositions = [{ id: 2, name: "Position B" }];

	const handleChooseSide = (positionId) => {
		console.log(`Selected position: ${positionId}`);
	};

	return (
		<div style={{ width: "400px", height: "100px" }}>
			<ModalProvider>
				<IntlProvider locale="en">
					<SideModal
						modalTitle={"Choose your side"}
						title={debateName}
						positions={debatePositions}
						disabledPositions={disabledPositions}
						onChooseSide={handleChooseSide}
						isNeutral={false}
					/>
				</IntlProvider>
			</ModalProvider>
		</div>
	);
};
