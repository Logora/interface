import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalComponent, setModalComponent] = useState(null);

    const showModal = (modal) => {
        setModalComponent(modal);
    }

    const hideModal = () => {
        setModalComponent(null);
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
