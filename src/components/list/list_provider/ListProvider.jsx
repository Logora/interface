import React, { createContext, useState } from "react";

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
    const [addElements, setAddElements] = useState({});
    const [addFirstElements, setAddFirstElements] = useState({});
    const [updateElements, setUpdateElements] = useState({});
    const [removeElements, setRemoveElements] = useState({});

    const add = (listId, elements) => {
        setAddElements(addElements => ({...addElements, [listId]: elements}));
    }

    const addFirst = (listId, element) => {
        setAddFirstElements(addFirstElements => ({...addFirstElements, [listId]: element}));
    }

    const update = (listId, elements) => {
        setUpdateElements(updateElements => ({...updateElements, [listId]: elements}));
    }

    const remove = (listId, elements) => { 
        setRemoveElements(removeElements => ({...removeElements, [listId]: elements}));
    }

    return (
        <ListContext.Provider value={{ add, addFirst, update, remove, addElements, addFirstElements, updateElements, removeElements, setAddElements, setAddFirstElements, setUpdateElements, setRemoveElements }}>
            { children }
        </ListContext.Provider>
    );
}