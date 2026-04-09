export default {
	title: "Notification/Notification Menu",
	component: NotificationMenu,
	args: {},
	argTypes: {},
};

import { faker } from "@faker-js/faker";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import {
	DataProviderContext,
	dataProvider,
} from "@logora/debate/data/data_provider";
import { ListProvider } from "@logora/debate/list/list_provider";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { NotificationMenu } from "./NotificationMenu";

const createNotification = () => {
	return {
		id: faker.number.int(10000000),
		created_at: faker.date.recent(),
		notify_type: "new_comment",
		is_opened: faker.datatype.boolean(),
	};
};

const notificationDefinitions = {
	new_comment: {
		getRedirectUrl: () => "/comments/1",
		getImage: () => (
			<img src={faker.image.abstract()} alt="notification-image" />
		),
		getContent: (notification) => faker.commerce.productDescription(),
	},
};

const httpClient = {
	post: () => {
		return new Promise((resolve) => {
			resolve({ data: { success: true, data: {} } });
		});
	},
	get: () => {
		return new Promise((resolve) => {
			resolve({
				data: {
					success: true,
					data: Array.from({ length: 5 }, createNotification),
				},
			});
		});
	},
};

const data = dataProvider(httpClient, "https://mock.example.api");

export const DefaultNotificationMenu = () => {
	return (
		<MemoryRouter>
			<ConfigProvider config={{}}>
				<DataProviderContext.Provider value={{ dataProvider: data }}>
					<ListProvider>
						<IntlProvider locale="en">
							<NotificationMenu
								notificationDefinitions={notificationDefinitions}
							/>
						</IntlProvider>
					</ListProvider>
				</DataProviderContext.Provider>
			</ConfigProvider>
		</MemoryRouter>
	);
};

export const NotificationMenuEmpty = () => {
	const httpClientEmpty = { ...httpClient };
	httpClientEmpty.get = () => {
		return new Promise((resolve) => {
			resolve({ data: { success: true, data: [] } });
		});
	};

	const dataEmpty = dataProvider(httpClientEmpty, "https://mock.example.api");

	return (
		<MemoryRouter>
			<ConfigProvider config={{}}>
				<DataProviderContext.Provider value={{ dataProvider: dataEmpty }}>
					<ListProvider>
						<IntlProvider locale="en">
							<NotificationMenu
								notificationDefinitions={notificationDefinitions}
							/>
						</IntlProvider>
					</ListProvider>
				</DataProviderContext.Provider>
			</ConfigProvider>
		</MemoryRouter>
	);
};
