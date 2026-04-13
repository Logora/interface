import React, { useState } from "react";
import cx from "classnames";
import styles from "./tabs.stories.module.scss";

const TabsDemo = ({ tabs }) => {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div>
			<nav>
				<ul className={styles.navTabs}>
					{tabs.map((tab, index) => (
						<li key={tab} className={styles.navItem}>
							<div
								className={cx(styles.navLink, {
									[styles.active]: activeTab === index,
								})}
								onClick={() => setActiveTab(index)}
								onKeyUp={(e) => {
									if (e.key === "Enter" || e.key === " ") setActiveTab(index);
								}}
								role="tab"
								tabIndex={0}
								aria-selected={activeTab === index}
							>
								{tab}
							</div>
						</li>
					))}
				</ul>
			</nav>
			<div className={styles.tabContent}>
				{tabs.map((tab, index) => (
					<div
						key={tab}
						className={cx(styles.tabPane, { [styles.active]: activeTab === index })}
					>
						Contenu de l'onglet : <strong>{tab}</strong>
					</div>
				))}
			</div>
		</div>
	);
};

const meta = {
	title: "Styles/Tabs",
	component: TabsDemo,
	args: {
		tabs: ["Onglet 1", "Onglet 2", "Onglet 3"],
	},
	argTypes: {
		tabs: { control: "object" },
	},
	render: (args) => <TabsDemo {...args} />,
};

export default meta;

export const DefaultTabs = {};

export const TwoTabs = {
	args: {
		tabs: ["En cours", "Sélectionnés"],
	},
};
