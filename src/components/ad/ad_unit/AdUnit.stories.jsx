import { useGoogleAdManager } from "@logora/debate/ad/use_google_ad_manager";
import React from "react";
import { AdUnit } from "./AdUnit";

export default {
	title: "Ad/Ad Unit",
	component: AdUnit,
	args: {
		id: "banner-ad",
		adPath: "/6355419/Travel",
		sizes: [[300, 250]],
	},
	argTypes: {
		id: {
			control: "text",
		},
		adPath: {
			control: "text",
		},
		sizes: {
			control: "object",
		},
	},
	render: (args) => {
		useGoogleAdManager();
		return <AdUnit {...args} />;
	},
};

export const DefaultAdUnit = {};
