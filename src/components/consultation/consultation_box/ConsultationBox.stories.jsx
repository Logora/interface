import { faker } from "@faker-js/faker";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import { ResponsiveProvider } from "@logora/debate/hooks/use_responsive";
import { Location } from "@logora/debate/util/location";
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { ConsultationBox } from "./ConsultationBox";

const routes = {
	consultationShowLocation: new Location(
		"espace-debat/consultation/:consultationSlug",
		{ consultationSlug: "" },
	),
};

const consultation = {
	id: 19,
	slug: faker.lorem.slug(),
	title: faker.music.songName(),
	description: faker.commerce.productDescription(),
	description_url: "",
	created_at: faker.date.recent(),
	ends_at: faker.date.future(),
	vote_goal: 1000,
	total_votes: 200,
	total_participants: 44,
	proposals_count: 53,
	image_url: faker.image.url(),
	direct_url: faker.internet.url(),
	tags: [
		{
			id: 37,
			name: faker.science.chemicalElement().name,
			taggings_count: 0,
			display_name: faker.science.chemicalElement().name,
		},
	],
	language: "en",
	translation_entries: [],
};

const meta = {
	title: "Consultation/Consultation Box",
	component: ConsultationBox,
	args: {
		consultation,
	},
	argTypes: {
		consultation: {
			control: "object",
		},
	},
	render: ({ consultation }) => (
		<BrowserRouter>
			<IntlProvider locale="en">
				<ResponsiveProvider>
					<ConfigProvider routes={{ ...routes }} config={{ theme: {} }}>
						<ConsultationBox consultation={consultation} />
					</ConfigProvider>
				</ResponsiveProvider>
			</IntlProvider>
		</BrowserRouter>
	),
};

export default meta;

const renderStory = (overrides = {}) =>
	meta.render({ ...meta.args, ...overrides });

export const DefaultConsultationBox = (props) => renderStory(props);

export const ConsultationEndedBox = (props) =>
	renderStory({
		consultation: {
			...consultation,
			ends_at: "2022-11-30T00:00:00.000Z",
		},
		...props,
	});

export const ConsultationWithoutEndBox = (props) =>
	renderStory({
		consultation: {
			...consultation,
			ends_at: null,
		},
		...props,
	});

export const ConsultationWithoutVoteGoalBox = (props) =>
	renderStory({
		consultation: {
			...consultation,
			vote_goal: 0,
		},
		...props,
	});
