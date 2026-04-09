export default {
	title: "Notification/Notification Item",
	component: NotificationItem,
	args: {
		isRead: false,
	},
	argTypes: {
		isRead: { control: "boolean" },
	},
};

import { faker } from "@faker-js/faker";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import {
	DataProviderContext,
	dataProvider,
} from "@logora/debate/data/data_provider";
import React from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { NotificationItem } from "./NotificationItem";

const notificationItem = {
	id: 415,
	created_at: faker.date.recent(),
	notify_type: "new_comment",
};

const notificationDefinitions = {
	new_comment: {
		getRedirectUrl: () => "/comments/1",
		getImage: () => <img alt="notification" src={faker.image.url()} />,
		getContent: () => faker.commerce.productDescription(),
	},
};

const httpClient = {
	post: () => {
		return new Promise((resolve) => {
			resolve({ data: { success: true, data: {} } });
		});
	},
};

const data = dataProvider(httpClient, "https://mock.example.api");

const notificationItemContentRejected = {
	id: 415,
	created_at: faker.date.recent(),
	notify_type: "content_rejected",
};

const notificationDefinitionsContentRejected = {
	content_rejected: {
		getImage: () => <img alt="notification rejected" src={faker.image.url()} />,
		getContent: () => faker.commerce.productDescription(),
		getRedirectUrl: () => ({
			pathname: "https://www.example.com/moderation-policy",
		}),
	},
};

export const DefaultNotificationItem = () => {
	return (
		<MemoryRouter>
			<ConfigProvider config={{}}>
				<DataProviderContext.Provider value={{ dataProvider: data }}>
					<IntlProvider locale="en">
						<NotificationItem
							notification={notificationItem}
							notificationDefinitions={notificationDefinitions}
							isRead={false}
						/>
					</IntlProvider>
				</DataProviderContext.Provider>
			</ConfigProvider>
		</MemoryRouter>
	);
};

export const NotificationItemWithReadStatus = () => {
	return (
		<MemoryRouter>
			<ConfigProvider config={{}}>
				<DataProviderContext.Provider value={{ dataProvider: data }}>
					<IntlProvider locale="en">
						<NotificationItem
							notification={notificationItem}
							notificationDefinitions={notificationDefinitions}
							isRead={true}
						/>
					</IntlProvider>
				</DataProviderContext.Provider>
			</ConfigProvider>
		</MemoryRouter>
	);
};

export const NotificationItemWithRedirectUrl = () => {
	return (
		<MemoryRouter>
			<ConfigProvider config={{}}>
				<DataProviderContext.Provider value={{ dataProvider: data }}>
					<IntlProvider locale="en">
						<NotificationItem
							notification={notificationItemContentRejected}
							notificationDefinitions={notificationDefinitionsContentRejected}
							isRead={false}
						/>
					</IntlProvider>
				</DataProviderContext.Provider>
			</ConfigProvider>
		</MemoryRouter>
	);
};
