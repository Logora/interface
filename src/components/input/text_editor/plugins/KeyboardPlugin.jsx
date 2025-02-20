import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useCallback } from 'react';

export function KeyboardPlugin({ onSubmit }) {
    const [editor] = useLexicalComposerContext();
    
    const handleSubmit = useCallback((event) => {
        if (onSubmit) {
            onSubmit(event);
        }
        editor.blur();
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
