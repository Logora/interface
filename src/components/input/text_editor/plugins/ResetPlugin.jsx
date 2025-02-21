import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { useInput } from "@logora/debate.input.input_provider";
import {
	$getRoot,
	$createParagraphNode,
	$addUpdateTag,
} from "lexical";
import useSessionStorageState from "@rooks/use-sessionstorage-state";

export const ResetPlugin = ({ storageUid }) => {
	const [editor] = useLexicalComposerContext();
	const { reset, setReset } = useInput();
	const [content, setContent, removeContent] = useSessionStorageState(
		`TextEditor:content_${storageUid}`,
		{},
	);

	useEffect(() => {
		if (reset) {
			editor.update(() => {
				$addUpdateTag("skip-dom-selection");
				const root = $getRoot();
				const paragraph = $createParagraphNode();
				root.clear();
				root.append(paragraph);

				removeContent();
				setReset(false);
			});
		}
	}, [reset, editor, removeContent, setReset]);

	return null;
};
