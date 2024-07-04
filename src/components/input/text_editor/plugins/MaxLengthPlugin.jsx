import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$trimTextContentFromAnchor} from '@lexical/selection';
import {$restoreEditorState} from '@lexical/utils';
import {$getSelection, $isRangeSelection, EditorState, RootNode} from 'lexical';
import {useEffect} from 'react';

export const MaxLengthPlugin = ({ maxLength = 50000}) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    let lastRestoredEditorState = null;

    return editor.registerNodeTransform(RootNode, (rootNode) => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
        return;
      }
      const prevEditorState = editor.getEditorState();
      const prevTextContent = prevEditorState.read(() =>
        rootNode.getTextContent(),
      );
      const textContent = rootNode.getTextContent();
      if (prevTextContent !== textContent) {
        const textLength = textContent.length;
        const delCount = textLength - maxLength;
        const anchor = selection.anchor;

        if (delCount > 0) {
          if (
            prevTextContent.length === maxLength &&
            lastRestoredEditorState !== prevEditorState
          ) {
            lastRestoredEditorState = prevEditorState;
            $restoreEditorState(editor, prevEditorState);
          } else {
            $trimTextContentFromAnchor(editor, anchor, delCount);
          }
        }
      }
    });
  }, [editor, maxLength]);

  return null;
};