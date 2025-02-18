import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection } from 'lexical';
import { useEffect } from 'react';

export function KeyboardPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        const unregister = editor.registerCommand(
            'SUBMIT_EDITOR',
            () => {
                const rootElement = editor.getRootElement();
                if (rootElement) {
                    rootElement.blur();
                    // Force the editor to lose selection which helps ensure keyboard dismissal
                    editor.update(() => {
                        const selection = $getSelection();
                        if (selection) {
                            selection.clear();
                        }
                    });
                }
                return true;
            },
            1
        );

        return () => {
            unregister();
        };
    }, [editor]);

    return null;
}
