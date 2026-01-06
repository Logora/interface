import React, { useRef, useEffect } from "react";
import { useIntl } from 'react-intl';
import PropTypes from "prop-types";
import { useModal } from './useModal';
import useOnClickOutside from 'use-onclickoutside';
import cx from 'classnames';
import styles from './Modal.module.scss';
import { Icon } from "@logora/debate.icons.icon";

export const Modal = ({ title, showCloseButton = false, fullScreen, children, disableClickOutside = false, ...rest }) => {
  const modalRef = useRef();
  const intl = useIntl();
  const { hideModal } = useModal();

  useOnClickOutside(modalRef, disableClickOutside ? null : hideModal);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = null;
    }
  }, [])

  return (
    <div className={cx(styles.modalWrapper, { [styles.modalWrapperFullScreen]: fullScreen })}>
      <div className={cx(styles.modalDialog, { [styles.modalDialogFullScreen]: fullScreen })} role="dialog" {...rest}>
        <div className={cx(styles.modalContainer)} ref={modalRef}>
          <div className={cx(styles.modalHeader, { [styles.modalHeaderWithTitle]: title })}>
            {title &&
              <div>{title}</div>
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
      </div>
    </div>
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
