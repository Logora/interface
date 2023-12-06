import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { useInput } from '@logora/debate.input.input_provider';
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";

export const SetContentPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const { inputContent, setInputContent } = useInput();

    useEffect(() => {
        if (inputContent) {
            editor.update(() => {
                const root = $getRoot();
                root.clear();
                const p = $createParagraphNode();
                p.append($createTextNode(inputContent));
                root.append(p);
                setInputContent(null);
            });
        }
    }, [inputContent]);

    return null;
};