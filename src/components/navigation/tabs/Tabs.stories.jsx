import React, { useState } from "react";
import { Tabs } from "./Tabs";
import { Tab } from "./Tab";
import { TabPanel } from "./TabPanel";

export default {
	title: "Navigation/Tabs",
	component: Tabs,
	render: ({ tabs, label }) => {
		const [activeTab, setActiveTab] = useState(0);
		return (
			<>
				<Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} label={label}>
					{tabs.map((tab) => (
						<Tab key={tab} label={tab} />
					))}
				</Tabs>
				{tabs.map((tab, index) => (
					<TabPanel key={tab} id={`panel-${index}`} tabId={`tab-${index}`} active={activeTab === index}>
						<div style={{ padding: "1rem" }}>
							Contenu : <strong>{tab}</strong>
						</div>
					</TabPanel>
				))}
			</>
		);
	},
};

export const DefaultTabs = {
	args: {
		tabs: ["Onglet 1", "Onglet 2", "Onglet 3"],
		label: "Navigation principale",
	},
};

export const TwoTabs = {
	args: {
		tabs: ["En cours", "Sélectionnés"],
		label: "Filtrer les suggestions",
	},
};
