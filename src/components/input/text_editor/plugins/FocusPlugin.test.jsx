import {
	$createParagraphNode,
	$createTextNode,
	$getRoot,
	$getSelection,
	createEditor,
} from "lexical";
import { placeCaretAtEnd } from "./FocusPlugin";

const editorWithBlocks = async (blocks) => {
	const editor = createEditor();
	editor.update(() => {
		blocks.forEach((text) => {
			const paragraph = $createParagraphNode();
			if (text) {
				paragraph.append($createTextNode(text));
			}
			$getRoot().append(paragraph);
		});
	});
	await vi.waitFor(() => {
		expect(editor.getEditorState().read(() => $getRoot().getChildrenSize())).toBe(
			blocks.length,
		);
	});
	return editor;
};

const editorWithText = (text) => editorWithBlocks([text]);

describe("placeCaretAtEnd", () => {
	it("should select the end of the editor content", async () => {
		const editor = await editorWithText("hello world");

		placeCaretAtEnd(editor);

		await vi.waitFor(() => {
			editor.getEditorState().read(() => {
				const selection = $getSelection();
				expect(selection.anchor.type).toBe("text");
				expect(selection.anchor.offset).toBe(11);
				expect(selection.focus.offset).toBe(11);
			});
		});
	});

	it("should not throw when the editor is empty", async () => {
		const editor = createEditor();

		expect(() => placeCaretAtEnd(editor)).not.toThrow();
	});

	it("should select an element point for an empty paragraph", async () => {
		const editor = await editorWithBlocks([""]);

		placeCaretAtEnd(editor);

		await vi.waitFor(() => {
			editor.getEditorState().read(() => {
				const selection = $getSelection();
				expect(selection.anchor.type).toBe("element");
				expect(selection.anchor.offset).toBe(0);
				expect(selection.focus.offset).toBe(0);
			});
		});
	});

	it("should select a trailing empty paragraph after some text", async () => {
		const editor = await editorWithBlocks(["hello", ""]);
		const lastParagraphKey = editor
			.getEditorState()
			.read(() => $getRoot().getLastChild().getKey());

		placeCaretAtEnd(editor);

		await vi.waitFor(() => {
			editor.getEditorState().read(() => {
				const selection = $getSelection();
				expect(selection.anchor.type).toBe("element");
				expect(selection.anchor.key).toBe(lastParagraphKey);
				expect(selection.anchor.offset).toBe(0);
			});
		});
	});
});
