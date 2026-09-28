import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useInput } from "@logora/debate/input/input_provider";
import { useEffect } from "react";

export const SetRichContentPlugin = ({ richContent, isReply = false }) => {
	const [editor] = useLexicalComposerContext();
	const { inputRichContent, setInputRichContent } = useInput();

	const richContentToLoad = richContent || (!isReply ? inputRichContent : undefined);

	useEffect(() => {
		if (richContentToLoad) {
			editor.update(() => {
				const editorState = editor.parseEditorState(richContentToLoad);
				editor.setEditorState(editorState);

				if (!richContent && inputRichContent) {
					setInputRichContent(null);
				}
			});
		}
	}, [richContentToLoad]);

	return null;
};
