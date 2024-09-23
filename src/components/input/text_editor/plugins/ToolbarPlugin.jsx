import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    SELECTION_CHANGE_COMMAND,
    FORMAT_TEXT_COMMAND,
    $getSelection,
    $isRangeSelection
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import {
    INSERT_ORDERED_LIST_COMMAND,
    REMOVE_LIST_COMMAND,
    $isListNode,
    ListNode
} from "@lexical/list";
import { $createQuoteNode, $isHeadingNode } from "@lexical/rich-text";
import styles from './ToolbarPlugin.module.scss';
import cx from "classnames";
import { Icon } from '@logora/debate.icons.icon';
import { Button } from '@logora/debate.action.button';

export const ToolbarPlugin = (props) => {
    const LowPriority = 1;
    const [editor] = useLexicalComposerContext();
    const toolbarRef = useRef(null);
    const [blockType, setBlockType] = useState("paragraph");
    const [selectedElementKey, setSelectedElementKey] = useState(null);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const isDisabled = props.hideSubmit && props.hideSourceAction && props.disableRichText

    const updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode();
            const element =
                anchorNode.getKey() === "root"
                    ? anchorNode
                    : anchorNode.getTopLevelElementOrThrow();
            const elementKey = element.getKey();
            const elementDOM = editor.getElementByKey(elementKey);
            if (elementDOM !== null) {
                setSelectedElementKey(elementKey);
                if ($isListNode(element)) {
                    const parentList = $getNearestNodeOfType(anchorNode, ListNode);
                    const type = parentList ? parentList.getTag() : element.getTag();
                    setBlockType(type);
                } else {
                    const type = $isHeadingNode(element)
                        ? element.getTag()
                        : element.getType();
                    setBlockType(type);
                }
            }
            // Update text format
            setIsBold(selection.hasFormat("bold"));
            setIsItalic(selection.hasFormat("italic"));
            setIsUnderline(selection.hasFormat("underline"));
        }
    }, [editor]);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    updateToolbar();
                });
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_payload, newEditor) => {
                    updateToolbar();
                    return false;
                },
                LowPriority
            )
        );
    }, [editor, updateToolbar]);

    const formatNumberedList = () => {
        if (blockType !== "ol") {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND);
        }
    };

    const formatQuote = () => {
        if (blockType !== 'quote') {
            editor.update(() => {
                const selection = $getSelection();
                $setBlocksType(selection, () => $createQuoteNode());
            });
        }
    };

    return (
        (!isDisabled ?
            <div className={cx(styles.toolbar, { [styles.toolbarIsActive]: isDisabled ? false : props.isActive })} ref={toolbarRef}>
                {props.isActive ?
                    (!props.disableRichText &&
                        <div className={cx(styles.iconToolbar, { [styles.shortBar]: props.shortBar })}>
                            <button
                                onClick={() => {
                                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
                                }}
                                className={cx(styles.toolbarItem, { [styles.active]: isBold })}
                                aria-label="Format Bold"
                                data-testid="format-bold"
                            >
                                <Icon name="bold" width={24} height={24} className={cx(styles.format, styles.bold)} />
                            </button>
                            <button
                                onClick={() => {
                                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
                                }}
                                className={cx(styles.toolbarItem, { [styles.active]: isItalic })}
                                aria-label="Format Italics"
                            >
                                <Icon name="italic" width={24} height={24} className={cx(styles.format, styles.italic)} />
                            </button>
                            <button
                                onClick={() => {
                                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
                                }}
                                className={cx(styles.toolbarItem, { [styles.active]: isUnderline })}
                                aria-label="Format Underline"
                            >
                                <Icon name="underline" width={24} height={24} className={cx(styles.format, styles.underline)} />
                            </button>
                            <button
                                onClick={formatQuote}
                                className={styles.toolbarItem}
                                aria-label="Format Quote"
                            >
                                <Icon name="blockquote" width={24} height={24} className={cx(styles.format, styles.quote)} />
                            </button>
                            <button
                                onClick={formatNumberedList}
                                className={styles.toolbarItem}
                                aria-label="Format List"
                            >
                                <Icon name="orderedList" width={24} height={24} className={cx(styles.format, styles.numberedList)} />
                            </button>
                            {!props.hideSourceAction && (
                            <button
                                onClick={props.onAddSource}
                                className={styles.toolbarItem}
                                aria-label="Add Link"
                            >
                                <Icon name="link" width={24} height={24} className={cx(styles.format, styles.link)} />
                            </button>
                        )}
                        </div>
                    )
                    : null}
                <div className={styles.actionButton}>
                    {props.hideSubmit ? null
                        :
                        <Button
                            type="submit"
                            data-testid="submit-button"
                            handleClick={props.onSubmit}
                            className={cx(styles.inputSubmitActionButton, styles.submitAction)}
                        >
                            <Icon name="send" width={20} height={20} />
                        </Button>
                    }
                </div>
            </div>
            : null)
    );
};