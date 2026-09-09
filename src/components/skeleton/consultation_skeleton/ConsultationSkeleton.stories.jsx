import React from "react";
import { ConsultationSkeleton } from "./ConsultationSkeleton";

const meta = {
	title: "Skeleton/Consultation Skeleton",
	component: ConsultationSkeleton,
	args: {
		enableAnimation: true,
		numberOfProposals: 4,
	},
	argTypes: {
		enableAnimation: { control: "boolean" },
		numberOfProposals: { control: "number" },
	},
	render: (args) => (
		<div style={{ width: "900px" }}>
			<ConsultationSkeleton {...args} />
		</div>
	),
};

export default meta;

export const DefaultConsultationSkeleton = {};

export const ConsultationSkeletonWithoutAnimation = {
	args: {
		enableAnimation: false,
	},
};
