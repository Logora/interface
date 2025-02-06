import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { useInput } from '@logora/debate.input.input_provider';
import { $getRoot, $createParagraphNode } from "lexical";
import useSessionStorageState from '@rooks/use-sessionstorage-state';

export const ResetPlugin = ({ storageUid }) => {
    const [editor] = useLexicalComposerContext();
    const { reset, setReset } = useInput();
    const [content, setContent, removeContent] = useSessionStorageState(`TextEditor:content_${storageUid}`, {});

    useEffect(() => {
        if (reset) {
            editor.update(() => {
                const root = $getRoot();
                root.clear();
                const p = $createParagraphNode();
                root.append(p);
                setReset(false);
                removeContent();
                editor.blur();
            });
        }
    }, [reset]);

    return null;
};