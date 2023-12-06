import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { useInput } from '@logora/debate.input.input_provider';

export const SetContentPlugin = (props) => {
    const [editor] = useLexicalComposerContext();
    const { inputContent } = useInput();

    useEffect(() => {
        if (inputContent) {
            editor.update(() => {
                const editorState = editor.parseEditorState(inputContent);
                editor.setEditorState(editorState);
            });
        }
    }, [inputContent]);

    return null;
};