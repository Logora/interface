import { useContext } from "react";
import { InputContext } from "./InputProvider";

export const useInput = () => {
    const inputContext = useContext(InputContext);

    return inputContext;
}