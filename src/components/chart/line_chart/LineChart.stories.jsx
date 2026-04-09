import React from "react";
import { IntlProvider } from "react-intl";
import { LineChart } from "./LineChart";

const FILTER_OPTIONS = [
	{ name: "day", value: "day", text: "day" },
	{ name: "week", value: "week", text: "week" },
];
const data = [
	{
		label: "My dataset",
		contentColor: "#b6f542",
		data: [
			{ dimension: "2024-01-20", value: 4 },
			{ dimension: "2024-01-21", value: 15 },
			{ dimension: "2024-01-22", value: 8 },
		],
	},
];

const noop = () => {};

const meta = {
	title: "Chart/Line Chart",
	component: LineChart,
	args: {
		filterOptions: FILTER_OPTIONS,
		className: "myClassName",
		title: "My chart title",
		onFilterChange: noop,
		labels: null,
		data,
	},
	argTypes: {
		filterOptions: { control: "object" },
		className: { control: "text" },
		title: { control: "text" },
		onFilterChange: { control: false },
		labels: { control: "object" },
		data: { control: "object" },
	},
	render: (args) => (
		<IntlProvider locale="en">
			<LineChart {...args} />
		</IntlProvider>
	),
};

export default meta;

const renderStory = (overrides = {}) =>
	meta.render({ ...meta.args, ...overrides });

export const DefaultLineChart = (props) => renderStory(props);

const data2 = [
	{
		label: "My dataset",
		contentColor: "#b6f542",
		data: [
			{ dimension: "2024-01-20", value: 4 },
			{ dimension: "2024-01-21", value: 15 },
			{ dimension: "2024-01-22", value: 8 },
		],
	},
	{
		label: "My dataset 2",
		contentColor: "#4287f5",
		data: [
			{ dimension: "2024-01-20", value: 27 },
			{ dimension: "2024-01-21", value: 35 },
			{ dimension: "2024-01-22", value: 4 },
		],
	},
];

export const MultiLineChart = (props) => renderStory({ data: data2, ...props });
