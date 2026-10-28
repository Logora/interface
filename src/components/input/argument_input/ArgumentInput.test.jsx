import { faker } from "@faker-js/faker";
import { AuthContext } from "@logora/debate/auth/use_auth";
import { ConfigProvider } from "@logora/debate/data/config_provider";
import {
	DataProviderContext,
	dataProvider,
} from "@logora/debate/data/data_provider";
import { ModalProvider } from "@logora/debate/dialog/modal";
import { ToastProvider } from "@logora/debate/dialog/toast_provider";
import { IconProvider } from "@logora/debate/icons/icon_provider";
import * as regularIcons from "@logora/debate/icons/regular_icons";
import { InputProvider, useInput } from "@logora/debate/input/input_provider";
import { ListProvider } from "@logora/debate/list/list_provider";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import { ArgumentInput } from "./ArgumentInput";

vi.mock("@lexical/react/LexicalErrorBoundary", () => ({
	LexicalErrorBoundary: ({ children }) => children,
}));

const httpClient = {
	get: () => null,
	post: (url, data, config) => {
		return new Promise((resolve, reject) => {
			resolve({ data: { success: true, data: { resource: argument } } });
		});
	},
	patch: () => null,
	delete: (url, data, config) => {
		return new Promise((resolve, reject) => {
			resolve({ data: { success: true, data: {} } });
		});
	},
};

const data = dataProvider(httpClient, "https://mock.example.api");

const debate = {
	id: faker.number.int(),
	name: faker.lorem.word(),
	positions: [
		{
			id: faker.number.int(),
			name: faker.lorem.word(),
		},
		{
			id: faker.number.int(),
			name: faker.lorem.word(),
		},
	],
};

const argument = {
	position: {
		id: debate.positions[0].id,
	},
};

const currentUser = {
	id: faker.number.int(),
	full_name: faker.person.fullName(),
	image_url: faker.image.avatarGitHub(),
	points: faker.number.int(),
};

const callback = vi.fn();

describe("ArgumentInput", () => {
	beforeAll(() => {
		Object.defineProperty(window, "matchMedia", {
			writable: true,
			value: vi.fn().mockImplementation((query) => ({
				matches: false,
				media: query,
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			})),
		});
		const proto = globalThis.HTMLDialogElement?.prototype;
		if (proto && !proto.showModal) {
			Object.defineProperty(proto, "showModal", {
				configurable: true,
				value: function () {
					this.setAttribute("open", "");
				},
			});
		}
		if (proto && !proto.close) {
			Object.defineProperty(proto, "close", {
				configurable: true,
				value: function () {
					this.removeAttribute("open");
					this.dispatchEvent(new Event("close"));
				},
			});
		}
	});

	it("should render correctly", () => {
		const { queryByText } = render(
			<BrowserRouter>
				<ConfigProvider>
					<IconProvider library={regularIcons}>
						<IntlProvider locale="en">
							<DataProviderContext.Provider value={{ dataProvider: data }}>
								<AuthContext.Provider
									value={{ currentUser: currentUser, isLoggedIn: true }}
								>
									<ToastProvider>
										<ModalProvider>
											<ListProvider>
												<InputProvider>
													<ArgumentInput
														onSubmit={callback}
														groupId={debate.id}
														groupName={debate.name}
														positions={debate.positions}
														disabledPositions={[]}
														listId={"argumentList"}
														positionId={debate.positions[0].id}
														hideSourceAction={false}
														avatarSize={48}
														placeholder={"Add an argument..."}
													/>
												</InputProvider>
											</ListProvider>
										</ModalProvider>
									</ToastProvider>
								</AuthContext.Provider>
							</DataProviderContext.Provider>
						</IntlProvider>
					</IconProvider>
				</ConfigProvider>
			</BrowserRouter>,
		);

		expect(queryByText(debate.positions[0].name)).toBeInTheDocument();
		expect(queryByText(debate.positions[1].name)).toBeInTheDocument();
		expect(queryByText(currentUser.full_name)).toBeInTheDocument();
		expect(queryByText("Add an argument...")).toBeInTheDocument();
		expect(queryByText("Your position")).toBeInTheDocument();
	});

	it("should render correctly if is reply", () => {
		const { queryByText } = render(
			<BrowserRouter>
				<ConfigProvider>
					<IconProvider library={regularIcons}>
						<IntlProvider locale="en">
							<DataProviderContext.Provider value={{ dataProvider: data }}>
								<AuthContext.Provider
									value={{ currentUser: currentUser, isLoggedIn: true }}
								>
									<ToastProvider>
										<ModalProvider>
											<ListProvider>
												<InputProvider>
													<ArgumentInput
														onSubmit={callback}
														groupId={debate.id}
														groupName={debate.name}
														positions={debate.positions}
														disabledPositions={[]}
														listId={"argumentList"}
														positionId={debate.positions[0].id}
														hideSourceAction={false}
														avatarSize={40}
														isReply
														placeholder={"Your reply..."}
													/>
												</InputProvider>
											</ListProvider>
										</ModalProvider>
									</ToastProvider>
								</AuthContext.Provider>
							</DataProviderContext.Provider>
						</IntlProvider>
					</IconProvider>
				</ConfigProvider>
			</BrowserRouter>,
		);

		expect(queryByText("Your reply...")).toBeInTheDocument();
		expect(queryByText(debate.positions[0].name)).toBeInTheDocument();
		expect(queryByText(debate.positions[1].name)).toBeInTheDocument();
		expect(queryByText(currentUser.full_name)).not.toBeInTheDocument();
	});

	it("should be disabled", () => {
		const { queryByText } = render(
			<BrowserRouter>
				<ConfigProvider>
					<IconProvider library={regularIcons}>
						<IntlProvider locale="en">
							<DataProviderContext.Provider value={{ dataProvider: data }}>
								<AuthContext.Provider
									value={{ currentUser: currentUser, isLoggedIn: true }}
								>
									<ToastProvider>
										<ModalProvider>
											<ListProvider>
												<InputProvider>
													<ArgumentInput
														onSubmit={callback}
														groupId={debate.id}
														groupName={debate.name}
														positions={debate.positions}
														disabledPositions={[]}
														disabled
														listId={"argumentList"}
														positionId={debate.positions[0].id}
														hideSourceAction={false}
														avatarSize={48}
														placeholder={"Add an argument..."}
													/>
												</InputProvider>
											</ListProvider>
										</ModalProvider>
									</ToastProvider>
								</AuthContext.Provider>
							</DataProviderContext.Provider>
						</IntlProvider>
					</IconProvider>
				</ConfigProvider>
			</BrowserRouter>,
		);

		expect(queryByText("Debate is closed")).toBeInTheDocument();
	});

	it("should display side modal if the disabledPositions is set", async () => {
		const { queryByText, getByText, getByTestId } = render(
			<BrowserRouter>
				<ConfigProvider>
					<IconProvider library={regularIcons}>
						<IntlProvider locale="en">
							<DataProviderContext.Provider value={{ dataProvider: data }}>
								<AuthContext.Provider
									value={{ currentUser: currentUser, isLoggedIn: true }}
								>
									<ToastProvider>
										<ModalProvider>
											<ListProvider>
												<InputProvider>
													<ArgumentInput
														onSubmit={() => {}}
														groupId={debate.id}
														groupName={debate.name}
														positions={debate.positions}
														disabledPositions={[
															{
																id: debate.positions[0].id,
																name: debate.positions[0].name,
															},
														]}
														listId={"argumentList"}
														positionId={debate.positions[0].id}
														hideSourceAction
														avatarSize={48}
														placeholder={"Add an argument..."}
													/>
												</InputProvider>
											</ListProvider>
										</ModalProvider>
									</ToastProvider>
								</AuthContext.Provider>
							</DataProviderContext.Provider>
						</IntlProvider>
					</IconProvider>
				</ConfigProvider>
			</BrowserRouter>,
		);

		expect(queryByText("Add an argument...")).toBeInTheDocument();
		expect(queryByText(debate.positions[0].name)).toBeInTheDocument();
		expect(queryByText(debate.positions[1].name)).toBeInTheDocument();

		const onSubmit = getByTestId("submit-button");
		expect(onSubmit).toBeInTheDocument();
		await act(async () => {
			await userEvent.click(onSubmit);
		});
	});

	it("should display error if the validation rules are not met", async () => {
		const targetContent = {
			root: {
				children: [
					{
						children: [
							{
								detail: 0,
								format: 1,
								mode: "normal",
								style: "",
								text: "I write",
								type: "text",
								version: 1,
							},
						],
						direction: "ltr",
						format: "",
						indent: 0,
						type: "paragraph",
						version: 1,
					},
				],
				direction: "ltr",
				format: "",
				indent: 0,
				type: "root",
				version: 1,
			},
		};
		const targetUrlContent = {
			root: {
				children: [
					{
						children: [
							{
								detail: 0,
								format: 1,
								mode: "normal",
								style: "",
								text: "I write https://mysite.com",
								type: "text",
								version: 1,
							},
						],
						direction: "ltr",
						format: "",
						indent: 0,
						type: "paragraph",
						version: 1,
					},
				],
				direction: "ltr",
				format: "",
				indent: 0,
				type: "root",
				version: 1,
			},
		};

		const AddContentComponent = () => {
			const { setInputRichContent } = useInput();

			const setShortContent = (event) => {
				setInputRichContent(targetContent);
			};

			const setUrlContent = (event) => {
				setInputRichContent(targetUrlContent);
			};

			return (
				<>
					<div onClick={setShortContent}>Click to set short content</div>
					<div onClick={setUrlContent}>Click to set url content</div>
				</>
			);
		};

		const { getByTestId, queryByText, getByRole } = render(
			<BrowserRouter>
				<ConfigProvider>
					<IconProvider library={regularIcons}>
						<IntlProvider locale="en">
							<DataProviderContext.Provider value={{ dataProvider: data }}>
								<AuthContext.Provider
									value={{ currentUser: currentUser, isLoggedIn: true }}
								>
									<ToastProvider>
										<ModalProvider>
											<ListProvider>
												<InputProvider>
													<AddContentComponent />
													<ArgumentInput
														onSubmit={callback}
														groupId={debate.id}
														groupName={debate.name}
														positions={debate.positions}
														disabledPositions={[]}
														disabled
														listId={"argumentList"}
														positionId={debate.positions[0].id}
														hideSourceAction={false}
														avatarSize={48}
														placeholder={"Add an argument..."}
													/>
												</InputProvider>
											</ListProvider>
										</ModalProvider>
									</ToastProvider>
								</AuthContext.Provider>
							</DataProviderContext.Provider>
						</IntlProvider>
					</IconProvider>
				</ConfigProvider>
			</BrowserRouter>,
		);

		const input = getByTestId("argument-input");
		await userEvent.click(input);

		const onSubmit = getByTestId("submit-button");

		// Empty content
		await act(async () => {
			await userEvent.click(onSubmit);
		});
		expect(queryByText("content can't be empty.")).toBeInTheDocument();

		// Short content
		const setContentButton = screen.getByText("Click to set short content");
		await act(async () => {
			await userEvent.click(setContentButton);
		});
		expect(queryByText("I write")).toBeInTheDocument();

		await act(async () => {
			await userEvent.click(onSubmit);
		});
		expect(
			queryByText("content is too short. It must be at least 3 long."),
		).toBeInTheDocument();

		// Url content
		const setUrlContentButton = screen.getByText("Click to set url content");
		await act(async () => {
			await userEvent.click(setUrlContentButton);
		});
		expect(queryByText("I write https://mysite.com")).toBeInTheDocument();
		expect(
			queryByText("content must not contain any links"),
		).toBeInTheDocument();

		// await act(async () => { await userEvent.click(onSubmit) });
	});

	it("should call submit callback", async () => {
		const targetContent = {
			root: {
				children: [
					{
						children: [
							{
								detail: 0,
								format: 1,
								mode: "normal",
								style: "",
								text: "I write an argument",
								type: "text",
								version: 1,
							},
						],
						direction: "ltr",
						format: "",
						indent: 0,
						type: "paragraph",
						version: 1,
					},
				],
				direction: "ltr",
				format: "",
				indent: 0,
				type: "root",
				version: 1,
			},
		};

		const AddContentComponent = () => {
			const { setInputRichContent } = useInput();

			const setContent = (event) => {
				setInputRichContent(targetContent);
			};

			return (
				<>
					<div onClick={setContent}>Click to set content</div>
				</>
			);
		};

		const { getByTestId, queryByText, getByRole } = render(
			<BrowserRouter>
				<ConfigProvider>
					<IconProvider library={regularIcons}>
						<IntlProvider locale="en">
							<DataProviderContext.Provider value={{ dataProvider: data }}>
								<AuthContext.Provider
									value={{ currentUser: currentUser, isLoggedIn: true }}
								>
									<ToastProvider>
										<ModalProvider>
											<ListProvider>
												<InputProvider>
													<AddContentComponent />
													<ArgumentInput
														onSubmit={callback}
														groupId={debate.id}
														groupName={debate.name}
														positions={debate.positions}
														disabledPositions={[]}
														disabled
														listId={"argumentList"}
														positionId={debate.positions[0].id}
														hideSourceAction={false}
														avatarSize={48}
														placeholder={"Add an argument..."}
													/>
												</InputProvider>
											</ListProvider>
										</ModalProvider>
									</ToastProvider>
								</AuthContext.Provider>
							</DataProviderContext.Provider>
						</IntlProvider>
					</IconProvider>
				</ConfigProvider>
			</BrowserRouter>,
		);

		const input = getByTestId("argument-input");
		await act(async () => {
			await userEvent.click(input);
		});

		const setContentButton = screen.getByText("Click to set content");
		await act(async () => {
			await userEvent.click(setContentButton);
		});
		expect(queryByText("I write an argument")).toBeInTheDocument();

		const onSubmit = getByTestId("submit-button");
		await act(async () => {
			await userEvent.click(onSubmit);
		});
		expect(callback).toHaveBeenCalled();
	});

	it("should focus editor when autoFocus is true", async () => {
		const { getByRole } = render(
			<BrowserRouter>
				<ConfigProvider>
					<IconProvider library={regularIcons}>
						<IntlProvider locale="en">
							<DataProviderContext.Provider value={{ dataProvider: data }}>
								<AuthContext.Provider
									value={{ currentUser: currentUser, isLoggedIn: true }}
								>
									<ToastProvider>
										<ModalProvider>
											<ListProvider>
												<InputProvider>
													<ArgumentInput
														onSubmit={callback}
														groupId={debate.id}
														groupName={debate.name}
														positions={debate.positions}
														disabledPositions={[]}
														listId={"argumentList"}
														positionId={debate.positions[0].id}
														hideSourceAction={true}
														avatarSize={48}
														placeholder={"Add an argument..."}
														autoFocus
													/>
												</InputProvider>
											</ListProvider>
										</ModalProvider>
									</ToastProvider>
								</AuthContext.Provider>
							</DataProviderContext.Provider>
						</IntlProvider>
					</IconProvider>
				</ConfigProvider>
			</BrowserRouter>,
		);

		const editor = getByRole("textbox");
		await act(async () => {
			await new Promise((r) => setTimeout(r, 0));
		});
		expect(document.activeElement).toBe(editor);
	});

	it("should focus editor when activeOnInit is true", async () => {
		Element.prototype.scrollIntoView = vi.fn();
		const { getByRole } = render(
			<BrowserRouter>
				<ConfigProvider>
					<IconProvider library={regularIcons}>
						<IntlProvider locale="en">
							<DataProviderContext.Provider value={{ dataProvider: data }}>
								<AuthContext.Provider
									value={{ currentUser: currentUser, isLoggedIn: true }}
								>
									<ToastProvider>
										<ModalProvider>
											<ListProvider>
												<InputProvider>
													<ArgumentInput
														onSubmit={callback}
														groupId={debate.id}
														groupName={debate.name}
														positions={debate.positions}
														disabledPositions={[]}
														listId={"argumentList"}
														positionId={debate.positions[0].id}
														hideSourceAction={true}
														avatarSize={48}
														placeholder={"Add an argument..."}
														activeOnInit
													/>
												</InputProvider>
											</ListProvider>
										</ModalProvider>
									</ToastProvider>
								</AuthContext.Provider>
							</DataProviderContext.Provider>
						</IntlProvider>
					</IconProvider>
				</ConfigProvider>
			</BrowserRouter>,
		);

		const editor = getByRole("textbox");
		await act(async () => {
			await new Promise((r) => setTimeout(r, 0));
		});
		expect(document.activeElement).toBe(editor);
	});

	it("should render correctly when there is no position", () => {
		const { queryByText } = render(
			<BrowserRouter>
				<ConfigProvider>
					<IconProvider library={regularIcons}>
						<IntlProvider locale="en">
							<DataProviderContext.Provider value={{ dataProvider: data }}>
								<AuthContext.Provider
									value={{ currentUser: currentUser, isLoggedIn: true }}
								>
									<ToastProvider>
										<ModalProvider>
											<ListProvider>
												<InputProvider>
													<ArgumentInput
														onSubmit={callback}
														groupId={debate.id}
														groupName={debate.name}
														positions={[]}
														disabledPositions={[]}
														listId={"argumentList"}
														positionId={null}
														hideSourceAction={false}
														avatarSize={48}
														placeholder={"Add an argument..."}
													/>
												</InputProvider>
											</ListProvider>
										</ModalProvider>
									</ToastProvider>
								</AuthContext.Provider>
							</DataProviderContext.Provider>
						</IntlProvider>
					</IconProvider>
				</ConfigProvider>
			</BrowserRouter>,
		);

		expect(queryByText("Add an argument...")).toBeInTheDocument();
		expect(queryByText("Your position")).not.toBeInTheDocument();
	});
	const writtenContent = {
		root: {
			children: [
				{
					children: [
						{
							detail: 0,
							format: 1,
							mode: "normal",
							style: "",
							text: "I write an argument",
							type: "text",
							version: 1,
						},
					],
					direction: "ltr",
					format: "",
					indent: 0,
					type: "paragraph",
					version: 1,
				},
			],
			direction: "ltr",
			format: "",
			indent: 0,
			type: "root",
			version: 1,
		},
	};

	const InputWithProviders = ({ provider, children, onSubmit = callback }) => (
		<BrowserRouter>
			<ConfigProvider>
				<IconProvider library={regularIcons}>
					<IntlProvider locale="en">
						<DataProviderContext.Provider value={{ dataProvider: provider }}>
							<AuthContext.Provider
								value={{ currentUser: currentUser, isLoggedIn: true }}
							>
								<ToastProvider>
									<ModalProvider>
										<ListProvider>
											<InputProvider>
												{children}
												<ArgumentInput
													onSubmit={onSubmit}
													groupId={debate.id}
													groupName={debate.name}
													positions={debate.positions}
													disabledPositions={[]}
													listId={"argumentList"}
													positionId={debate.positions[0].id}
													hideSourceAction
													avatarSize={48}
													placeholder={"Add an argument..."}
												/>
											</InputProvider>
										</ListProvider>
									</ModalProvider>
								</ToastProvider>
							</AuthContext.Provider>
						</DataProviderContext.Provider>
					</IntlProvider>
				</IconProvider>
			</ConfigProvider>
		</BrowserRouter>
	);

	const SetWrittenContent = () => {
		const { setInputRichContent } = useInput();

		return (
			<div onClick={() => setInputRichContent(writtenContent)}>
				Click to set content
			</div>
		);
	};

	const SetEditedContent = () => {
		const { setInputContent } = useInput();

		return (
			<div
				onClick={() =>
					setInputContent({
						id: faker.number.int(),
						content: "I write an argument",
						rich_content: JSON.stringify(writtenContent),
						sources: [],
						position: { id: debate.positions[0].id },
					})
				}
			>
				Click to edit content
			</div>
		);
	};

	it("should keep the content and notify the user when the submission fails", async () => {
		const submissionCallback = vi.fn();
		const post = vi.fn(() => Promise.reject(new Error("Network Error")));
		const failingProvider = dataProvider(
			{ ...httpClient, post },
			"https://mock.example.api",
		);

		render(
			<InputWithProviders
				provider={failingProvider}
				onSubmit={submissionCallback}
			>
				<SetWrittenContent />
			</InputWithProviders>,
		);

		await act(async () => {
			await userEvent.click(screen.getByTestId("argument-input"));
		});
		await act(async () => {
			await userEvent.click(screen.getByText("Click to set content"));
		});
		expect(screen.queryByText("I write an argument")).toBeInTheDocument();

		await act(async () => {
			await userEvent.click(screen.getByTestId("submit-button"));
		});

		expect(post).toHaveBeenCalledTimes(1);
		expect(submissionCallback).not.toHaveBeenCalled();
		expect(screen.queryByText("I write an argument")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Your contribution could not be sent. Please try again.",
			),
		).toBeInTheDocument();
	});

	it("should keep the content and notify the user when the update fails", async () => {
		Element.prototype.scrollIntoView = vi.fn();
		Range.prototype.getBoundingClientRect = vi.fn(() => ({
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			width: 0,
			height: 0,
		}));
		const patch = vi.fn(() => Promise.reject(new Error("Network Error")));
		const failingProvider = dataProvider(
			{ ...httpClient, patch },
			"https://mock.example.api",
		);

		render(
			<InputWithProviders provider={failingProvider}>
				<SetEditedContent />
			</InputWithProviders>,
		);

		await act(async () => {
			await userEvent.click(screen.getByText("Click to edit content"));
		});

		await act(async () => {
			await userEvent.click(screen.getByTestId("submit-button"));
		});

		expect(patch).toHaveBeenCalledTimes(1);
		expect(screen.queryByText("I write an argument")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Your contribution could not be saved. Please try again.",
			),
		).toBeInTheDocument();
	});

	it("should send a single request when submitted twice during a pending request", async () => {
		const post = vi.fn(() => new Promise(() => {}));
		const pendingProvider = dataProvider(
			{ ...httpClient, post },
			"https://mock.example.api",
		);

		render(
			<InputWithProviders provider={pendingProvider}>
				<SetWrittenContent />
			</InputWithProviders>,
		);

		await act(async () => {
			await userEvent.click(screen.getByTestId("argument-input"));
		});
		await act(async () => {
			await userEvent.click(screen.getByText("Click to set content"));
		});

		await act(async () => {
			await userEvent.click(screen.getByTestId("submit-button"));
		});
		await act(async () => {
			await userEvent.click(screen.getByTestId("submit-button"));
		});

		expect(post).toHaveBeenCalledTimes(1);
	});
});
