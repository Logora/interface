import React from "react";
import { DefaultDebateBox } from './DebateBox.composition';
import { render } from '@testing-library/react';
import { faker } from '@faker-js/faker';

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
		occupation: null
	};
};

const participants = Array.from([1, 2, 3], s => createUser());

const debate = {
	id: 243,
	name: faker.music.songName(),
	slug: faker.lorem.slug(),
	description: null,
	created_at: faker.date.recent(),
	score: 0,
	image_url: faker.image.url(),
	banner_image_url: faker.image.avatarGitHub(),
	votes_count: {
		655: "2",
		656: "6",
		657: "0"
	},
	participants_count: 3,
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
				language: "fr",
    			translation_entries: []
			},
			{
				id: 657,
				name: "Sans opinion",
				language: "es",
    			translation_entries: []
			}
		],
		author: createUser()
	},
	participants: participants,
	language: "en",
    translation_entries: []
}

describe('DebateBox', () => {
	it ('renders DebateBox component', () => {
		const { getByText } = render(<DefaultDebateBox debate={debate} />);
		expect(getByText(debate.name)).toBeInTheDocument();
		expect(getByText(/75/)).toBeTruthy();
		expect(getByText(/Non/)).toBeTruthy();
	});

	it ('renders DebateBox with correct links', () => {
		const { getByText } = render(<DefaultDebateBox  debate={debate} />);
		expect(getByText(debate.name).closest('a')).toHaveAttribute('href', '/espace-debat/group/' + debate.slug)
	});

	it ('renders DebateBox with long position names without breaking layout', () => {
		const debateWithLongNames = {
			...debate,
			group_context: {
				...debate.group_context,
				positions: [
					{
						id: 655,
						name: "This is a very long answer option that should be truncated properly with ellipsis",
						language: "en",
						translation_entries: []
					},
					{
						id: 656,
						name: "Another extremely long position name that would normally break the layout of the debate card",
						language: "fr",
						translation_entries: []
					},
					{
						id: 657,
						name: "Short",
						language: "es",
						translation_entries: []
					}
				]
			}
		};
		const { container } = render(<DefaultDebateBox debate={debateWithLongNames} />);
		const numberText = container.querySelector('.debateBoxNumbersText');
		expect(numberText).toBeInTheDocument();
	});
});