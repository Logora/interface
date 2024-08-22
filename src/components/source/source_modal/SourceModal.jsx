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
    const [source, setSource] = useState({});
    const [showPreview, setShowPreview] = useState(false);
    const [showPreviewError, setShowPreviewError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const dataProvider = useDataProvider();
    const [showErrorSource, setShowErrorSource] = useState(false);
    const intl = useIntl();
    const { hideModal } = useModal();


    const handleAddSource = () => {
        onAddSource(source);
        setSource({});
        setShowPreview(false);
        hideModal();
        if (onHideModal) {
            onHideModal();
        }
    }

    const fetchSource = (input) => {

        const data = {
            query: input,
        };
        if (allowedSources.length > 0 && !allowedSources.includes(input)) {
            setShowErrorSource(true);

            return;
        }
        setShowPreview(true);
        setDisabled(true);
        setShowPreviewError(false);
        dataProvider.create("sources/fetch", data).then(response => {
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

    return (
        <Modal title={intl.formatMessage({ id: "source.source_modal.modal_title", defaultMessage: "Ajouter une source" })} showCloseButton>
            <div className={styles.sourceModalBody}>
                <div className={styles.sourceInputContainer}>
                    <SearchInput
                        placeholder={intl.formatMessage({ id: "source.source_modal.input_placeholder", defaultMessage: "Entrez l'URL de la source..." })}
                        onSearchSubmit={(query) => fetchSource(query)}
                        disabled={disabled}
                    />
                    {errorMessage && (
                        <div className={styles.sourcePreviewError}>
                            {errorMessage}
                        </div>
                    )}
                    {allowedSources.length > 0 && (
                                                    <div className={styles.sourceinfo}>

                        <FormattedMessage
                            id="source.source_modal.info_label"
                            defaultMessage="Choisissez parmi : SPIEGEL.de, manager-magazin.de, 11FREUNDE.de"

                        />
                        </div>
                    )}
                </div>
                <div className={styles.sourcePreviewBox}>
                    {showPreview ? (
                        !showPreviewError ? (
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
                                            <FormattedMessage id="source.source_modal.submit_label" defaultMessage="Ajouter" />
                                        </Button>
                                    </>
                                    :
                                    <Loader />
                                }
                            </div>
                        ) : (
                            <div className={styles.sourcePreviewError}>
                                <FormattedMessage id="source.source_modal.error" defaultMessage="Problème lors de la récupération de la source" />
                            </div>
                        )
                    ) : null}
                </div>
            </div>
            {showErrorSource && (
                <AnnouncementDialog
                    message={intl.formatMessage({ id: "source.source_modal.error_unauthorized", defaultMessage: "Source non autorisée" })}
                    fullWidth
                />
            )}
        </Modal>

    );
}

SourceModal.propTypes = {
    /** Callback triggered when a source is added */
    onAddSource: PropTypes.func.isRequired,
    /** Callback triggered when modal is closed */
    onHideModal: PropTypes.func,
    /** Liste des sources autorisées */
    allowedSources: PropTypes.arrayOf(PropTypes.string),
}