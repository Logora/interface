import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useInput } from "@logora/debate/input/input_provider";
import { useEffect } from "react";

export const FocusPlugin = () => {
	const [editor] = useLexicalComposerContext();
	const { focus } = useInput();

	useEffect(() => {
		if (focus) {
			editor.focus(() => {
				const rootElement = editor.getRootElement();
				rootElement.focus();
			});
		}
	}, [focus, editor]);

	return null;
};
