import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useEffect } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useDebouncedCallback } from 'use-debounce';
import useSessionStorageState from '@rooks/use-sessionstorage-state';

export const AutoSavePlugin = (props) => {
    const [editor] = useLexicalComposerContext();
    const [content, setContent, removeContent] = useSessionStorageState(`TextEditor:content_${props.storageUid}`, {});

    useEffect(() => {
        if (content) {
            if(Object.keys(content).length !== 0) {
                const editorState = editor.parseEditorState(content.editorState);
                editor.setEditorState(editorState);
                props.onSetContent();
            }
        }
    }, []);

    const onChange = useDebouncedCallback(
        (editorState, editor) => {
            editorState.read(() => {
                let sessionUserContent = {
                    editorState: editor.getEditorState()
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