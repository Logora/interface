import React, { useState, useEffect, useId } from 'react';
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { ToolbarPlugin } from "./plugins/ToolbarPlugin";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin'
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { QuoteNode } from "@lexical/rich-text";
import { OverflowNode } from "@lexical/overflow";
import { AutoSavePlugin } from "./plugins/AutoSavePlugin";
import { SetContentPlugin } from "./plugins/SetContentPlugin";
import { SetRichContentPlugin } from "./plugins/SetRichContentPlugin";
import { ResetPlugin } from "./plugins/ResetPlugin";
import { FocusPlugin } from "./plugins/FocusPlugin";
import { MaxLengthPlugin } from "./plugins/MaxLengthPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { $getRoot } from "lexical";
import { useModal } from '@logora/debate.dialog.modal';
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { SourceModal } from '@logora/debate.source.source_modal';
import { SourceListItem } from '@logora/debate.source.source_list_item';
import { useIntl } from 'react-intl';
import styles from './TextEditor.module.scss';
import EditorTheme from './EditorTheme';
import cx from "classnames";
import PropTypes from "prop-types";

export const TextEditor = ({ placeholder, onSubmit, sources, hideSubmit = false, hideSourceAction = false, onActivation, disabled = false, handleChange, handleSourcesChange, shortBar = false, active = false, maxLength, disableRichText = false, editorRef, uid, allowedDomains = [], hideCharCount = false, disableAutoActivate = false, ...rest }) => {
    const [isActive, setIsActive] = useState(false);
    const [editorText, setEditorText] = useState("");
    const [editorRichText, setEditorRichText] = useState("");
    const [editorSources, setEditorSources] = useState([]);
    const { showModal } = useModal();
    const intl = useIntl();
    const randomUid = useId();

    useEffect(() => {
        if (sources && sources.length > 0) {
            setEditorSources(sources);
        }
    }, [sources]);

    useEffect(() => {
        if (handleSourcesChange && editorSources.length > 0) {
            handleSourcesChange(editorSources);
        }
    }, [editorSources]);

    const activate = () => {
        if (!isActive) {
            setIsActive(true);
            if (onActivation) {
                onActivation();
            }
        }
    }

    const editorConfig = {
        editable: !disabled,
        theme: EditorTheme,
        onError(error) {
            console.error("TextEditor error:", error)
        },
        nodes: [ListNode, ListItemNode, QuoteNode, OverflowNode],
    };

    const setFocus = () => {
        activate();
    }

    const onChange = (editorState) => {
        editorState.read(() => {
            const text = $getRoot().getTextContent();
            const richText = JSON.stringify(editorState);
            setEditorText(text);
            setEditorRichText(richText);
            if (handleChange) {
                handleChange(text, richText);
            }
        });
    }

    const handleSubmit = (event) => {
        const textContent = editorText;
        const richContent = editorRichText;
        const sources = editorSources;
        if (onSubmit) {
            event.preventDefault();
            onSubmit(textContent, richContent, sources);
        }
        setEditorSources([]);
    }

    const handleShowSourceModal = () => {
        showModal(
            <SourceModal
                onAddSource={handleAddSource}
                allowedSources={allowedDomains}
            />
        )
    }

    const handleAddSource = (newSource) => {
        setEditorSources([...editorSources, newSource]);
    }

    const displaySource = (source, index) => {
        return (
            <SourceListItem key={index} publisher={source.publisher} url={source.source_url} title={source.title} index={index} />
        );
    }

    const Placeholder = () => {
        return <div className={styles.editorPlaceholder}>{placeholder}</div>;
    }

    return (
        <>
            <LexicalComposer initialConfig={editorConfig}>
                <div className={styles.editorContainer} onClick={setFocus}>
                    <div className={cx(styles.editorInner, { [styles.editorInnerInactive]: !isActive && !active })}>
                        <RichTextPlugin
                            contentEditable={<ContentEditable className={cx(styles.editorInput, { [styles.editorInputInactive]: !isActive })} {...rest} />}
                            placeholder={placeholder && <Placeholder />}
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                        <ToolbarPlugin
                            hideSourceAction={hideSourceAction}
                            hideSubmit={hideSubmit}
                            disableRichText={disableRichText}
                            shortBar={shortBar}
                            onSubmit={handleSubmit}
                            onAddSource={handleShowSourceModal}
                            isActive={isActive || active}
                            sourceTooltip={allowedDomains?.length > 0 && intl.formatMessage({ id: "input.allowed_domains_tooltip", defaultMessage: "With the new source function, you can add links to your article." })}
                        />
                        {isActive && maxLength && !hideCharCount &&
                            <div className={styles.charactersCount}>
                                <CharacterLimitPlugin maxLength={maxLength} /> {intl.formatMessage({ id: "input.remaining_chars", defaultMessage: "remaining characters" })}
                            </div>
                        }
                        <ListPlugin />
                        <HistoryPlugin />
                        <OnChangePlugin onChange={onChange} ignoreSelectionChange />
                        <AutoSavePlugin
                            onSetContent={disableAutoActivate ? () => { } : activate}
                            storageUid={uid || randomUid}
                        />
                        <SetContentPlugin />
                        <SetRichContentPlugin />
                        <FocusPlugin />
                        {maxLength && <MaxLengthPlugin maxLength={maxLength} />}
                        <ResetPlugin storageUid={uid || randomUid} />
                        <EditorRefPlugin editorRef={editorRef} />
                    </div>
                </div>
            </LexicalComposer>
            {sources && sources.length !== 0 ? (
                <div className={styles.sourcesBox}>
                    <div className={styles.sourceList}>
                        {sources.map(displaySource)}
                    </div>
                </div>
            ) : null}
        </>
    );
}

TextEditor.propTypes = {
    /** Input placeholder */
    placeholder: PropTypes.string,
    /** Callback submit function */
    onSubmit: PropTypes.func,
    /** Array that contains sources  */
    sources: PropTypes.array,
    /** If true, hide submit button */
    hideSubmit: PropTypes.bool,
    /** If true, hide source button */
    hideSourceAction: PropTypes.bool,
    /** Callback for input activation */
    onActivation: PropTypes.func,
    /** If true, disabled input */
    disabled: PropTypes.bool,
    /** Update text */
    handleChange: PropTypes.func,
    /** Update sources */
    handleSourcesChange: PropTypes.func,
    /** If true, less space between icons */
    shortBar: PropTypes.bool,
    /** If true, show editor as active */
    active: PropTypes.bool,
    /** Maximum number of characters */
    maxLength: PropTypes.number,
    /** Show "X remaining characters" text */
    hideCharCount: PropTypes.bool,
    /** If true, hide rich text buttons */
    disableRichText: PropTypes.bool,
    /** Editor ref */
    editorRef: PropTypes.any,
    /** Allowed domain for sources */
    allowedDomains: PropTypes.array
};
