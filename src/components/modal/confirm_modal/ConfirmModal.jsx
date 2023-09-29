import React from 'react';
import { Modal, useModal } from '@logora/debate.dialog.modal';
import { Button } from '@logora/debate.action.button';
import styles from './ConfirmModal.module.scss';
import cx from 'classnames';

export const ConfirmModal = (props) => {
    const { hideModal } = useModal();

    const onConfirm = () => {
        hideModal();
        props.onConfirmCallback && props.onConfirmCallback();
    }
    
    const onCancel = () => {
        hideModal();
        props.onCancelCallback && props.onCancelCallback();
    }

    return (
        <Modal data-vid={"confirm_modal"} title={props.title}>
            <div>
                <div className={styles.modalContent}>
                    { props.question }
                </div>
                <div className={styles.modalActions}>
                    <Button data-tid={"action_confirm"} className={cx(styles.modalActionLeft, props.confirmButtonClass)} handleClick={() => onConfirm()}>{ props.confirmLabel }</Button>
                    <Button data-tid={"action_reject"} className={cx(styles.modalActionRight, props.cancelButtonClass)} handleClick={() => onCancel()}>{ props.cancelLabel }</Button>
                </div>
            </div>
        </Modal>
    );
}