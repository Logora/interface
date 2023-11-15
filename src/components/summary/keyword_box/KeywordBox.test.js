import React from "react";
import { KeywordBox } from './KeywordBox';
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

const callback = jest.fn();

describe('KeywordBox', () => {
    it ('renders KeywordBox component correctly', () => {
        const { getByText } = render(
            <IntlProvider locale="en">
                <KeywordBox
                    keyword={"Keyword"} 
                    occurrences={875} 
                    color={"#FBC62F"}
                    handleClick={callback}
                />
            </IntlProvider>
        );

        expect(getByText(/Keyword/i)).toBeInTheDocument();
        expect(getByText(/875/i)).toBeInTheDocument();
    })

    it ('fires callback when clicking on button', async() => {
        const { getByText } = render(
            <IntlProvider locale="en">
                <KeywordBox
                    keyword={"Keyword"} 
                    occurrences={875} 
                    color={"#FBC62F"}
                    handleClick={callback}
                />
            </IntlProvider>
        );

        const btn = getByText(/View contributions/i);

        expect(btn).toBeTruthy();
        expect(getByText(/Keyword/i)).toBeInTheDocument();
        expect(getByText(/875/i)).toBeInTheDocument();

        await userEvent.click(btn);
        expect(callback).toHaveBeenCalled();
    })
});