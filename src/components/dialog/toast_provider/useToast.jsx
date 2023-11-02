import { useContext } from "react";
import { ToastContext } from "./ToastContext";

export const useToast = () => {
    const { toast, toasts } = useContext(ToastContext);

    return { toast, toasts };
}