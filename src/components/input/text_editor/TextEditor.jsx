import React, { useState, useEffect } from 'react';
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
import { useId } from "react-use-id-hook";
import styles from './TextEditor.module.scss';
import EditorTheme from './EditorTheme';
import cx from "classnames";
import PropTypes from "prop-types";

export const TextEditor = ({ placeholder, onSubmit, sources, hideSubmit = false, hideSourceAction = false, onActivation, disabled = false, handleChange, handleSourcesChange, shortBar = false, active = false, maxLength, disableRichText = false, editorRef }) => {
    const [isActive, setIsActive] = useState(false);
    const [editorText, setEditorText] = useState("");
    const [editorRichText, setEditorRichText] = useState("");
    const [editorSources, setEditorSources] = useState([]);
    const { showModal } = useModal();
    const intl = useIntl();
    const uid = useId();

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
        editable: disabled ? false : true,
        theme: EditorTheme,
        onError(error) {
            throw error;
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
            <SourceModal onAddSource={handleAddSource} />
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
        <LexicalErrorBoundary>
            <LexicalComposer initialConfig={editorConfig}>
                <div className={styles.editorContainer} onClick={setFocus}>
                    <div className={cx(styles.editorInner, { [styles.editorInnerInactive]: !isActive && !active })}>
                        <RichTextPlugin
                            contentEditable={<ContentEditable className={cx(styles.editorInput, { [styles.editorInputInactive]: !isActive })} />}
                            placeholder={placeholder && <Placeholder />}
                        />
                        <ToolbarPlugin
                            hideSourceAction={hideSourceAction}
                            hideSubmit={hideSubmit}
                            disableRichText={disableRichText}
                            shortBar={shortBar}
                            onSubmit={handleSubmit}
                            onAddSource={handleShowSourceModal}
                            isActive={isActive || active}
                        />
                        {isActive && maxLength &&
                            <div className={styles.charactersCount}>
                                <CharacterLimitPlugin maxLength={maxLength} /> {intl.formatMessage({ id: "input.remaining_chars", defaultMessage: "remaining characters" })}
                            </div>
                        }
                        <ListPlugin />
                        <HistoryPlugin />
                        <OnChangePlugin onChange={onChange} ignoreSelectionChange />
                        <AutoSavePlugin onSetContent={activate} storageUid={uid} />
                        <SetContentPlugin />
                        <SetRichContentPlugin />
                        <FocusPlugin />
                        {maxLength && <MaxLengthPlugin maxLength={maxLength} />}
                        <ResetPlugin storageUid={uid} />
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
        </LexicalErrorBoundary>
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
    /** If true, hide rich text buttons */
    disableRichText: PropTypes.bool,
    /** Editor ref */
    editorRef: PropTypes.any
};

TextEditor.defaultProps = {
    hideSubmit: false,
    hideSourceAction: false,
    disabled: false,
    shortBar: false,
    active: false,
    disableRichText: false
};