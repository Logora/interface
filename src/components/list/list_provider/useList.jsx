import { useContext } from "react";
import { ListContext } from "./ListProvider";

export const useList = () => {
    const { add, addPinned, update, remove, addElements, addPinnedElements, updateElements, removeElements, setAddElements, setAddPinnedElements, setUpdateElements, setRemoveElements } = useContext(ListContext);

    return { add, addPinned, update, remove, addElements, addPinnedElements, updateElements, removeElements, setAddElements, setAddPinnedElements, setUpdateElements, setRemoveElements };
}