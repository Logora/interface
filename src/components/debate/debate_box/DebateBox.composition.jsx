import React from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import { DebateBox } from './DebateBox';
import { Location } from '@logora/debate.util.location';
import { BrowserRouter } from 'react-router-dom';
import { faker } from '@faker-js/faker';

let UserShowLocation = new Location('espace-debat/user/:userSlug', { userSlug: "" })
let DebateShowLocation = new Location('espace-debat/group/:debateSlug', { debateSlug: "" })

const routes = {
    userShowLocation: UserShowLocation,
    debateShowLocation: DebateShowLocation
}

const debate = {
	id: 243,
	is_public: true,
	name: faker.music.songName(),
	slug: faker.lorem.slug(),
	description: null,
	created_at: faker.date.recent(),
	score: 0,
	image_url: faker.image.avatar(),
	banner_image_url: faker.image.avatar(),
	votes_count: {
		655: "2",
		656: "6",
		657: "0"
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
				translation_entries: []
			},
			{
				id: 656,
				name: "Non",
				language: "en",
				translation_entries: []
			},
			{
				id: 657,
				name: "Sans opinion",
				language: "en",
				translation_entries: []
			}
		],
		author: {
			id: 2,
			first_name: faker.name.firstName(),
			last_name: faker.name.lastName(),
			slug: faker.lorem.slug(),
			image_url: faker.image.avatar(),
			full_name: faker.name.fullName(),
			description: null,
			last_activity: faker.date.recent(),
			role: "contributor",
			is_admin: true,
			points: 13800,
			eloquence_title: "debate_suggestion_accepted"
		}
	},
	participants: [
		{
			id: 39,
			hash_id: faker.lorem.slug(),
			first_name: faker.name.firstName(),
			last_name: faker.name.lastName(),
			slug: faker.lorem.slug(),
			image_url: faker.image.avatar(),
			full_name: faker.name.fullName(),
			description: null,
			last_activity: faker.date.recent(),
			role: "contributor",
			is_admin: false,
			points: 41,
			eloquence_title: null,
			occupation: null
		},
		{
			id: 82,
			hash_id: faker.lorem.slug(),
			first_name: faker.name.firstName(),
			last_name: faker.name.lastName(),
			slug: faker.lorem.slug(),
			image_url: faker.image.avatar(),
			full_name: faker.name.fullName(),
			description: null,
			last_activity: faker.date.recent(),
			role: "contributor",
			is_admin: false,
			points: 65235,
			eloquence_title: null,
			occupation: null
		},
		{
			id: 156,
			hash_id: faker.lorem.slug(),
			first_name: faker.name.firstName(),
			last_name: faker.name.lastName(),
			slug: faker.lorem.slug(),
			image_url: faker.image.avatar(),
			full_name: faker.name.fullName(),
			description: null,
			last_activity: faker.date.recent(),
			role: "contributor",
			is_admin: false,
			points: 2004,
			eloquence_title: null,
			occupation: null
		}
	],
	language: "en",
    translation_entries: [],
	sub_application: {
		logo: "https://pbs.twimg.com/profile_images/1608100070754238467/NXpjW55F_400x400.jpg",
		name: "Test Océan"
	}
}

export const DefaultDebateBox = (props) => {
    return (
        <BrowserRouter>
            <IntlProvider locale="en">
				<ResponsiveProvider>
					<ConfigProvider routes={{...routes}} config={{ modules: {}}}>
						<DebateBox debate={props.debate || debate} />
					</ConfigProvider>
				</ResponsiveProvider>
            </IntlProvider>
        </BrowserRouter>
    )
};

export const BrandedDebateBox = (props) => {
    return (
        <BrowserRouter>
            <IntlProvider locale="en">
				<ResponsiveProvider>
					<ConfigProvider routes={{...routes}} config={{ modules: {}, actions: { allowDebateBranding: true } }}>
						<DebateBox debate={props.debate || debate} />
					</ConfigProvider>
				</ResponsiveProvider>
            </IntlProvider>
        </BrowserRouter>
    )
};