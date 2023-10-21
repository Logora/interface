import React, { createContext, useState } from "react";

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
    const [addElements, setAddElements] = useState({});
    const [updateElements, setUpdateElements] = useState({});
    const [removeElements, setRemoveElements] = useState({});

    const add = (listId, elements) => {
        setAddElements(addElements => ({...addElements, [listId]: elements}));
    }

    const update = (listId, elements) => {
        setUpdateElements(updateElements => ({...updateElements, [listId]: elements}));
    }

    const remove = (listId, elements) => { 
        setRemoveElements(removeElements => ({...removeElements, [listId]: elements}));
    }

    return (
        <ListContext.Provider value={{ add, update, remove, addElements, updateElements, removeElements, setAddElements, setUpdateElements, setRemoveElements }}>
            { children }
        </ListContext.Provider>
    );
}