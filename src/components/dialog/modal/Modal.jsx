import React, { useRef, useEffect, useCallback } from "react";
import { useIntl } from 'react-intl';
import PropTypes from "prop-types";
import { useModal } from './useModal';
import useOnClickOutside from 'use-onclickoutside';
import cx from 'classnames';
import styles from './Modal.module.scss';
import { Icon } from "@logora/debate.icons.icon";

export const Modal = ({ title, showCloseButton = false, fullScreen, children, disableClickOutside = false, ...rest }) => {
  const modalRef = useRef();
  const closeButtonRef = useRef();
  const intl = useIntl();
  const { hideModal } = useModal();

  useOnClickOutside(modalRef, disableClickOutside ? null : hideModal);

  // Get all focusable elements within the modal
  const getFocusableElements = useCallback(() => {
    if (!modalRef.current) return [];
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return Array.from(modalRef.current.querySelectorAll(focusableSelectors))
      .filter(el => !el.hasAttribute('disabled') && el.tabIndex !== -1);
  }, []);

  // Handle Tab key for focus trap
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      hideModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: if on first element, wrap to last
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: if on last element, wrap to first
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  }, [hideModal, getFocusableElements]);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    
    // Set initial focus to close button or first focusable element
    const setInitialFocus = () => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      } else {
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(setInitialFocus);

    // Add keydown listener for ESC and Tab trap
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflowY = null;
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown, getFocusableElements])

  return (
    <div className={cx(styles.modalWrapper, { [styles.modalWrapperFullScreen]: fullScreen })}>
      <div className={cx(styles.modalDialog, { [styles.modalDialogFullScreen]: fullScreen })} role="dialog"  aria-modal="true"  aria-labelledby={title ? "modal-title" : undefined}{...rest}>
        <div className={cx(styles.modalContainer)} ref={modalRef}>
          <div className={cx(styles.modalHeader, { [styles.modalHeaderWithTitle]: title })}>
            {title &&
              <div id="modal-title">{title}</div>
            }
            {showCloseButton &&
              <button
                ref={closeButtonRef}
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
