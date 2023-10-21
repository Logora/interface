import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ListProvider } from './ListProvider';
import { useList } from './useList';

describe('ListProvider', () => {
    it('should render children', () => {
        const component = render(
            <ListProvider>
                <div>OK</div>
            </ListProvider>
        );

        expect(screen.getByText("OK")).toBeTruthy();
    });

    it('should set correct addElements', async () => {
        const myElements = ["myElement", "mySecondElement"];

        const AddElementComponent = () => {
            const list = useList();

            const handleClick = () => {
                list.add("myList", myElements);
            }

            return (
                <button onClick={handleClick}>Add elements</button>
            );
        }

        const List = () => {
            const { addElements } = useList();
            
            return (
                <div>{ addElements["myList"] }</div>
            );
        }

        const component = render(
            <ListProvider>
                <AddElementComponent />
                <List />
            </ListProvider>
        );

        expect(screen.queryByText("myElement")).toBeNull();
        expect(screen.queryByText("mySecondElement")).toBeNull();
        const button = screen.getByText("Add elements");
        await fireEvent.click(button);
        expect(screen.getByText(/myElement/i)).toBeTruthy();
        expect(screen.getByText(/mySecondElement/i)).toBeTruthy();
    });


    it('should set correct removeElement', async () => {
        const myElements = ["myElement", "mySecondElement"];

        const RemoveElementComponent = () => {
            const list = useList();

            const handleRemove = () => {
                list.remove("myRemoveList", myElements);
            }

            return (
                <>
                    <button onClick={handleRemove}>Remove elements</button>
                </>
            );
        }

        const List = () => {
            const { removeElements } = useList();
            
            return (
                <div>{ removeElements["myRemoveList"] }</div>
            );
        }

        const component = render(
            <ListProvider>
                <RemoveElementComponent />
                <List />
            </ListProvider>
        );

        expect(screen.queryByText("myElement")).toBeNull();
        expect(screen.queryByText("mySecondElement")).toBeNull();

        const removeButton = screen.getByText("Remove elements");
        await fireEvent.click(removeButton);
        expect(screen.queryByText(/myElement/i)).toBeTruthy();
        expect(screen.queryByText(/mySecondElement/i)).toBeTruthy();
    });

    it('should set correct updateElement', async () => {
        const myElements = ["myElement", "mySecondElement"];

        const UpdateElementComponent = () => {
            const list = useList();

            const handleUpdate = () => {
                list.update("myUpdateList", myElements);
            }

            return (
                <>
                    <button onClick={handleUpdate}>Update elements</button>
                </>
            );
        }

        const List = () => {
            const { updateElements } = useList();
            
            return (
                <div>{ updateElements["myUpdateList"] }</div>
            );
        }

        const component = render(
            <ListProvider>
                <UpdateElementComponent />
                <List />
            </ListProvider>
        );

        expect(screen.queryByText("myElement")).toBeNull();
        expect(screen.queryByText("mySecondElement")).toBeNull();

        const updateButton = screen.getByText("Update elements");
        await fireEvent.click(updateButton);
        expect(screen.queryByText(/myElement/i)).toBeTruthy();
        expect(screen.queryByText(/mySecondElement/i)).toBeTruthy();
    });
});