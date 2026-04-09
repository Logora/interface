import { faker } from "@faker-js/faker";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import { ResponsiveProvider } from "@logora/debate/hooks/use_responsive";
import { Location } from "@logora/debate/util/location";
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { DebateBox } from "./DebateBox";

const UserShowLocation = new Location("espace-debat/user/:userSlug", {
	userSlug: "",
});
const DebateShowLocation = new Location("espace-debat/group/:debateSlug", {
	debateSlug: "",
});

const routes = {
	userShowLocation: UserShowLocation,
	debateShowLocation: DebateShowLocation,
};

const createUser = () => {
	return {
		id: faker.number.int(10000000),
		hash_id: faker.lorem.slug(),
		first_name: faker.person.firstName(),
		last_name: faker.person.lastName(),
		slug: faker.lorem.slug(),
		image_url: faker.image.avatarGitHub(),
		full_name: faker.person.fullName(),
		description: null,
		last_activity: faker.date.recent(),
		role: "contributor",
		is_admin: false,
		points: 41,
		eloquence_title: null,
		occupation: null,
	};
};

const participants = Array.from([1, 2, 3, 4, 5], () => createUser());

const debate = {
	id: 243,
	name: faker.music.songName(),
	slug: faker.lorem.slug(),
	description: null,
	created_at: faker.date.recent(),
	score: 0,
	image_url: faker.image.url(),
	banner_image_url: faker.image.url(),
	votes_count: {
		655: "2",
		656: "6",
		657: "0",
	},
	participants_count: 5,
	group_context: {
		id: 273,
		name: faker.music.songName(),
		created_at: faker.date.recent(),
		positions: [
			{
				id: 655,
				name: "Oui",
				language: "en",
				translation_entries: [],
			},
			{
				id: 656,
				name: "Non",
				language: "en",
				translation_entries: [],
			},
			{
				id: 657,
				name: "Sans opinion",
				language: "en",
				translation_entries: [],
			},
		],
		author: createUser(),
	},
	participants: participants,
	language: "en",
	translation_entries: [],
	sub_application: {
		logo: "https://pbs.twimg.com/profile_images/1608100070754238467/NXpjW55F_400x400.jpg",
		name: "Test Ocean",
	},
};

const debateWithLongPositionNames = {
	...debate,
	name: "Should Germany strengthen its defense capabilities given current geopolitical tensions?",
	group_context: {
		...debate.group_context,
		positions: [
			{
				id: 655,
				name: "Yes, Germany should significantly increase defense spending and military capabilities",
				language: "en",
				translation_entries: [],
			},
			{
				id: 656,
				name: "No, Germany should maintain current defense levels and focus on diplomacy",
				language: "en",
				translation_entries: [],
			},
			{
				id: 657,
				name: "Undecided on this complex geopolitical matter",
				language: "en",
				translation_entries: [],
			},
		],
	},
};

const meta = {
	title: "Debate/Debate Box",
	component: DebateBox,
	args: {
		debate,
		allowDebateBranding: false,
	},
	argTypes: {
		debate: {
			control: "object",
		},
		allowDebateBranding: {
			control: "boolean",
		},
	},
	render: ({ debate, allowDebateBranding }) => (
		<BrowserRouter>
			<IntlProvider locale="en">
				<ResponsiveProvider>
					<ConfigProvider
						routes={{ ...routes }}
						config={{ modules: {}, actions: { allowDebateBranding } }}
					>
						<DebateBox debate={debate} />
					</ConfigProvider>
				</ResponsiveProvider>
			</IntlProvider>
		</BrowserRouter>
	),
};

export default meta;

const renderStory = (overrides = {}) =>
	meta.render({ ...meta.args, ...overrides });

export const DefaultDebateBox = (props) => renderStory(props);

export const BrandedDebateBox = (props) =>
	renderStory({ allowDebateBranding: true, ...props });

export const DebateBoxWithLongAnswers = (props) =>
	renderStory({ debate: debateWithLongPositionNames, ...props });
