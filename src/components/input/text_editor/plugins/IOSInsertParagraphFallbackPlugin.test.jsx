import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { act, render, waitFor } from "@testing-library/react";
import {
	$createParagraphNode,
	$createTextNode,
	$getRoot,
	KEY_ENTER_COMMAND,
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

const TestErrorBoundary = ({ children }) => children;

const EditorReadyPlugin = ({ onReady }) => {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		onReady(editor);
	}, [editor, onReady]);

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
			<RichTextPlugin
				contentEditable={<ContentEditable />}
				placeholder={null}
				ErrorBoundary={TestErrorBoundary}
			/>
			<IOSInsertParagraphFallbackPlugin />
			<EditorReadyPlugin onReady={onReady} />
		</LexicalComposer>,
	);
};

describe("IOSInsertParagraphFallbackPlugin", () => {
	it("inserts a paragraph when iOS does not emit beforeinput", async () => {
		const requestAnimationFrameSpy = vi
			.spyOn(window, "requestAnimationFrame")
			.mockImplementation((callback) => {
				setTimeout(() => callback(performance.now()), 0);
				return 1;
			});
		let editor;

		renderEditor((readyEditor) => {
			editor = readyEditor;
		});

		await waitFor(() => {
			expect(editor).toBeDefined();
		});

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

		const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });

		await act(async () => {
			editor.dispatchCommand(KEY_ENTER_COMMAND, enterEvent);
			await new Promise((resolve) => setTimeout(resolve, 0));
		});

		let paragraphCount;

		editor.getEditorState().read(() => {
			paragraphCount = $getRoot().getChildrenSize();
		});

		expect(paragraphCount).toBe(2);
		requestAnimationFrameSpy.mockRestore();
	});
});
