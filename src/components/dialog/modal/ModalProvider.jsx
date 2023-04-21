import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = (props) => {
    const [modalComponent, setModalComponent] = useState(null);

    const showModal = (modal) => {
        setModalComponent(modal);
    }

    const hideModal = () => {
        setModalComponent(null);
    }

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {props.children}
            { modalComponent ?
                <>{ modalComponent }</>
            : null }
        </ModalContext.Provider>
    );
}

export const withModal = Component => props => (
    <ModalContext.Consumer>
        {context => <Component {...props} {...context} />}
    </ModalContext.Consumer>
)