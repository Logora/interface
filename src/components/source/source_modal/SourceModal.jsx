import React, { useState } from 'react';
import { Modal, useModal } from '@logora/debate.dialog.modal';
import { useDataProvider } from '@logora/debate.data.data_provider';
import { FormattedMessage, useIntl } from 'react-intl';
import { SourceBox } from '@logora/debate.source.source_box';
import { Button } from '@logora/debate.action.button';
import { Loader } from '@logora/debate.progress.loader';
import { SearchInput } from '@logora/debate.input.search_input';
import { AnnouncementDialog } from "@logora/debate.dialog.announcement_dialog";
import styles from './SourceModal.module.scss';
import PropTypes from "prop-types";

export const SourceModal = ({ onAddSource, onHideModal, allowedSources = [] }) => {
    const [disabled, setDisabled] = useState(false);
    const [source, setSource] = useState();
    const [showPreviewError, setShowPreviewError] = useState(false);
    const dataProvider = useDataProvider();
    const [showUnauthorizedError, setShowUnauthorizedError] = useState(false);
    const intl = useIntl();
    const { hideModal } = useModal();

    const handleAddSource = () => {
        onAddSource(source);
        setSource(null);
        hideModal();
        if (onHideModal) {
            onHideModal();
        }
    }

    const isSourceAuthorized = (sourceUrl) => {
        if (!allowedSources || allowedSources.length === 0) {
            return true;
        }

        const domain = sourceUrl.hostname.replace('www.', '');

        if (allowedSources.includes(domain)) {
            return true;
        }
        return false;
    }

    const fetchSource = (input) => {
        setShowUnauthorizedError(false);
        setSource(null);
        setShowPreviewError(false);

        if (!input) {
            return false;
        }

        let inputUrl;

        try {
            inputUrl = new URL(input);
        } catch {
            setShowPreviewError(true);
            return false;
        }

        if (!isSourceAuthorized(inputUrl)) {
            setShowUnauthorizedError(true);
        } else {
            setDisabled(true);
            dataProvider.create("sources/fetch", { query: input }).then(response => {
                if (response.data.success) {
                    setSource(response.data.data.resource);
                    setDisabled(false);
                } else {
                    setDisabled(false);
                    setShowPreviewError(true);
                }
            }, error => {
                setDisabled(false);
                setShowPreviewError(true);
            });
        }
    }

    return (
        <Modal title={intl.formatMessage({ id: "source.source_modal.modal_title", defaultMessage: "Add a source" })} showCloseButton>
            <div className={styles.sourceModalBody}>
                <div className={styles.sourceInputContainer}>
                    <SearchInput
                        placeholder={intl.formatMessage({ id: "source.source_modal.input_placeholder", defaultMessage: "Enter the URL of the source..." })}
                        onSearchSubmit={(query) => fetchSource(query)}
                        disabled={disabled}
                        type="url"
                    />
                    <div className={styles.sourceInputHelp}>
                        <FormattedMessage
                            id="source.source_modal.input_help"
                            defaultMessage="Press Enter to add the source"
                        />
                    </div>
                    {allowedSources.length > 0 && (
                        <>
                            <div className={styles.separator} />
                            <div className={styles.allowedSourcesInfo}>
                                <FormattedMessage
                                    id="source.source_modal.info_label"
                                    defaultMessage="Choose from : {domains}"
                                    values={{ domains: allowedSources.join(', ') }}
                                />
                            </div>
                        </>
                    )}

                </div>
                <div className={styles.sourcePreviewBox}>
                    {showPreviewError && (
                        <AnnouncementDialog
                            message={intl.formatMessage({ id: "source.source_modal.error", defaultMessage: "Error when fetching source" })}
                            fullWidth
                        />
                    )}
                    {showUnauthorizedError && (
                        <AnnouncementDialog
                            message={intl.formatMessage({ id: "source.source_modal.error_unauthorized", defaultMessage: "Unauthorized source" })}
                            fullWidth
                        />
                    )}
                    {source && (
                        <div>
                            {!disabled ?
                                <>
                                    <SourceBox
                                        title={source.title}
                                        description={source.description}
                                        url={source.source_url}
                                        imageUrl={source.origin_image_url}
                                        publisher={source.publisher}
                                    />
                                    <Button data-tid={"action_submit_source"} className={styles.sourcePreviewButton} handleClick={handleAddSource}>
                                        <FormattedMessage id="source.source_modal.submit_label" defaultMessage="Add" />
                                    </Button>
                                </>
                                :
                                <Loader />
                            }
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}

SourceModal.propTypes = {
    /** Callback triggered when a source is added */
    onAddSource: PropTypes.func.isRequired,
    /** Callback triggered when modal is closed */
    onHideModal: PropTypes.func,
    /** List of authorized source domains */
    allowedSources: PropTypes.arrayOf(PropTypes.string),
}