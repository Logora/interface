import { useContext } from "react";
import { ListContext } from "./ListProvider";

export const useList = () => {
    const { add, addFirst, update, remove, addElements, addFirstElements, updateElements, removeElements, setAddElements, setAddFirstElements, setUpdateElements, setRemoveElements } = useContext(ListContext);

    return { add, addFirst, update, remove, addElements, addFirstElements, updateElements, removeElements, setAddElements, setAddFirstElements, setUpdateElements, setRemoveElements };
}