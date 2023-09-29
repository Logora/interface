import React from 'react';
import { Modal, useModal } from '@logora/debate.dialog.modal';
import { Button } from '@logora/debate.action.button';
import styles from './ConfirmModal.module.scss';
import cx from 'classnames';
import PropTypes from "prop-types";

export const ConfirmModal = ({ title, question, confirmLabel, cancelLabel, onConfirmCallback, onCancelCallback, confirmButtonClass, cancelButtonClass }) => {
    const { hideModal } = useModal();

    const onConfirm = () => {
        hideModal();
        onConfirmCallback && onConfirmCallback();
    }
    
    const onCancel = () => {
        hideModal();
        onCancelCallback && onCancelCallback();
    }

    return (
        <Modal title={title}>
            <div>
                <div className={styles.modalContent}>
                    { question }
                </div>
                <div className={styles.modalActions}>
                    <Button className={cx(styles.modalActionLeft, confirmButtonClass)} handleClick={() => onConfirm()}>{ confirmLabel }</Button>
                    <Button className={cx(styles.modalActionRight, cancelButtonClass)} handleClick={() => onCancel()}>{ cancelLabel }</Button>
                </div>
            </div>
        </Modal>
    );
}

ConfirmModal.propTypes = {
    /** Modal title */
    title: PropTypes.string,
    /** Question displayed to the user */
    question: PropTypes.string.isRequired,
    /** Confirm button label */
    confirmLabel: PropTypes.string.isRequired,
    /** Cancel button label */
    cancelLabel: PropTypes.string.isRequired,
    /** Callback triggered if user confirms */
    onConfirmCallback: PropTypes.func,
    /** Callback triggered if user cancels */
    onCancelCallback: PropTypes.func,
    /** Class name passed to the confirm button */
    confirmButtonClass: PropTypes.string,
    /** Class name passed to the cancel button */
    cancelButtonClass: PropTypes.string
};