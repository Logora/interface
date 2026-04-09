export default {
	title: "Source/Source Modal",
	component: SourceModal,
	args: {},
	argTypes: {},
};

import { faker } from "@faker-js/faker";
import {
	DataProviderContext,
	dataProvider,
} from "@logora/debate/data/data_provider";
import { ModalProvider } from "@logora/debate/dialog/modal";
import React from "react";
import { IntlProvider } from "react-intl";
import { SourceModal } from "./SourceModal";

const allowedDomains = Array.from({ length: 3 }, () =>
	faker.internet.domainName(),
);

const source = {
	title: faker.music.songName(),
	description: faker.lorem.sentence(),
	source_url: faker.internet.url(),
	origin_image_url: faker.image.url(),
	publisher: faker.vehicle.manufacturer(),
};

const httpClient = {
	get: () => null,
	post: (url, data, config) => {
		return new Promise((resolve, reject) => {
			resolve({ data: { success: true, data: { resource: source } } });
		});
	},
	patch: () => null,
};

export const DefaultSourceModal = () => {
	const data = dataProvider(httpClient, "https://mock.example.api");

	return (
		<div style={{ width: "250px", height: "100px" }}>
			<ModalProvider>
				<IntlProvider locale="en">
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<SourceModal
							onAddSource={() => console.log("Add source")}
							onHideModal={() => console.log("Hide modal")}
						/>
					</DataProviderContext.Provider>
				</IntlProvider>
			</ModalProvider>
		</div>
	);
};

export const SourceModalWithError = () => {
	const data = dataProvider(httpClient, "https://mock.example.api");

	return (
		<div style={{ width: "250px", height: "100px" }}>
			<ModalProvider>
				<IntlProvider locale="en">
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<SourceModal
							onAddSource={() => console.log("Add source")}
							onHideModal={() => console.log("Hide modal")}
							allowedSources={allowedDomains}
						/>
					</DataProviderContext.Provider>
				</IntlProvider>
			</ModalProvider>
		</div>
	);
};
