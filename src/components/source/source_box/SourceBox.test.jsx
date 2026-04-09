import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";
import React from "react";
import { SourceBox } from "./SourceBox";

const source = {
	title: faker.music.songName(),
	description: faker.lorem.sentence(),
	url: faker.internet.url(),
	imageUrl: faker.image.url(),
	publisher: faker.vehicle.manufacturer(),
};

describe("SourceBox", () => {
	it("should render a source box with the correct text", () => {
		const sourceBox = render(
			<SourceBox
				title={source.title}
				description={source.description}
				publisher={source.publisher}
				url={source.url}
				imageUrl={source.imageUrl}
			/>,
		);

		expect(sourceBox.getByText(source.publisher)).toBeTruthy();
		expect(sourceBox.getByText(source.title)).toBeTruthy();
		expect(sourceBox.getByText(source.description)).toBeTruthy();
	});
});
