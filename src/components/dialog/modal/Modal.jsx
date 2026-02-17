import React, { useRef, useEffect } from "react";
import { useIntl } from 'react-intl';
import PropTypes from "prop-types";
import { useModal } from './useModal';
import cx from 'classnames';
import styles from './Modal.module.scss';
import { Icon } from "@logora/debate.icons.icon";

export const Modal = ({ title, showCloseButton = false, fullScreen, children, disableClickOutside = false, ...rest }) => {
  const dialogRef = useRef();
  const intl = useIntl();
  const { hideModal } = useModal();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog && dialog.open) {
        dialog.close();
      }
    }
  }, [])

  const handleClickBackdrop = (e) => {
    if (disableClickOutside) return;
    
    const dialog = dialogRef.current;
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    
    if (!isInDialog) {
      hideModal();
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    hideModal();
  };

  return (
    <dialog 
      ref={dialogRef}
      className={cx(styles.modalDialog, { [styles.modalDialogFullScreen]: fullScreen })} 
      aria-labelledby={title ? "modal-title" : undefined}
      onClick={handleClickBackdrop}
      onClose={handleClose}
      {...rest}
    >
      <div className={cx(styles.modalContainer)}>
        <div className={cx(styles.modalHeader, { [styles.modalHeaderWithTitle]: title })}>
          {title &&
            <div id="modal-title">{title}</div>
          }
          {showCloseButton &&
            <button
              type="button"
              className={styles.modalExitButton}
              onClick={hideModal}
              aria-label={intl.formatMessage({ id: "dialog.modal.aria_label", defaultMessage: "Close dialog" })}
              data-testid="close-button"
            >
              <Icon
                name="close"
                height={18}
                width={18}
                aria-hidden="true"
                focusable="false"
              />
            </button>
          }
        </div>
        <div className={styles.modalContent}>
          {children}
        </div>
      </div>
    </dialog>
  );
};

Modal.propTypes = {
  /** Modal title */
  title: PropTypes.string,
  /** If true, a close button will be shown */
  showCloseButton: PropTypes.bool,
  /** If true, the modal will be full screen with a white background */
  fullScreen: PropTypes.bool,
  /** Modal content */
  children: PropTypes.node,
  /** Disable the click outside to close modal option */
  disableClickOutside: PropTypes.bool,
  /** Other props passed to the modal */
  rest: PropTypes.object
};
