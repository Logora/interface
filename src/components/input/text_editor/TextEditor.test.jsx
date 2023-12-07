import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { DefaultTextEditor, TextEditorWithSource } from './TextEditor.composition';
import { TextEditor } from './TextEditor';
import { ModalProvider } from '@logora/debate.dialog.modal';
import { InputProvider, useInput } from '@logora/debate.input.input_provider';
import { $getRoot, $createParagraphNode, $createTextNode, createEditor } from "lexical";
import { QuoteNode, $createQuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode, $createListItemNode, $createListNode } from "@lexical/list";
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import { IntlProvider } from 'react-intl';
import { IdProvider } from "react-use-id-hook";

const callback = jest.fn();

describe('TextEditor', () => {
    it('should render with placeholder', () => {
        const editor = render(
            <DefaultTextEditor />
        );
        const renderedEditor = editor.getByText(/Add an argument/i);
        expect(renderedEditor).toBeTruthy();
    });

    it('should call callback function on submit', async () => {
        const editor = render(
            <IntlProvider locale="en">
                <InputProvider>
                    <IconProvider library={regularIcons}>
                        <IdProvider>
                            <ModalProvider>
                                <TextEditor 
                                    handleChange={() => null}
                                    onSubmit={callback}
                                    onActivation={() => null}
                                    shortBar={true}
                                    uid={"34"}
                                    placeholder={"Add an argument"}
                                    sources={[{publisher: "test.com", source_url: "http://test.com", title: "Source Test"}]}
                                />
                            </ModalProvider>
                        </IdProvider>
                    </IconProvider>
                </InputProvider>
            </IntlProvider>
        );

        const onSubmit = document.querySelector('.inputSubmitActionButton');
        await act(async () => { await userEvent.click(onSubmit) });

        expect(callback).toHaveBeenCalled();
    });

    it('should call callback function and button on activation', async () => {
        const editor = render(
            <IntlProvider locale="en">
                <InputProvider>
                    <IconProvider library={regularIcons}>
                        <IdProvider>
                            <ModalProvider>
                                <TextEditor 
                                    handleChange={() => null}
                                    onSubmit={() => null}
                                    onActivation={callback}
                                    shortBar={true}
                                    uid={"34"}
                                    placeholder={"Add an argument"}
                                    sources={[{publisher: "test.com", source_url: "http://test.com", title: "Source Test"}]}
                                />
                            </ModalProvider>
                        </IdProvider>
                    </IconProvider>
                </InputProvider>
            </IntlProvider>
        );

        const input = screen.getByRole("textbox");
        let bold = screen.queryByTestId('format-bold');
        expect(bold).toBeNull();

        await act(async () => { await userEvent.click(input) });

        bold = screen.queryByTestId('format-bold');
        expect(callback).toHaveBeenCalled();
        expect(bold).toBeTruthy();
    });

    it('should focus editor on click', async () => {
        const container = render(
            <DefaultTextEditor />
        );

        expect(document.activeElement.tagName).toBe("BODY");

        const editor = screen.getByRole('textbox');
        await act(async () => { await userEvent.click(editor) });

        expect(document.activeElement).toBe(editor);
        expect(document.activeElement.tagName).toBe("DIV");
    });

    it('should render with source', () => {
        const editor = render(
            <TextEditorWithSource />
        );
        expect(screen.getByText(/test.com - Source Test/)).toBeTruthy();
        
    });

    it('should render with text', () => {
        let container = document.body;
        const rootElement = document.createElement('div');
        container.appendChild(rootElement);

        const editor = createEditor({
            namespace: 'MyEditor',
            theme: {
                text: {
                bold: 'editor-text-bold',
                italic: 'editor-text-italic',
                underline: 'editor-text-underline',
                },
            },
        });

        editor.update(() => {
            const root = $getRoot();
            const paragraph = $createParagraphNode();
            const text = $createTextNode('Some text');
            root.append(paragraph);
            paragraph.append(text);
        });

        editor.setRootElement(rootElement);

        expect(container.innerHTML).toBe(
        '<div style="user-select: text; white-space: pre-wrap; word-break: break-word;" data-lexical-editor="true"><p dir="ltr"><span data-lexical-text="true">Some text</span></p></div>',
        );
        
        container.removeChild(rootElement);
        container = null;
    });

    it('should render bold', () => {
        let container = document.body;
        const rootElement = document.createElement('div');
        container.appendChild(rootElement);

        const editor = createEditor({
            namespace: 'MyEditor',
            theme: {
                text: {
                bold: 'editor-text-bold',
                italic: 'editor-text-italic',
                underline: 'editor-text-underline',
                },
            },
        });

        editor.update(() => {
            const root = $getRoot();
            const paragraph = $createParagraphNode();
            const text = $createTextNode('Bold').toggleFormat('bold');
            root.append(paragraph);
            paragraph.append(text);
        });

        editor.setRootElement(rootElement);

        expect(container.innerHTML).toBe(
            '<div style="user-select: text; white-space: pre-wrap; word-break: break-word;" data-lexical-editor="true"><p dir="ltr"><strong class="editor-text-bold" data-lexical-text="true">Bold</strong></p></div>',
        );

        container.removeChild(rootElement);
        container = null;
    });

    it('should render italic', () => {
        let container = document.body;
        const rootElement = document.createElement('div');
        container.appendChild(rootElement);

        const editor = createEditor({
            namespace: 'MyEditor',
            theme: {
                text: {
                bold: 'editor-text-bold',
                italic: 'editor-text-italic',
                underline: 'editor-text-underline',
                },
            },
        });

        editor.update(() => {
            const root = $getRoot();
            const paragraph = $createParagraphNode();
            const text = $createTextNode('Italic').toggleFormat('italic');
            root.append(paragraph);
            paragraph.append(text);
        });

        editor.setRootElement(rootElement);

        expect(container.innerHTML).toBe(
            '<div style="user-select: text; white-space: pre-wrap; word-break: break-word;" data-lexical-editor="true"><p dir="ltr"><em class="editor-text-italic" data-lexical-text="true">Italic</em></p></div>',
        );

        container.removeChild(rootElement);
        container = null;
    });

    it('should render underline', () => {
        let container = document.body;
        const rootElement = document.createElement('div');
        container.appendChild(rootElement);

        const editor = createEditor({
            namespace: 'MyEditor',
            theme: {
                text: {
                bold: 'editor-text-bold',
                italic: 'editor-text-italic',
                underline: 'editor-text-underline',
                },
            },
        });

        editor.update(() => {
            const root = $getRoot();
            const paragraph = $createParagraphNode();
            const text = $createTextNode('Underline').toggleFormat('underline');
            root.append(paragraph);
            paragraph.append(text);
        });

        editor.setRootElement(rootElement);

        expect(container.innerHTML).toBe(
            '<div style="user-select: text; white-space: pre-wrap; word-break: break-word;" data-lexical-editor="true"><p dir="ltr"><span class="editor-text-underline" data-lexical-text="true">Underline</span></p></div>',
        );

        container.removeChild(rootElement);
        container = null;
    });

    it('should render bold, italic and underline', () => {
        let container = document.body;
        const rootElement = document.createElement('div');
        container.appendChild(rootElement);

        const editor = createEditor({
            namespace: 'MyEditor',
            theme: {
                text: {
                bold: 'editor-text-bold',
                italic: 'editor-text-italic',
                underline: 'editor-text-underline',
                },
            },
        });

        editor.update(() => {
            const root = $getRoot();
            const paragraph = $createParagraphNode();
            const text = $createTextNode('Some text').toggleFormat('bold').toggleFormat('italic').toggleFormat('underline');
            root.append(paragraph);
            paragraph.append(text);
        });

        editor.setRootElement(rootElement);

        expect(container.innerHTML).toBe(
            '<div style="user-select: text; white-space: pre-wrap; word-break: break-word;" data-lexical-editor="true"><p dir="ltr"><strong class="editor-text-bold editor-text-italic editor-text-underline" data-lexical-text="true">Some text</strong></p></div>',
        );

        container.removeChild(rootElement);
        container = null;
    });

    it('should render quote', () => {
        let container = document.body;
        const rootElement = document.createElement('div');
        container.appendChild(rootElement);

        const editor = createEditor({
            namespace: 'MyEditor',
            nodes: [QuoteNode],
        });

        editor.update(() => {
            const root = $getRoot();
            const quote = $createQuoteNode();
            quote.append($createTextNode("My quote"));
            root.append(quote);
        });

        editor.setRootElement(rootElement);

        expect(container.innerHTML).toBe(
            '<div style=\"user-select: text; white-space: pre-wrap; word-break: break-word;\" data-lexical-editor=\"true\"><blockquote dir=\"ltr\"><span data-lexical-text=\"true\">My quote</span></blockquote></div>',
        );

        container.removeChild(rootElement);
        container = null;
    });

    it('should render list items', () => {
        let container = document.body;
        const rootElement = document.createElement('div');
        container.appendChild(rootElement);

        const editor = createEditor({
            namespace: 'MyEditor',
            nodes: [ListNode, ListItemNode],
        });

        editor.update(() => {
            const root = $getRoot();
            const list = $createListNode('number');
            list.append(
                $createListItemNode().append($createTextNode("First item"),),
                $createListItemNode().append($createTextNode("Second item"),),
                $createListItemNode().append($createTextNode("Third item"),),
                $createListItemNode().append($createTextNode("Fourth item"),),
            );
            root.append(list);
        });

        editor.setRootElement(rootElement);

        expect(container.innerHTML).toBe(
            '<div style=\"user-select: text; white-space: pre-wrap; word-break: break-word;\" data-lexical-editor=\"true\"><ol><li value=\"1\" dir=\"ltr\"><span data-lexical-text=\"true\">First item</span></li><li value=\"2\" dir=\"ltr\"><span data-lexical-text=\"true\">Second item</span></li><li value=\"3\" dir=\"ltr\"><span data-lexical-text=\"true\">Third item</span></li><li value=\"4\" dir=\"ltr\"><span data-lexical-text=\"true\">Fourth item</span></li></ol></div>',
        );

        container.removeChild(rootElement);
        container = null;
    });

    it('should focus editor when setFocus called from outside', async () => {
        const FocusInputComponent = (props) => {
            const { setFocus } = useInput();

            const focusInput = (event) => {
                setFocus(true);
            }

            return (
                <div onClick={focusInput}>Click to focus</div>
            )
        }

        const container = render(
            <IntlProvider locale="en">
                <InputProvider>
                    <IdProvider>
                        <ModalProvider>
                            <IconProvider library={regularIcons}>
                                <FocusInputComponent />
                                <TextEditor 
                                    handleChange={() => null}
                                    onSubmit={() => null}
                                    onActivation={() => null}
                                    shortBar={true}
                                    uid={"34"}
                                    placeholder={"Add something"}
                                />
                            </IconProvider>
                        </ModalProvider>
                    </IdProvider>
                </InputProvider>
            </IntlProvider>
        );

        expect(screen.getByText("Add something")).toBeTruthy();

        const focusButton = screen.getByText("Click to focus");
        expect(document.activeElement.tagName).toBe("BODY");

        await act(async () => { await userEvent.click(focusButton) });

        const editor = screen.getByRole('textbox');
        expect(document.activeElement).toBe(editor);
    });


    it('should set content in editor when setContent called from outside', async () => {
        const targetContent = {"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Integer pretium varius odio ac eleifend.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}};

        const SetInputContentComponent = (props) => {
            const { setInputRichContent } = useInput();

            const setRichContent = (event) => {
                setInputRichContent(targetContent);
            }

            return (
                <div onClick={setRichContent}>Click to set content</div>
            )
        }

        const container = render(
            <IntlProvider locale="en">
                <InputProvider>
                    <IdProvider>
                        <ModalProvider>
                            <IconProvider library={regularIcons}>
                                <SetInputContentComponent />
                                <TextEditor 
                                    handleChange={() => null}
                                    onSubmit={() => null}
                                    onActivation={() => null}
                                    shortBar={true}
                                    uid={"34"}
                                    placeholder={"Add something"}
                                />
                            </IconProvider>
                        </ModalProvider>
                    </IdProvider>
                </InputProvider>
            </IntlProvider>
        );

        expect(screen.getByText("Add something")).toBeTruthy();

        const setContentButton = screen.getByText("Click to set content");
        expect(document.activeElement.tagName).toBe("BODY");

        await act(async () => { await userEvent.click(setContentButton) });

        expect(container.getByText("Integer pretium varius odio ac eleifend.")).toBeTruthy();
    });

    it('should display max length and update it', async () => {
        const targetContent = {"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Integer pretium varius odio ac eleifend.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}};

        const SetInputContentComponent = (props) => {
            const { setInputRichContent } = useInput();

            const setRichContent = (event) => {
                setInputRichContent(targetContent);
            }

            return (
                <div onClick={setRichContent}>Click to set content</div>
            )
        }

        const { getByText } = render(
            <IntlProvider locale="en">
                <InputProvider>
                    <IdProvider>
                        <IconProvider library={regularIcons}>
                            <ModalProvider>
                                <SetInputContentComponent />
                                <TextEditor 
                                    handleChange={() => null}
                                    onSubmit={() => null}
                                    onActivation={callback}
                                    shortBar={true}
                                    uid={"34"}
                                    placeholder={"Add an argument"}
                                    maxLength={500}
                                />
                            </ModalProvider>
                        </IconProvider>
                    </IdProvider>
                </InputProvider>
            </IntlProvider>
        );

        const input = screen.getByRole("textbox");
        await act(async () => { await userEvent.click(input) });
        const maxLength = getByText("remaining characters", { exact: false })
        expect(maxLength.textContent).toEqual("500 remaining characters");

        const setContentButton = screen.getByText("Click to set content");
        await act(async () => { await userEvent.click(setContentButton) });
        const maxLengthUpdated = getByText("remaining characters", { exact: false })
        expect(maxLengthUpdated.textContent).toEqual("460 remaining characters");
    });
});

// describe('ResetPlugin', () => {
//     const sessionStorageMock = (function() {
//         let store = {}
    
//         return {
//             name: "sessionStorage",
//             getItem: function(key) {
//                 return store[key] || null
//             },
//             setItem: function(key, value) {
//                 store[key] = value.toString()
//             },
//             removeItem: function(key) {
//                 delete store[key]
//             },
//             clear: function() {
//                 store = {}
//             }
//         }
//     })()

//     Object.defineProperty(window, 'sessionStorage', {
//         configurable: true,
//         value: sessionStorageMock
//     })

    
//     it('should reset content in editor when setReset called from outside', async () => {
//         const targetContent = {"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Integer pretium varius odio ac eleifend.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}};
    
//         const ResetContentComponent = (props) => {
//             const { setInputRichContent, setReset } = useInput();
    
//             const setContent = (event) => {
//                 setInputRichContent(targetContent);
//             }
    
//             const resetContent = (event) => {
//                 setReset(true);
//             }
    
//             return (
//                 <>
//                     <div onClick={setContent}>Click to set content</div>
//                     <div onClick={resetContent}>Click to reset content</div>
//                 </>
//             )
//         }
    
//         const container = render(
//             <IntlProvider locale="en">
//                 <InputProvider>
//                     <IdProvider>
//                         <ModalProvider>
//                             <IconProvider library={regularIcons}>
//                                 <ResetContentComponent />
//                                 <TextEditor 
//                                     handleChange={() => null}
//                                     onSubmit={() => null}
//                                     onActivation={() => null}
//                                     shortBar={true}
//                                     uid={"34"}
//                                     placeholder={"Add something"}
//                                 />
//                             </IconProvider>
//                         </ModalProvider>
//                     </IdProvider>
//                 </InputProvider>
//             </IntlProvider>
//         );
    
//         expect(screen.getByText("Add something")).toBeTruthy();
    
//         const setContentButton = screen.getByText("Click to set content");
//         const resetContentButton = screen.getByText("Click to reset content");
//         expect(document.activeElement.tagName).toBe("BODY");
    
//         await act(async () => { await userEvent.click(setContentButton) });
    
//         expect(container.getByText("Integer pretium varius odio ac eleifend.")).toBeTruthy();
    
//         await act(async () => { await userEvent.click(resetContentButton) });
    
//         expect(container.queryByText("Integer pretium varius odio ac eleifend.")).toBeNull();
//     });
// });

describe('AutoSavePlugin', () => {
    const sessionStorageMock = (function() {
        let store = {}
    
        return {
            name: "sessionStorage",
            getItem: function(key) {
                return store[key] || null
            },
            setItem: function(key, value) {
                store[key] = value.toString()
            },
            removeItem: function(key) {
                delete store[key]
            },
            clear: function() {
                store = {}
            }
        }
    })()

    Object.defineProperty(window, 'sessionStorage', {
        configurable: true,
        value: sessionStorageMock
    })

    it('should auto save content in session storage', async () => {
        const targetContent = {"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Integer pretium varius odio ac eleifend.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}};
        const getItemMock = jest.spyOn(window.sessionStorage, 'getItem');

        const AutoSaveContentComponent = (props) => {
            const { setInputRichContent } = useInput();

            const setContent = (event) => {
                setInputRichContent(targetContent);
            }

            return (
                <>
                    <div onClick={setContent}>Click to set content</div>
                </>
            )
        }
        
        const container = render(
            <IntlProvider locale="en">
                <InputProvider>
                    <IdProvider>
                        <ModalProvider>
                            <IconProvider library={regularIcons}>
                                <AutoSaveContentComponent />
                                <TextEditor 
                                    handleChange={() => null}
                                    onSubmit={() => null}
                                    onActivation={() => null}
                                    shortBar={true}
                                    uid={"34"}
                                    placeholder={"Add something"}
                                />
                            </IconProvider>
                        </ModalProvider>
                    </IdProvider>
                </InputProvider>
            </IntlProvider>
        );

        expect(screen.getByText("Add something")).toBeTruthy();

        const setContentButton = screen.getByText("Click to set content");
        expect(document.activeElement.tagName).toBe("BODY");

        await act(async () => { userEvent.click(setContentButton) });

        await waitFor(() => {
            expect(container.getByText("Integer pretium varius odio ac eleifend.")).toBeTruthy();
        });

        await act(async () => { await new Promise((r) => setTimeout(r, 1500)) });

        await waitFor(() => {
            expect(getItemMock).toHaveBeenCalled();
        });
    });
});