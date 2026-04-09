export default {
	title: "Input/Text Editor",
	component: TextEditor,
	args: {
		placeholder: "Add an argument",
		shortBar: true,
		active: false,
		hideSourceAction: false,
		hideSubmit: false,
		disableRichText: false,
		maxLength: undefined,
	},
	argTypes: {
		placeholder: { control: "text" },
		shortBar: { control: "boolean" },
		active: { control: "boolean" },
		hideSourceAction: { control: "boolean" },
		hideSubmit: { control: "boolean" },
		disableRichText: { control: "boolean" },
		maxLength: { control: "number" },
	},
};

import {
	DataProviderContext,
	dataProvider,
} from "@logora/debate/data/data_provider";
import { ModalProvider } from "@logora/debate/dialog/modal";
import { InputProvider, useInput } from "@logora/debate/input/input_provider";
import React from "react";
import { IntlProvider } from "react-intl";
import { TextEditor } from "./TextEditor";

const httpClient = {
	get: () => null,
	post: () => null,
	patch: () => null,
};

const data = dataProvider(httpClient, "https://mock.example.api");

const handleSubmit = (textContent, richContent, sources) => {
	console.log(textContent);
	console.log(richContent);
};

const CustomTextEditor = () => {
	const { setReset } = useInput();
	return (
		<TextEditor
			placeholder={"Add an argument"}
			onSubmit={() => setReset(true)}
			onActivation={() => null}
			shortBar={true}
		/>
	);
};

export const DefaultTextEditor = () => {
	return (
		<IntlProvider locale="en">
			<DataProviderContext.Provider value={{ dataProvider: data }}>
				<ModalProvider>
					<InputProvider>
						<CustomTextEditor />
					</InputProvider>
				</ModalProvider>
			</DataProviderContext.Provider>
		</IntlProvider>
	);
};

export const TextEditorWithSource = () => {
	return (
		<IntlProvider locale="en">
			<DataProviderContext.Provider value={{ dataProvider: data }}>
				<ModalProvider>
					<InputProvider>
						<TextEditor
							placeholder={"Add an argument"}
							onSubmit={handleSubmit}
							onActivation={() => null}
							shortBar={true}
							sources={[
								{
									publisher: "test.com",
									source_url: "http://test.com",
									title: "Source Test",
								},
							]}
						/>
					</InputProvider>
				</ModalProvider>
			</DataProviderContext.Provider>
		</IntlProvider>
	);
};

export const TextEditorWithMaxLength = () => {
	return (
		<IntlProvider locale="en">
			<DataProviderContext.Provider value={{ dataProvider: data }}>
				<ModalProvider>
					<InputProvider>
						<TextEditor
							placeholder={"Add an argument"}
							onSubmit={handleSubmit}
							onActivation={() => null}
							shortBar={true}
							maxLength={500}
						/>
					</InputProvider>
				</ModalProvider>
			</DataProviderContext.Provider>
		</IntlProvider>
	);
};

export const TextEditorHideSourceAction = () => {
	return (
		<IntlProvider locale="en">
			<DataProviderContext.Provider value={{ dataProvider: data }}>
				<ModalProvider>
					<InputProvider>
						<TextEditor
							placeholder={"Add an argument"}
							onSubmit={handleSubmit}
							onActivation={() => null}
							shortBar={true}
							hideSourceAction
						/>
					</InputProvider>
				</ModalProvider>
			</DataProviderContext.Provider>
		</IntlProvider>
	);
};

export const TextEditorHideSubmit = () => {
	return (
		<IntlProvider locale="en">
			<DataProviderContext.Provider value={{ dataProvider: data }}>
				<ModalProvider>
					<InputProvider>
						<TextEditor
							placeholder={"Add an argument"}
							onSubmit={handleSubmit}
							onActivation={() => null}
							shortBar={true}
							hideSubmit
						/>
					</InputProvider>
				</ModalProvider>
			</DataProviderContext.Provider>
		</IntlProvider>
	);
};

export const TextEditorDisableRichText = () => {
	return (
		<IntlProvider locale="en">
			<DataProviderContext.Provider value={{ dataProvider: data }}>
				<ModalProvider>
					<InputProvider>
						<TextEditor
							placeholder={"Add an argument"}
							onSubmit={handleSubmit}
							onActivation={() => null}
							shortBar={true}
							disableRichText
						/>
					</InputProvider>
				</ModalProvider>
			</DataProviderContext.Provider>
		</IntlProvider>
	);
};

export const ActiveTextEditor = () => {
	return (
		<IntlProvider locale="en">
			<DataProviderContext.Provider value={{ dataProvider: data }}>
				<ModalProvider>
					<InputProvider>
						<TextEditor
							placeholder={"Add an argument"}
							onSubmit={handleSubmit}
							onActivation={() => null}
							shortBar={true}
							active
						/>
					</InputProvider>
				</ModalProvider>
			</DataProviderContext.Provider>
		</IntlProvider>
	);
};

export const TextEditorWithSourceAndMaxLenght = () => {
	return (
		<IntlProvider locale="en">
			<DataProviderContext.Provider value={{ dataProvider: data }}>
				<ModalProvider>
					<InputProvider>
						<TextEditor
							placeholder={"Add an argument"}
							onSubmit={handleSubmit}
							onActivation={() => null}
							shortBar={true}
							sources={[
								{
									publisher: "test.com",
									source_url: "http://test.com",
									title: "Source Test",
								},
							]}
							maxLength={500}
						/>
					</InputProvider>
				</ModalProvider>
			</DataProviderContext.Provider>
		</IntlProvider>
	);
};
