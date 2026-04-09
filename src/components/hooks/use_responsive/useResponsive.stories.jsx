import React from "react";
import { ResponsiveProvider } from "./ResponsiveProvider";
import { useResponsive } from "./useResponsive";

const meta = {
	title: "Hooks/Use Responsive",
	component: () => null,
	args: {
		containerPath: "rootContainer",
	},
	argTypes: {
		containerPath: {
			control: "text",
		},
	},
	render: ({ containerPath }) => (
		<div id="rootContainer">
			<ResponsiveProvider containerPath={containerPath}>
				<ResponsiveComponent />
			</ResponsiveProvider>
		</div>
	),
};

export default meta;

const ResponsiveComponent = () => {
	const { isMobile, isTablet, isDesktop, elementWidth } = useResponsive();

	return (
		<>
			<div>{`Change container width (${elementWidth}) to see the different responsive elements`}</div>
			{isMobile && <div>Shown in mobile container only</div>}
			{isTablet && <div>Shown in tablet container only</div>}
			{isDesktop && <div>Shown in desktop container only</div>}
		</>
	);
};

export const DefaultInformationBox = () => {
	return (
		<div id="rootContainer">
			<ResponsiveProvider containerPath={"rootContainer"}>
				<ResponsiveComponent />
			</ResponsiveProvider>
		</div>
	);
};
