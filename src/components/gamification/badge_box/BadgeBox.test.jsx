import { faker } from "@faker-js/faker";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { IntlProvider } from "react-intl";
import { BadgeBox } from "./BadgeBox";

const badge = {
	icon_url: faker.image.url(),
	level: 2,
	name: "create_argument",
	next_title_level: 3,
	steps: 20,
	title: faker.person.jobTitle(),
	progress: 6,
};

const badgeCompleted = {
	icon_url: faker.image.url(),
	level: 3,
	name: "create_argument",
	next_title_level: 3,
	steps: 13,
	title: faker.person.jobTitle(),
	progress: 13,
};

const renderBadgeBox = (props, config = {}) =>
	render(
		<ConfigProvider config={config}>
			<IntlProvider locale="en">
				<BadgeBox {...props} />
			</IntlProvider>
		</ConfigProvider>,
	);

const badgeProps = (overrides = {}) => ({
	eloquenceTitle: "",
	icon_url: badge.icon_url,
	level: badge.level,
	name: badge.name,
	next_title_level: badge.next_title_level,
	steps: badge.steps,
	title: badge.title,
	progress: badge.progress,
	...overrides,
});

const badgeCompletedProps = (overrides = {}) => ({
	eloquenceTitle: "",
	icon_url: badgeCompleted.icon_url,
	level: badgeCompleted.level,
	name: badgeCompleted.name,
	next_title_level: badgeCompleted.next_title_level,
	steps: badgeCompleted.steps,
	title: badgeCompleted.title,
	progress: badgeCompleted.progress,
	...overrides,
});

describe("BadgeBox", () => {
	it("renders correctly", () => {
		const { getByText, getByAltText } = renderBadgeBox(badgeProps());

		const badgeImg = getByAltText("Badge " + badge.title);
		expect(badgeImg).toBeInTheDocument();
		expect(badgeImg).toHaveAttribute("src", badge.icon_url);

		expect(getByText("Level 2")).toBeInTheDocument();
		expect(
			getByText("Write 20 arguments with a relevance score of at least 75"),
		).toBeInTheDocument();
		expect(
			getByText("At level 3 you will get the title :"),
		).toBeInTheDocument();
	});

	it("renders title obtained", () => {
		const { getByText, getByAltText, getByTestId, queryByText } = renderBadgeBox(
			badgeCompletedProps(),
		);

		const badgeImg = getByAltText("Badge " + badgeCompleted.title);
		expect(badgeImg).toBeInTheDocument();
		expect(badgeImg).toHaveAttribute("src", badgeCompleted.icon_url);

		const badgeReward = getByTestId("badge-reward");
		expect(badgeReward).toHaveClass("rewardObtained");
		expect(badgeReward).not.toHaveClass("rewardShown");

		expect(getByText("Level 3")).toBeInTheDocument();
		expect(
			getByText("Write 13 arguments with a relevance score of at least 75"),
		).toBeInTheDocument();
		expect(getByText("Title obtained :")).toBeInTheDocument();
		expect(getByText(`"Dialogue pro"`)).toBeInTheDocument();
		expect(queryByText("At level 3 you will get the title :")).toBeNull();
	});

	it("renders title shown", () => {
		const { getByText, getByAltText, getByTestId, queryByText } = renderBadgeBox(
			badgeCompletedProps({ eloquenceTitle: badgeCompleted.name }),
		);

		const badgeImg = getByAltText("Badge " + badgeCompleted.title);
		expect(badgeImg).toBeInTheDocument();
		expect(badgeImg).toHaveAttribute("src", badgeCompleted.icon_url);

		const badgeReward = getByTestId("badge-reward");
		expect(badgeReward).toHaveClass("rewardShown");

		expect(getByText("Level 3")).toBeInTheDocument();
		expect(
			getByText("Write 13 arguments with a relevance score of at least 75"),
		).toBeInTheDocument();
		expect(getByText("Title shown :")).toBeInTheDocument();
		expect(getByText(`"Dialogue pro"`)).toBeInTheDocument();
		expect(queryByText("At level 3 you will get the title :")).toBeNull();
	});

	it("uses the custom CDN image when config.badges.baseUrl is set", () => {
		const config = {
			badges: {
				baseUrl: "https://cdn.example.com/logora/badges",
				fileExtension: "png",
			},
		};
		const { getByAltText } = renderBadgeBox(badgeProps(), config);

		expect(getByAltText("Badge " + badge.title)).toHaveAttribute(
			"src",
			"https://cdn.example.com/logora/badges/create_argument.png",
		);
	});

	it("defaults to the png extension when config.badges.fileExtension is not set", () => {
		const config = { badges: { baseUrl: "https://cdn.example.com/logora/badges/" } };
		const { getByAltText } = renderBadgeBox(badgeProps(), config);

		expect(getByAltText("Badge " + badge.title)).toHaveAttribute(
			"src",
			"https://cdn.example.com/logora/badges/create_argument.png",
		);
	});

	it("falls back to icon_url when the custom CDN image fails to load", () => {
		const config = {
			badges: {
				baseUrl: "https://cdn.example.com/logora/badges",
				fileExtension: "png",
			},
		};
		const { getByAltText } = renderBadgeBox(badgeProps(), config);

		const badgeImg = getByAltText("Badge " + badge.title);
		expect(badgeImg).toHaveAttribute(
			"src",
			"https://cdn.example.com/logora/badges/create_argument.png",
		);

		fireEvent.error(badgeImg);

		expect(getByAltText("Badge " + badge.title)).toHaveAttribute(
			"src",
			badge.icon_url,
		);
	});
});
