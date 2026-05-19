import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useInput } from "@logora/debate/input/input_provider";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import { useEffect } from "react";

export const SetContentPlugin = ({ content }) => {
	const [editor] = useLexicalComposerContext();
	const { inputContent, setInputContent } = useInput();

	const contentToLoad = content || inputContent;

	useEffect(() => {
		if (typeof contentToLoad === "string" && contentToLoad) {
			editor.update(() => {
				const root = $getRoot();
				root.clear();

				const p = $createParagraphNode();
				p.append($createTextNode(contentToLoad));
				root.append(p);

				if (!content && inputContent) {
					setInputContent(null);
				}
			});
		}
	}, [contentToLoad]);

	return null;
};