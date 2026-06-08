import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
	COMMAND_PRIORITY_LOW,
	$getRoot,
	INSERT_PARAGRAPH_COMMAND,
	IS_IOS,
	KEY_ENTER_COMMAND,
} from "lexical";
import { useEffect, useRef } from "react";

const isParagraphInput = (event) =>
	event.inputType === "insertParagraph" || event.inputType === "insertLineBreak";

const getTextStructureSnapshot = (editorState) => {
	let snapshot = "";

	editorState.read(() => {
		const root = $getRoot();

		snapshot = `${root.getChildrenSize()}:${root.getTextContent()}`;
	});

	return snapshot;
};

export const IOSInsertParagraphFallbackPlugin = () => {
	const [editor] = useLexicalComposerContext();
	const lastParagraphInputTimeStamp = useRef(null);

	useEffect(() => {
		if (!IS_IOS) {
			return;
		}

		const handleBeforeInput = (event) => {
			if (isParagraphInput(event)) {
				lastParagraphInputTimeStamp.current = event.timeStamp;
			}
		};

		const unregisterRootListener = editor.registerRootListener(
			(rootElement, previousRootElement) => {
				previousRootElement?.removeEventListener(
					"beforeinput",
					handleBeforeInput,
					true,
				);

				rootElement?.addEventListener("beforeinput", handleBeforeInput, true);
			},
		);

		const unregisterCommand = editor.registerCommand(
			KEY_ENTER_COMMAND,
			(event) => {
				if (
					!event ||
					event.shiftKey ||
					event.altKey ||
					event.ctrlKey ||
					event.metaKey
				) {
					return false;
				}

				const snapshotBeforeEnter = getTextStructureSnapshot(
					editor.getEditorState(),
				);
				const enterTimeStamp = event.timeStamp;

				requestAnimationFrame(() => {
					const hasNativeParagraphInput =
						lastParagraphInputTimeStamp.current !== null &&
						lastParagraphInputTimeStamp.current >= enterTimeStamp;
					const snapshotAfterEnter = getTextStructureSnapshot(
						editor.getEditorState(),
					);

					if (
						!hasNativeParagraphInput &&
						snapshotAfterEnter === snapshotBeforeEnter
					) {
						editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, undefined);
					}
				});

				return false;
			},
			COMMAND_PRIORITY_LOW,
		);

		return () => {
			unregisterCommand();
			unregisterRootListener();
		};
	}, [editor]);

	return null;
};
