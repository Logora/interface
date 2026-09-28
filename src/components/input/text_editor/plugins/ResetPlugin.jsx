import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useInput } from "@logora/debate/input/input_provider";
import useLocalstorageState from "@rooks/use-localstorage-state";
import { $addUpdateTag, $createParagraphNode, $getRoot } from "lexical";
import { useEffect, useRef } from "react";

export const ResetPlugin = ({ storageUid, resetSignal, isReply = false }) => {
	const [editor] = useLexicalComposerContext();
	const { reset, setReset } = useInput();
	const [content, setContent, removeContent] = useLocalstorageState(
		`TextEditor:content_${storageUid}`,
		{},
	);
	const previousResetSignal = useRef(resetSignal);

	useEffect(() => {
		const hasLocalResetSignal =
			resetSignal !== undefined && resetSignal !== previousResetSignal.current;
		previousResetSignal.current = resetSignal;

		if (hasLocalResetSignal || (reset && !isReply)) {
			editor.update(() => {
				$addUpdateTag("skip-dom-selection");
				const root = $getRoot();
				const paragraph = $createParagraphNode();
				root.clear();
				root.append(paragraph);

				const selection = paragraph.selectStart();
				selection.format = 0;
				selection.style = "";

				removeContent();
				if (reset) {
					setReset(false);
				}
			});
		}
	}, [resetSignal, reset]);

	return null;
};
