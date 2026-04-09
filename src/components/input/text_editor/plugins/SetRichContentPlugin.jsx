import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useInput } from "@logora/debate/input/input_provider";
import { useEffect } from "react";

export const SetRichContentPlugin = () => {
	const [editor] = useLexicalComposerContext();
	const { inputRichContent, setInputRichContent } = useInput();

	useEffect(() => {
		if (inputRichContent) {
			editor.update(() => {
				const editorState = editor.parseEditorState(inputRichContent);
				editor.setEditorState(editorState);
				setInputRichContent(null);
			});
		}
	}, [inputRichContent]);

	return null;
};
