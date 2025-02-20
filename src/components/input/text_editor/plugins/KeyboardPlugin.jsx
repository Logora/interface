import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection } from 'lexical';
import { useEffect, useCallback } from 'react';

export function KeyboardPlugin({ onSubmit }) {
    const [editor] = useLexicalComposerContext();
    
    const handleSubmit = useCallback((event) => {
        if (onSubmit) {
            onSubmit(event);
        }
        const rootElement = editor.getRootElement();
        if (rootElement) {
            rootElement.blur();
            editor.update(() => {
                const selection = $getSelection();
                if (selection) {
                    selection.clear();
                }
            });
        }
    }, [editor, onSubmit]);

    useEffect(() => {
        const unregister = editor.registerCommand(
            'SUBMIT_EDITOR',
            handleSubmit,
            1
        );

        return () => {
            unregister();
        };
    }, [editor, handleSubmit]);

    return null;
}
