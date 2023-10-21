import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputProvider } from './InputProvider';
import { useInput } from './useInput';

describe('InputProvider', () => {
    it('should render children', () => {
        const component = render(
            <InputProvider>
                <div>OK</div>
            </InputProvider>
        );
    
        expect(screen.getByText("OK")).toBeTruthy();
    });
    
    it('should set content', async () => {
        const ContentComponent = () => {
            const { inputContent, setInputContent } = useInput();
    
            const handleClick = () => {
                setInputContent("My text");
            }
        
            return (
                <div>
                    <button onClick={handleClick}>Add content</button>
                    <span>{inputContent}</span>
                </div>
            );
        }
    
        const component = render(
            <InputProvider>
                <ContentComponent />
            </InputProvider>
        );
    
        expect(screen.queryByText("My text")).toBeNull();
        const button = screen.getByText("Add content");
        await fireEvent.click(button);
        expect(screen.getByText("My text")).toBeTruthy();
    });
    
    it('should set focus', async () => {
        const FocusComponent = () => {
            const { focus, setFocus } = useInput();
    
            const handleClick = () => {
                setFocus(true);
            }
    
            return (
                <div>
                    <button onClick={handleClick}>Add focus</button>
                    <span>{focus.toString()}</span>
                </div>
            );
        }
    
        const component = render(
            <InputProvider>
                <FocusComponent />
            </InputProvider>
        );
    
        expect(screen.queryByText("true")).toBeNull();
        expect(screen.queryByText("false")).toBeTruthy();
        const button = screen.getByText("Add focus");
        await fireEvent.click(button);
        expect(screen.getByText("true")).toBeTruthy();
    });
    
    it('should set reset', async () => {
        const ResetComponent = () => {
            const { reset, setReset } = useInput();
    
            const handleClick = () => {
                setReset(true);
            }
    
            return (
                <div>
                    <button onClick={handleClick}>Add reset</button>
                    <span>{reset.toString()}</span>
                </div>
            );
        }
    
        const component = render(
            <InputProvider>
                <ResetComponent />
            </InputProvider>
        );
    
        expect(screen.queryByText("true")).toBeNull();
        expect(screen.queryByText("false")).toBeTruthy();
        const button = screen.getByText("Add reset");
        await fireEvent.click(button);
        expect(screen.getByText("true")).toBeTruthy();
    });
});
