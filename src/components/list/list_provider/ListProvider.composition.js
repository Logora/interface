import React, { useState, useEffect } from 'react';
import { ListProvider } from './ListProvider';
import { useList } from './useList';

const List = () => {
    const [elements, setElements] = useState(["first element"]);
    const uniqueListId = "myList";
    const { addElements, addPinnedElements, removeElements } = useList();

    useEffect(() => {
        if (uniqueListId in addElements) {
            setElements(prevState => [...prevState, addElements[uniqueListId]]);
        }
    }, [addElements]);

    useEffect(() => {
        if (uniqueListId in addPinnedElements) {
            setElements(prevState => [addPinnedElements[uniqueListId], ...prevState]);
        }
    }, [addPinnedElements]);

    useEffect(() => {
        if (uniqueListId in removeElements) {
            setElements((prevState) =>
                prevState.filter((prevItem) => removeElements[uniqueListId].indexOf(prevItem))
            );
        }
    }, [removeElements])

    return (
        <div>
            <div className="listTitle">List</div>
            <div>
                {elements.map((el, index) => (
                    <div key={index} className="listElement">{ el }</div>
                ))}
            </div>
        </div>

    );
}

const ListManager = () => {
    const { add, addPinned, remove } = useList();
    const [counter, setCounter] = useState(0);

    const handleAdd = () => {
        setCounter(counter + 1);
        add("myList", `hello-${counter + 1}`);
    }

    const handleAddPinned = () => {
        setCounter(counter + 1);
        addPinned("myList", `hello-${counter + 1}`);
    }

    const handleRemove = () => {
        if(counter > 0) {
            remove("myList", `hello-${counter}`);
            setCounter(counter - 1);
        }
    }

    return (
        <>
            <button onClick={handleAddPinned}>Add pinned element</button>
            <button onClick={handleAdd}>Add element</button>
            <button onClick={handleRemove}>Remove element</button>
        </>
    );
}

export const DefaultListProvider = () => {
    return (
        <ListProvider>
            <ListManager />
            <List />
        </ListProvider>
    )
}
