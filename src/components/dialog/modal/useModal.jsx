import { useContext } from "react";
import { ModalContext } from "./ModalProvider";

export const useModal = () => {
    return useContext(ModalContext);
}