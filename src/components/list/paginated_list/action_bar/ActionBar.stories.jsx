import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { ResponsiveProvider } from "@logora/debate/hooks/use_responsive";
import { ActionBar } from "./ActionBar";

const sortOptions = [
	{
		name: "recent",
		value: "-created_at",
		type: "sort",
		text: "Most recent",
	},
	{
		name: "old",
		value: "+created_at",
		type: "sort",
		text: "Oldest",
	},
];

const meta = {
	title: "List/ActionBar",
	component: ActionBar,
	args: {
		title: "Consultations",
		subtitle: "Participate in our consultations",
		showDebateConsultationSubtitle: true,
		searchBar: false,
	},
	argTypes: {
		title: { control: "text" },
		subtitle: { control: "text" },
		showDebateConsultationSubtitle: { control: "boolean" },
		searchBar: { control: "boolean" },
	},
	render: (args) => (
		<BrowserRouter>
			<IntlProvider locale="en">
				<ResponsiveProvider>
					<ActionBar {...args} onSearch={() => {}} onSortChange={() => {}} onTagChange={() => {}} />
				</ResponsiveProvider>
			</IntlProvider>
		</BrowserRouter>
	),
};

export default meta;

export const WithSubtitle = () => (
	<BrowserRouter>
		<IntlProvider locale="en">
			<ResponsiveProvider>
				<ActionBar
					title="Consultations"
					subtitle="Participate in our consultations"
					showDebateConsultationSubtitle={true}
					onSearch={() => {}}
					onSortChange={() => {}}
					onTagChange={() => {}}
				/>
			</ResponsiveProvider>
		</IntlProvider>
	</BrowserRouter>
);

export const WithoutSubtitle = () => (
	<BrowserRouter>
		<IntlProvider locale="en">
			<ResponsiveProvider>
				<ActionBar
					title="Consultations"
					subtitle="Participate in our consultations"
					showDebateConsultationSubtitle={false}
					onSearch={() => {}}
					onSortChange={() => {}}
					onTagChange={() => {}}
				/>
			</ResponsiveProvider>
		</IntlProvider>
	</BrowserRouter>
);

export const WithSubtitleAndSortOptions = () => (
	<BrowserRouter>
		<IntlProvider locale="en">
			<ResponsiveProvider>
				<ActionBar
					title="Consultations"
					subtitle="Participate in our consultations"
					showDebateConsultationSubtitle={true}
					sortOptions={sortOptions}
					onSearch={() => {}}
					onSortChange={() => {}}
					onTagChange={() => {}}
				/>
			</ResponsiveProvider>
		</IntlProvider>
	</BrowserRouter>
);

export const WithSubtitleAndSearchBar = () => (
	<BrowserRouter>
		<IntlProvider locale="en">
			<ResponsiveProvider>
				<ActionBar
					title="Consultations"
					subtitle="Participate in our consultations"
					showDebateConsultationSubtitle={true}
					searchBar={true}
					sortOptions={sortOptions}
					onSearch={() => {}}
					onSortChange={() => {}}
					onTagChange={() => {}}
				/>
			</ResponsiveProvider>
		</IntlProvider>
	</BrowserRouter>
);
