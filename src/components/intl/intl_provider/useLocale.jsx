import { useContext } from "react";
import { IntlContext } from "./IntlContext";

export const useLocale = () => {
    const { locale, setLocale } = useContext(IntlContext);

    return { locale, setLocale };
}