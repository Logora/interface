import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './SearchInput';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

const callback = jest.fn();

describe('SearchInput', () => {
    it('should render an input search', () => {
        const searchInput = render(
            <IconProvider library={regularIcons}>
                <SearchInput onSearchSubmit={callback} placeholder="Search" />
            </IconProvider>
        );

        expect(screen.getByText("Search")).toBeTruthy();
    });

    it('should call callback function on submit', async () => {
        const placeholder = "Search for answers";
        const searchInput = render(
            <IconProvider library={regularIcons}>
                <SearchInput onSearchSubmit={callback} placeholder={placeholder} />
            </IconProvider>
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
            <IconProvider library={regularIcons}>
                <SearchInput onSearchSubmit={callback} placeholder={placeholder} />
            </IconProvider>
        );

        const input = screen.getByRole("input");

        await userEvent.click(input);
        await userEvent.keyboard("My query");

        const submitButton = screen.getByRole("reset");
        await userEvent.click(submitButton);

        expect(input.tagName).toBe("INPUT");
        expect(screen.getByText(placeholder)).toBeTruthy();
        expect(callback).toHaveBeenCalled();
        expect(input.value).toBe("");
    });

    it('should call function when the search icon is clicked', async () => {
        const placeholder = "Search for answers";
        const searchInput = render(
            <IconProvider library={regularIcons}>
                <SearchInput onSearchSubmit={callback} placeholder={placeholder} />
            </IconProvider>
        );

        const input = screen.getByRole("input");

        await userEvent.click(input);
        await userEvent.keyboard("My query");

        const submitButton = screen.getByRole("submit");
        await userEvent.click(submitButton);

        expect(input.tagName).toBe("INPUT");
        expect(screen.getByText(placeholder)).toBeTruthy();
        expect(callback).toHaveBeenCalled();
        expect(input.value).toBe("My query");
    });
});