import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useInput } from "@logora/debate/input/input_provider";
import { useEffect, useRef } from "react";

export const FocusPlugin = ({ autoFocus = false, isActive = false }) => {
	const [editor] = useLexicalComposerContext();
	const { focus } = useInput();
	const hasAutoFocused = useRef(false);
	const wasActive = useRef(isActive);

	const focusEditor = () => {
		editor.focus(() => {
			const rootElement = editor.getRootElement();
			rootElement?.focus();
		});
	};

	useEffect(() => {
		if (focus) {
			focusEditor();
		}
	}, [focus, editor]);

	useEffect(() => {
		if (autoFocus && !hasAutoFocused.current) {
			hasAutoFocused.current = true;
			focusEditor();
		}
	}, [autoFocus, editor]);

	useEffect(() => {
		if (isActive && !wasActive.current) {
			focusEditor();
		}
		wasActive.current = isActive;
	}, [isActive, editor]);

	return null;
};
