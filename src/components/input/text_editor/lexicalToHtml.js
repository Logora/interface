import { createHeadlessEditor } from "@lexical/headless";
import { $generateHtmlFromNodes } from '@lexical/html';
import { QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import DOMPurify from "dompurify";

export const lexicalToHtml = (rawContent) => {
    let html = null;
    
    const editor = createHeadlessEditor({
        nodes: [QuoteNode, ListItemNode, ListNode],
        onError: () => {},
    });
    const editorState = editor.parseEditorState(rawContent);
    editor.setEditorState(editorState);
    
    editor.update(() => {
        let htmlContent = $generateHtmlFromNodes(editor, null);
        html = DOMPurify.sanitize(htmlContent);
    })

    return html;
}