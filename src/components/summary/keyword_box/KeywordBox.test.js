import React from "react";
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { KeywordBox } from './KeywordBox';

const callback = jest.fn();

describe('KeywordBox', () => {
    it ('renders KeywordBox component correctly', () => {
        render(
            <IntlProvider locale="en">
                <KeywordBox
                    keyword={"Keyword"} 
                    occurrences={875} 
                    color={"#FBC62F"}
                    handleClick={callback}
                />
            </IntlProvider>
        );

        expect(screen.getByText(/Keyword/i)).toBeInTheDocument();
        expect(screen.getByText(/875/i)).toBeInTheDocument();
    })

    it ('fires callback when clicking on button', async() => {
        render(
            <IntlProvider locale="en">
                <KeywordBox
                    keyword={"Keyword"} 
                    occurrences={875} 
                    color={"#FBC62F"}
                    handleClick={callback}
                />
            </IntlProvider>
        );

        const btn = screen.getByText(/View contributions/i);

        expect(btn).toBeTruthy();
        expect(screen.getByText(/Keyword/i)).toBeInTheDocument();
        expect(screen.getByText(/875/i)).toBeInTheDocument();

        await userEvent.click(btn);
        expect(callback).toHaveBeenCalled();
    })
});