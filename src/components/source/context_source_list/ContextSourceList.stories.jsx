export default {
	title: "Source/Context Source List",
	component: ContextSourceList,
	args: {},
	argTypes: {},
};

import { faker } from "@faker-js/faker";
import { ResponsiveProvider } from "@logora/debate/hooks/use_responsive";
import React from "react";
import { IntlProvider } from "react-intl";
import { ContextSourceList } from "./ContextSourceList";

const createSource = () => {
	return {
		id: faker.number.int(10000000),
		title: faker.lorem.sentence(),
		source_url: faker.internet.url(),
		origin_image_url: faker.image.url(),
		publisher: faker.vehicle.manufacturer(),
		published_date: faker.date.recent(),
	};
};

const sources = Array.from([1, 2, 3, 4, 5], (s) => createSource());

export const DefaultContextSourceList = () => {
	return (
		<IntlProvider locale="en">
			<ResponsiveProvider>
				<ContextSourceList sources={sources} />
			</ResponsiveProvider>
		</IntlProvider>
	);
};
