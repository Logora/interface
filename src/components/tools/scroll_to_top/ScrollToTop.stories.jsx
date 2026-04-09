import React from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { ScrollToTop } from "./ScrollToTop";

const meta = {
	title: "Tools/Scroll To Top",
	component: ScrollToTop,
	args: {
		elementId: "test",
	},
	argTypes: {
		elementId: {
			control: "text",
		},
	},
	render: ({ elementId }) => (
		<BrowserRouter>
			<InnerComponent elementId={elementId} />
		</BrowserRouter>
	),
};

export default meta;

export const InnerComponent = ({ elementId = "test" }) => {
	const navigate = useNavigate();

	return (
		<>
			<div id="button" onClick={() => navigate("?test=kjkj")}>
				Navigate
			</div>
			<div
				id="test"
				style={{
					backgroundColor: "red",
					height: "200px",
					marginTop: "100vh",
					marginBottom: "100vh",
					scrollMarginTop: "10px",
				}}
			>
				Scroll here
			</div>
			<ScrollToTop elementId={elementId} />
		</>
	);
};

export const DefaultScrollToTop = {};
