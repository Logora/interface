import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import React, { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export const AutoSavePlugin = ({ storageUid, onSetContent }) => {
	const [editor] = useLexicalComposerContext();
	const storageKey = `TextEditor:content_${storageUid}`;

	useEffect(() => {
		try {
			const content = JSON.parse(localStorage.getItem(storageKey));
			if (content?.editorState) {
				editor.setEditorState(editor.parseEditorState(content.editorState));
				onSetContent?.();
			}
		} catch (e) {}
	}, []);

	const onChange = useDebouncedCallback(
		(editorState) => {
			try {
				localStorage.setItem(
					storageKey,
					JSON.stringify({ editorState: JSON.stringify(editorState) }),
				);
			} catch (e) {}
		},
		1000,
		false,
	);

	return <OnChangePlugin onChange={onChange} ignoreSelectionChange />;
};
