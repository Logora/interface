import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShareButton } from './ShareButton';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

describe('ShareButton', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });
    
    it('should render button with share text', () => {
        const { getByText, queryAllByRole } = render(
            <IntlProvider locale="en">
                <ConfigProvider config={{theme:{}}}>
                    <IconProvider library={regularIcons}>
                        <ShareButton 
                            showText
                            shareUrl="https://example.com/share-link"
                            shareTitle="Here is an interesting link"
                            shareText="Hello, I stumbled upon this interesting article about asteroids. You should check it out !"
                        />
                    </IconProvider>
                </ConfigProvider>
            </IntlProvider>
        );
        expect(getByText("Share")).toBeTruthy();
        expect(queryAllByRole("button")).toHaveLength(1);
    });

    it('should not show text if props false', () => {
        const { queryByText, queryAllByRole } = render(
            <IntlProvider locale="en">
                <ConfigProvider config={{theme:{}}}>
                    <IconProvider library={regularIcons}>
                        <ShareButton 
                            shareUrl="https://example.com/share-link"
                            shareTitle="Here is an interesting link"
                            shareText="Hello, I stumbled upon this interesting article about asteroids. You should check it out !"
                        />
                    </IconProvider>
                </ConfigProvider>
            </IntlProvider>
        );
        expect(queryByText("Share")).toBeNull();
        expect(queryAllByRole("button")).toHaveLength(1);
    });

    it('should show share box when clicking on button', async () => {
        const { getByText, queryAllByRole } = render(
            <IntlProvider locale="en">
                <ConfigProvider config={{theme:{}}}>
                    <IconProvider library={regularIcons}>
                        <ShareButton 
                            showText
                            shareUrl="https://example.com/share-link"
                            shareTitle="Here is an interesting link"
                            shareText="Hello, I stumbled upon this interesting article about asteroids. You should check it out !"
                        />
                    </IconProvider>
                </ConfigProvider>
            </IntlProvider>
        );
        expect(getByText("Share")).toBeTruthy();

        userEvent.click(getByText("Share"));

        await waitFor(() => {
            expect(queryAllByRole("button")).toHaveLength(5);
        });
    });

    it('should close box when click outside', async () => {
        const { getByText, queryAllByRole } = render(
            <IntlProvider locale="en">
                <ConfigProvider config={{theme:{}}}>
                    <IconProvider library={regularIcons}>
                        <ShareButton 
                            showText
                            shareUrl="https://example.com/share-link"
                            shareTitle="Here is an interesting link"
                            shareText="Hello, I stumbled upon this interesting article about asteroids. You should check it out !"
                        />
                    </IconProvider>
                </ConfigProvider>
            </IntlProvider>
        );
        expect(getByText("Share")).toBeTruthy();

        userEvent.click(getByText("Share"));

        await waitFor(() => {
            expect(queryAllByRole("button")).toHaveLength(5);
        });

        userEvent.click(document.body);

        await waitFor(() => {
            expect(queryAllByRole("button")).toHaveLength(1);
        });
    });
});