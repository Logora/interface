import {
	$createParagraphNode,
	$createTextNode,
	$getRoot,
	$getSelection,
	createEditor,
} from "lexical";
import { placeCaretAtEnd } from "./FocusPlugin";

const editorWithText = async (text) => {
	const editor = createEditor();
	editor.update(() => {
		const paragraph = $createParagraphNode();
		paragraph.append($createTextNode(text));
		$getRoot().append(paragraph);
	});
	await vi.waitFor(() => {
		expect(editor.getEditorState().read(() => $getRoot().getTextContent())).toBe(
			text,
		);
	});
	return editor;
};

describe("placeCaretAtEnd", () => {
	it("should select the end of the editor content", async () => {
		const editor = await editorWithText("hello world");

		placeCaretAtEnd(editor);

		await vi.waitFor(() => {
			editor.getEditorState().read(() => {
				const selection = $getSelection();
				expect(selection.anchor.offset).toBe(11);
				expect(selection.focus.offset).toBe(11);
			});
		});
	});

	it("should not throw when the editor is empty", async () => {
		const editor = createEditor();

		expect(() => placeCaretAtEnd(editor)).not.toThrow();
	});
});
