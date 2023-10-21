import { useContext } from "react";
import { ListContext } from "./ListProvider";

export const useList = () => {
    const { add, update, remove, addElements, updateElements, removeElements, setAddElements, setUpdateElements, setRemoveElements } = useContext(ListContext);

    return { add, update, remove, addElements, updateElements, removeElements, setAddElements, setUpdateElements, setRemoveElements };
}