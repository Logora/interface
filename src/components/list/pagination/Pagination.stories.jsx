import React from "react";
import { Pagination } from "./Pagination";

const noop = () => {};

const meta = {
	title: "List/Pagination",
	component: Pagination,
	args: {
		buttonText: "Next page",
		currentPage: 1,
		perPage: 10,
		totalElements: 20,
		hideLoader: false,
		isLoading: false,
		onLoad: noop,
	},
	argTypes: {
		buttonText: { control: "text" },
		currentPage: { control: "number" },
		perPage: { control: "number" },
		totalElements: { control: "number" },
		hideLoader: { control: "boolean" },
		isLoading: { control: "boolean" },
		onLoad: { control: false },
	},
	render: (args) => <Pagination {...args} />,
};

export default meta;

export const DefaultPagination = {};

export const LoadingElementsPagination = {
	args: {
		isLoading: true,
	},
};
