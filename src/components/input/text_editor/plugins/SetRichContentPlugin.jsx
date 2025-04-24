import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { useInput } from '@logora/debate.input.input_provider';

export const SetRichContentPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const { inputRichContent, setInputRichContent } = useInput();

    useEffect(() => {
        if (inputRichContent) {
            editor.update(() => {
                try {
                    const editorState = editor.parseEditorState(inputRichContent);
                    editor.setEditorState(editorState);
                    setInputRichContent(null);
                } catch (error) {
                    console.error("Error parsing rich content:", error);
                    setInputRichContent(null); // Clear invalid content
                }
            });
        }
    }, [inputRichContent]);

    return null;
};
