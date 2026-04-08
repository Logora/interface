import React from 'react';
import { Modal, useModal } from '@logora/debate/dialog/modal';
import { Button } from '@logora/debate/action/button';
import styles from './ConfirmModal.module.scss';
import cx from 'classnames';

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
                    <Button type="button" className={cx(styles.modalActionLeft, confirmButtonClass)} handleClick={() => onConfirm()}>{ confirmLabel }</Button>
                    <Button type="button" className={cx(styles.modalActionRight, cancelButtonClass)} handleClick={() => onCancel()}>{ cancelLabel }</Button>
                </div>
            </div>
        </Modal>
    );
}

