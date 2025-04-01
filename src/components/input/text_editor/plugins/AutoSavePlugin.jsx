import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useEffect } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useDebouncedCallback } from 'use-debounce';
import useSessionStorageState from '@rooks/use-sessionstorage-state';

export const AutoSavePlugin = ({ storageUid, onSetContent }) => {
    const [editor] = useLexicalComposerContext();
    const [content, setContent, removeContent] = useSessionStorageState(`TextEditor:content_${storageUid}`, {});

    useEffect(() => {
        if (content) {
            if(Object.keys(content).length !== 0) {
                const editorState = editor.parseEditorState(content.editorState);
                editor.setEditorState(editorState);
                onSetContent?.();
            }
        }
    }, [content]);

    const onChange = useDebouncedCallback(
        (editorState, editor) => {
            editorState.read(() => {
                const sessionUserContent = {
                    editorState: JSON.stringify(editor.getEditorState())
                };
                setContent(sessionUserContent);
            })
        },
        1000,
        false
    );

    return (
        <OnChangePlugin onChange={onChange} ignoreSelectionChange />
    )
};