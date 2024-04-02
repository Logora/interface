import React, { createContext, useState } from "react";

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
    const [addElements, setAddElements] = useState({});
    const [addPinnedElements, setAddPinnedElements] = useState({});
    const [updateElements, setUpdateElements] = useState({});
    const [removeElements, setRemoveElements] = useState({});

    const add = (listId, elements) => {
        setAddElements(addElements => ({...addElements, [listId]: elements}));
    }

    const addPinned = (listId, element) => {
        setAddPinnedElements(addPinnedElements => ({...addPinnedElements, [listId]: element}));
    }

    const update = (listId, elements) => {
        setUpdateElements(updateElements => ({...updateElements, [listId]: elements}));
    }

    const remove = (listId, elements) => {
        setRemoveElements(removeElements => ({...removeElements, [listId]: elements}));
    }

    return (
        <ListContext.Provider value={{
            add,
            addPinned,
            update,
            remove,
            addElements,
            addPinnedElements,
            updateElements,
            removeElements,
            setAddElements,
            setAddPinnedElements,
            setUpdateElements,
            setRemoveElements
        }}>
            { children }
        </ListContext.Provider>
    );
}
