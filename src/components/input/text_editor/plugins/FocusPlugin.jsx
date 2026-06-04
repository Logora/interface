import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useInput } from "@logora/debate/input/input_provider";
import { useEffect, useRef } from "react";

export const FocusPlugin = ({ autoFocus = false }) => {
	const [editor] = useLexicalComposerContext();
	const { focus } = useInput();
	const hasAutoFocused = useRef(false);

	useEffect(() => {
		if (focus) {
			editor.focus(() => {
				const rootElement = editor.getRootElement();
				rootElement.focus();
			});
		}
	}, [focus, editor]);

	useEffect(() => {
		if (autoFocus && !hasAutoFocused.current) {
			hasAutoFocused.current = true;
			editor.focus(() => {
				const rootElement = editor.getRootElement();
				rootElement.focus();
			});
		}
	}, [autoFocus, editor]);

	return null;
};
