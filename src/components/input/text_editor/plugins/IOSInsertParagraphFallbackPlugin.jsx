import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_PARAGRAPH_COMMAND, IS_IOS } from "lexical";
import { useEffect, useRef } from "react";

const IOS_ENTER_FALLBACK_DELAY_MS = 100;

const isPlainEnter = (event) =>
	event.key === "Enter" &&
	!event.shiftKey &&
	!event.altKey &&
	!event.ctrlKey &&
	!event.metaKey &&
	!event.isComposing;

const getEditorStateSnapshot = (editorState) =>
	JSON.stringify(editorState.toJSON());

export const IOSInsertParagraphFallbackPlugin = () => {
	const [editor] = useLexicalComposerContext();
	const pendingFallbacks = useRef([]);

	useEffect(() => {
		if (!IS_IOS) {
			return;
		}

		const handleKeyDown = (event) => {
			if (!isPlainEnter(event) || event.defaultPrevented) {
				return;
			}

			const snapshotBeforeEnter = getEditorStateSnapshot(editor.getEditorState());
			const pendingFallback = {
				timeoutId: null,
			};

			pendingFallback.timeoutId = setTimeout(() => {
				pendingFallbacks.current = pendingFallbacks.current.filter(
					(currentFallback) => currentFallback !== pendingFallback,
				);

				const snapshotAfterEnter = getEditorStateSnapshot(editor.getEditorState());

				if (snapshotAfterEnter === snapshotBeforeEnter) {
					editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, undefined);
				}
			}, IOS_ENTER_FALLBACK_DELAY_MS);

			pendingFallbacks.current.push(pendingFallback);
		};

		const unregisterRootListener = editor.registerRootListener(
			(rootElement, previousRootElement) => {
				previousRootElement?.removeEventListener("keydown", handleKeyDown);

				rootElement?.addEventListener("keydown", handleKeyDown);
			},
		);

		return () => {
			pendingFallbacks.current.forEach((pendingFallback) => {
				clearTimeout(pendingFallback.timeoutId);
			});
			pendingFallbacks.current = [];
			unregisterRootListener();
		};
	}, [editor]);

	return null;
};
