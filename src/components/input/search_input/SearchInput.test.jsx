import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './SearchInput';

const callback = jest.fn();

describe('SearchInput', () => {
    it('should render an input search', () => {
        const searchInput = render(
            <SearchInput onSearchSubmit={callback} placeholder="Search" />
        );

        expect(screen.getByText("Search")).toBeTruthy();
    });

    it('should call callback function on submit', async () => {
        const placeholder = "Search for answers";
        const searchInput = render(
            <SearchInput onSearchSubmit={callback} placeholder={placeholder} />
        );

        const input = screen.getByRole("input");

        await userEvent.click(input);
        await userEvent.keyboard("My query");
        await userEvent.keyboard("[Enter]");

        expect(input.tagName).toBe("INPUT");
        expect(screen.getByText(placeholder)).toBeTruthy();
        expect(callback).toHaveBeenCalled();
        expect(input.value).toBe("My query");
    });

    it('should call callback function and reset query on reset', async () => {
        const placeholder = "Search for answers";
        const searchInput = render(
            <SearchInput onSearchSubmit={callback} placeholder={placeholder} />
        );

        const input = screen.getByRole("input");

        await userEvent.click(input);
        await userEvent.keyboard("My query");

        const submitButton = screen.getByRole("submit");
        await userEvent.click(submitButton);

        expect(input.tagName).toBe("INPUT");
        expect(screen.getByText(placeholder)).toBeTruthy();
        expect(callback).toHaveBeenCalled();
        expect(input.value).toBe("");
    });
});