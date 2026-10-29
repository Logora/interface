import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useInput } from "@logora/debate/input/input_provider";
import { $getRoot, $isTextNode } from "lexical";
import { useCallback, useEffect, useRef } from "react";

export const placeCaretAtEnd = (editor) => {
	editor.update(() => {
		const lastDescendant = $getRoot().getLastDescendant();
		if (!lastDescendant) {
			return;
		}
		const offset = $isTextNode(lastDescendant)
			? lastDescendant.getTextContentSize()
			: lastDescendant.getChildrenSize();
		lastDescendant.select(offset, offset);
	});
};

export const FocusPlugin = ({ autoFocus = false, isReply = false }) => {
	const [editor] = useLexicalComposerContext();
	const { focus } = useInput();
	const hasAutoFocused = useRef(false);

	const focusEditor = useCallback(() => {
		placeCaretAtEnd(editor);
		editor.focus(() => {
			const rootElement = editor.getRootElement();
			rootElement?.focus({ preventScroll: true });
		});
	}, [editor]);

	useEffect(() => {
		if (focus && !isReply) {
			focusEditor();
		}
	}, [focus, focusEditor, isReply]);

	useEffect(() => {
		if (autoFocus && !hasAutoFocused.current) {
			hasAutoFocused.current = true;
			focusEditor();
		}
	}, [autoFocus, focusEditor]);

	return null;
};
