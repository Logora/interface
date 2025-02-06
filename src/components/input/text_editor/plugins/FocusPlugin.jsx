import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { useInput } from '@logora/debate.input.input_provider';

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
    }, [focus]);

    return null;
};