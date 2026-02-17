import React, { createContext, useState, useRef } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalComponent, setModalComponent] = useState(null);
    const triggeringElementRef = useRef(null);

    const showModal = (modal) => {
        // Store the currently focused element before opening the modal
        triggeringElementRef.current = document.activeElement;
        setModalComponent(modal);
    }

    const hideModal = () => {
        setModalComponent(null);
        // Restore focus to the triggering element after closing
        if (triggeringElementRef.current && typeof triggeringElementRef.current.focus === 'function') {
            triggeringElementRef.current.focus();
        }
    }

    const isModalPresent = modalComponent !== null;

    return (
        <ModalContext.Provider value={{ showModal, hideModal, isModalPresent }}>
            {children}
            { modalComponent ?
                <>{ modalComponent }</>
            : null }
        </ModalContext.Provider>
    );
}
