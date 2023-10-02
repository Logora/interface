import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

describe('Select', () => {
    it('should render a dropdown with first option text', () => {
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
        const dropdown = render(
            <Select options={options} /> 
        );
        const renderedFirstOption = dropdown.getByText(/Option 1/i);
        expect(renderedFirstOption).toBeTruthy();
        expect(dropdown.queryByText(/Option 2/i)).toBeNull();
        expect(dropdown.queryByText(/Option 3/i)).toBeNull();
    });

    it('should display all options when clicking on title', async () => {
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
        const dropdown = render(
            <Select options={options} /> 
        );
        const dropdownFirstOption = dropdown.getByText(/Option 1/i);
        expect(dropdown.queryByText(/Option 2/i)).toBeNull();
        expect(dropdown.queryByText(/Option 3/i)).toBeNull();

        userEvent.click(dropdownFirstOption);
        
        await waitFor(() => {
            expect(dropdown.getByText(/Option 2/i)).toBeTruthy();
            expect(dropdown.getByText(/Option 3/i)).toBeTruthy();
        });
    });

    it('should close on option click', async () => {
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
        const dropdown = render(
            <Select options={options} /> 
        );

        userEvent.click(dropdown.getByText(/Option 1/i));
        
        await waitFor(() => {
            expect(dropdown.getByText(/Option 2/i)).toBeTruthy();
            expect(dropdown.getByText(/Option 3/i)).toBeTruthy();
        });

        await waitFor(() => {
            userEvent.click(dropdown.getByText(/Option 2/i));
        });

        await waitFor(() => {
            expect(dropdown.queryByText(/Option 1/i)).toBeNull();
            expect(dropdown.queryByText(/Option 3/i)).toBeNull();
        });
    });

    it('should close on click outside', async () => {
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
        const dropdown = render(
            <Select options={options} /> 
        );

        userEvent.click(dropdown.getByText(/Option 1/i));
        
        await waitFor(() => {
            expect(dropdown.getByText(/Option 2/i)).toBeTruthy();
            expect(dropdown.getByText(/Option 3/i)).toBeTruthy();
        });

        userEvent.click(document.body);

        await waitFor(() => {
            expect(dropdown.queryByText(/Option 2/i)).toBeNull();
            expect(dropdown.queryByText(/Option 3/i)).toBeNull();
        });
    });


    it('should call onChange when clicking on option', async () => {
        const callback = jest.fn();

        const options = [
            {
                dataTid: "action_sort_arguments_newest",
                name: "Option 1",
                value: "trending",
                text: "Option 1"
            },
            {
                dataTid:"action_sort_arguments_relevant",
                name:"Option 2",
                value:"-created_at",
                text: "Option 2"
            },
            {
                dataTid: "action_sort_arguments_oldest",
                name: "Option 3",
                value: "+created_at",
                text: "Option 3"
            }
        ]
        const dropdown = render(
            <Select onChange={callback} options={options} /> 
        );

        userEvent.click(dropdown.getByText(/Option 1/i));

        await waitFor(() => {
            userEvent.click(dropdown.getByText(/Option 2/i));
        });

        await waitFor(() => {
            expect(callback).toHaveBeenCalledTimes(1);
            expect(dropdown.queryByText(/Option 1/i)).toBeNull();
            expect(dropdown.queryByText(/Option 3/i)).toBeNull();
        });
    });
});