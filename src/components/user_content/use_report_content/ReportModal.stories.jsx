export default {
	title: "User Content/Use Report Content",
	component: ReportModal,
	args: {},
	argTypes: {},
};

import { AuthContext } from "@logora/debate/auth/use_auth";
import {
	DataProviderContext,
	dataProvider,
} from "@logora/debate/data/data_provider";
import { ModalProvider } from "@logora/debate/dialog/modal";
import React from "react";
import { IntlProvider } from "react-intl";
import { ReportModal } from "./ReportModal";

const httpClient = {
	get: () => null,
	post: () => null,
	patch: () => null,
};

export const DefaultReportModal = () => {
	const data = dataProvider(httpClient, "https://mock.example.api");

	return (
		<div style={{ width: "350px", height: "200px" }}>
			<IntlProvider locale="en">
				<ModalProvider>
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider value={{ isLoggedIn: true }}>
							<ReportModal
								reportableId={1}
								reportableType={"argument"}
								title={"Report this argument"}
							/>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</ModalProvider>
			</IntlProvider>
		</div>
	);
};

export const ReportModalUserAnonym = () => {
	const data = dataProvider(httpClient, "https://mock.example.api");

	return (
		<div style={{ width: "350px", height: "200px" }}>
			<IntlProvider locale="en">
				<ModalProvider>
					<DataProviderContext.Provider value={{ dataProvider: data }}>
						<AuthContext.Provider value={{ isLoggedIn: false }}>
							<ReportModal
								reportableId={1}
								reportableType={"argument"}
								title={"Report this argument"}
								allowAnonymousUser={true}
							/>
						</AuthContext.Provider>
					</DataProviderContext.Provider>
				</ModalProvider>
			</IntlProvider>
		</div>
	);
};
