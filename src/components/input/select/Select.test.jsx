import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const options = [
    {
        dataTid:"action_sort_arguments_newest",
        name:"Option 1",
        value:"trending",
        text: "Option 1"
    },
    {
        dataTid:"action_sort_arguments_relevant",
        name:"Option 2",
        value:"-created_at",
        text: "Option 2"
    },
    {
        dataTid:"action_sort_arguments_oldest",
        name:"Option 3",
        value:"+created_at",
        text: "Option 3"
    }
]

describe('Select', () => {
    it('should render a dropdown with first option text', () => {
        const dropdown = render(
            <Select options={options} /> 
        );
        const renderedFirstOption = dropdown.getByText(/Option 1/i);
        expect(renderedFirstOption).toBeTruthy();
        expect(dropdown.queryByText(/Option 2/i)).toBeNull();
        expect(dropdown.queryByText(/Option 3/i)).toBeNull();
    });

    it('should display all options when clicking on title', async () => {
        const dropdown = render(
            <Select options={options} /> 
        );
        const dropdownFirstOption = dropdown.getByText(/Option 1/i);
        expect(dropdown.queryByText(/Option 2/i)).toBeNull();
        expect(dropdown.queryByText(/Option 3/i)).toBeNull();

        await userEvent.click(dropdownFirstOption);
        expect(dropdown.getByText(/Option 2/i)).toBeTruthy();
        expect(dropdown.getByText(/Option 3/i)).toBeTruthy();
    });

    it('should not display options on click if disabled', async () => {
        const dropdown = render(
            <Select disabled options={options} /> 
        );
        const dropdownFirstOption = dropdown.getByText(/Option 1/i);
        expect(dropdown.queryByText(/Option 2/i)).toBeNull();
        expect(dropdown.queryByText(/Option 3/i)).toBeNull();
        
        await userEvent.click(dropdownFirstOption);
        expect(dropdown.queryByText(/Option 2/i)).toBeNull();
        expect(dropdown.queryByText(/Option 3/i)).toBeNull();
    });

    it('should close on option click', async () => {
        const dropdown = render(
            <Select options={options} /> 
        );

        await userEvent.click(dropdown.getByText(/Option 1/i));
        
        expect(dropdown.getByText(/Option 2/i)).toBeTruthy();
        expect(dropdown.getByText(/Option 3/i)).toBeTruthy();

        await userEvent.click(dropdown.getByText(/Option 2/i));

        expect(dropdown.queryByText(/Option 1/i)).toBeNull();
        expect(dropdown.queryByText(/Option 3/i)).toBeNull();
    });

    it('should close on click outside', async () => {
        const dropdown = render(
            <Select options={options} /> 
        );

        await userEvent.click(dropdown.getByText(/Option 1/i));
        
        expect(dropdown.getByText(/Option 2/i)).toBeTruthy();
        expect(dropdown.getByText(/Option 3/i)).toBeTruthy();

        await userEvent.click(document.body);

        expect(dropdown.queryByText(/Option 2/i)).toBeNull();
        expect(dropdown.queryByText(/Option 3/i)).toBeNull();
    });

    it('should call onChange when clicking on option', async () => {
        const callback = jest.fn();

        const dropdown = render(
            <Select onChange={callback} options={options} /> 
        );

        await userEvent.click(dropdown.getByText(/Option 1/i));
        await userEvent.click(dropdown.getByText(/Option 2/i));

        expect(callback).toHaveBeenCalledTimes(1);
        expect(dropdown.queryByText(/Option 1/i)).toBeNull();
        expect(dropdown.queryByText(/Option 3/i)).toBeNull();
    });

    it('should display default option', () => {
        const { getByText, queryByText } = render(
            <Select options={options} defaultOption={"Option 2"} /> 
        );
        
        expect(getByText(/Option 2/i)).toBeTruthy();
        expect(queryByText(/Option 1/i)).toBeNull();
        expect(queryByText(/Option 3/i)).toBeNull();
    });
});