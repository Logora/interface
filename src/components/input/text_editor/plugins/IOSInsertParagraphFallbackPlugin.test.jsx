import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
	$createParagraphNode,
	$createTextNode,
	$getSelection,
	$getRoot,
	$isRangeSelection,
	COMMAND_PRIORITY_EDITOR,
	INSERT_PARAGRAPH_COMMAND,
} from "lexical";
import React, { useEffect } from "react";
import { IOSInsertParagraphFallbackPlugin } from "./IOSInsertParagraphFallbackPlugin";

vi.mock("lexical", async (importOriginal) => {
	const actual = await importOriginal();

	return {
		...actual,
		IS_IOS: true,
	};
});

const EditorReadyPlugin = ({ onReady }) => {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		onReady(editor);
	}, [editor, onReady]);

	return null;
};

const InsertParagraphCommandPlugin = () => {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		return editor.registerCommand(
			INSERT_PARAGRAPH_COMMAND,
			() => {
				const selection = $getSelection();

				if (!$isRangeSelection(selection)) {
					return false;
				}

				selection.insertParagraph();
				return true;
			},
			COMMAND_PRIORITY_EDITOR,
		);
	}, [editor]);

	return null;
};

const renderEditor = (onReady) => {
	return render(
		<LexicalComposer
			initialConfig={{
				namespace: "IOSInsertParagraphFallbackPluginTest",
				onError: (error) => {
					throw error;
				},
				theme: {},
			}}
		>
			<ContentEditable />
			<InsertParagraphCommandPlugin />
			<IOSInsertParagraphFallbackPlugin />
			<EditorReadyPlugin onReady={onReady} />
		</LexicalComposer>,
	);
};

const setInitialContent = async (editor) => {
	await act(async () => {
		editor.update(() => {
			const root = $getRoot();
			const paragraph = $createParagraphNode();

			root.clear();
			paragraph.append($createTextNode("test"));
			root.append(paragraph);
			paragraph.selectEnd();
		});
	});
};

const insertParagraph = async (editor) => {
	await act(async () => {
		editor.update(() => {
			const selection = $getSelection();

			if ($isRangeSelection(selection)) {
				selection.insertParagraph();
			}
		});
	});
};

const getParagraphCount = (editor) => {
	let paragraphCount;

	editor.getEditorState().read(() => {
		paragraphCount = $getRoot().getChildrenSize();
	});

	return paragraphCount;
};

describe("IOSInsertParagraphFallbackPlugin", () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it("inserts a paragraph when iOS does not emit beforeinput", async () => {
		vi.useFakeTimers();
		let editor;

		renderEditor((readyEditor) => {
			editor = readyEditor;
		});

		await waitFor(() => {
			expect(editor).toBeDefined();
		});

		await setInitialContent(editor);

		await act(async () => {
			fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });
			vi.advanceTimersByTime(100);
		});

		expect(getParagraphCount(editor)).toBe(2);
	});

	it("does not insert a duplicate paragraph when the editor already changed", async () => {
		vi.useFakeTimers();
		let editor;

		renderEditor((readyEditor) => {
			editor = readyEditor;
		});

		await waitFor(() => {
			expect(editor).toBeDefined();
		});

		await setInitialContent(editor);

		await act(async () => {
			fireEvent.keyDown(screen.getByRole("textbox"), { key: "Enter" });
		});

		await insertParagraph(editor);

		await act(async () => {
			vi.advanceTimersByTime(100);
		});

		expect(getParagraphCount(editor)).toBe(2);
	});
});
