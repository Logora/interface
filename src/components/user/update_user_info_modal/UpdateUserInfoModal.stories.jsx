export default {
	title: "User/Update User Info Modal",
	component: UpdateUserInfoModal,
	args: {},
	argTypes: {},
};

import { faker } from "@faker-js/faker";
import { AuthContext, AuthProvider } from "@logora/debate/auth/use_auth";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import {
	DataProviderContext,
	dataProvider,
} from "@logora/debate/data/data_provider";
import { ModalProvider } from "@logora/debate/dialog/modal";
import React from "react";
import { IntlProvider } from "react-intl";
import { UpdateUserInfoModal } from "./UpdateUserInfoModal";

const httpClient = {
	get: () => null,
	post: () => null,
	patch: () => {
		return new Promise((resolve, reject) => {
			resolve({
				status: 200,
				data: {
					success: true,
					data: {
						language: "fr",
						first_name: "Test",
						last_name: "Test",
					},
				},
			});
		});
	},
};

const currentUser = {
	id: faker.number.int(),
	full_name: faker.person.fullName(),
	first_name: faker.person.firstName(),
	last_name: faker.person.lastName(),
	description: faker.person.jobTitle(),
	image_url: faker.image.avatarGitHub(),
	points: faker.number.int(),
};

const data = dataProvider(httpClient, "https://mock.example.api");

export const DefaultUpdateUserInfoModal = () => {
	return (
		<div style={{ width: "850px", height: "300px" }}>
			<ModalProvider>
				<ConfigProvider
					config={{ translation: { translationMethods: [{ fr: "en" }] } }}
				>
					<IntlProvider locale="en">
						<DataProviderContext.Provider value={{ dataProvider: data }}>
							<AuthProvider>
								<UpdateUserInfoModal />
							</AuthProvider>
						</DataProviderContext.Provider>
					</IntlProvider>
				</ConfigProvider>
			</ModalProvider>
		</div>
	);
};

export const UpdateUserInfoModalWithTermsAndConsent = () => {
	return (
		<div style={{ width: "850px", height: "300px" }}>
			<ModalProvider>
				<ConfigProvider
					config={{ translation: { translationMethods: [{ fr: "en" }] } }}
				>
					<IntlProvider locale="en">
						<DataProviderContext.Provider value={{ dataProvider: data }}>
							<AuthProvider>
								<UpdateUserInfoModal showEmailConsent={true} showTerms={true} />
							</AuthProvider>
						</DataProviderContext.Provider>
					</IntlProvider>
				</ConfigProvider>
			</ModalProvider>
		</div>
	);
};

export const UpdateUserInfoModalWithInfos = () => {
	return (
		<div style={{ width: "850px", height: "300px" }}>
			<ModalProvider>
				<ConfigProvider
					config={{ translation: { translationMethods: [{ fr: "en" }] } }}
				>
					<IntlProvider locale="en">
						<DataProviderContext.Provider value={{ dataProvider: data }}>
							<AuthContext.Provider
								value={{ currentUser: currentUser, isLoggedIn: true }}
							>
								<UpdateUserInfoModal />
							</AuthContext.Provider>
						</DataProviderContext.Provider>
					</IntlProvider>
				</ConfigProvider>
			</ModalProvider>
		</div>
	);
};
