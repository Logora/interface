import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server'
import { useIntl } from 'react-intl';
import { IntlProvider } from './IntlProvider';
import { locales, localesAsync } from './locales';

const IntlComponent = () => {
    const intl = useIntl();

    return (
        <div>
            <h1>{intl.formatMessage({ id: "title", defaultMessage: "Default title" })}</h1>
            <h2>{intl.formatMessage({ id: "header.subtitle", defaultMessage: "Default subtitle" })}</h2>
        </div>
    )
}

describe('IntlProvider', () => {
    beforeEach(() => {
        window.sessionStorage.clear();
    });

    describe('sync mode', () => {
        it('should render children with correct language', () => {
            render(
                <IntlProvider locales={locales} language={"fr"} async={false} onError={() => {}}>
                    <IntlComponent />
                </IntlProvider>
            )

            expect(screen.getByText("Mon titre")).toBeTruthy();
            expect(screen.getByText("Sous-titre")).toBeTruthy();
        });

        it('should render children with another language', () => {
            render(
                <IntlProvider locales={locales} language={"en"} async={false} onError={() => {}}>
                    <IntlComponent />
                </IntlProvider>
            )

            expect(screen.getByText("My title")).toBeTruthy();
            expect(screen.getByText("Subtitle")).toBeTruthy();
        });

        it('should render children with default if language is unknown', () => {
            render(
                <IntlProvider locales={locales} language={"pt"} async={false} onError={() => {}}>
                    <IntlComponent />
                </IntlProvider>
            )

            expect(screen.getByText("Default title")).toBeTruthy();
            expect(screen.getByText("Default subtitle")).toBeTruthy();
        });

        it('should render with custom messages', () => {
            const customMessages = {
                "header.subtitle": "Mon autre sous-titre..."
            }

            render(
                <IntlProvider locales={locales} language={"fr"} customMessages={customMessages} async={false} onError={() => {}}>
                    <IntlComponent />
                </IntlProvider>
            )

            expect(screen.getByText("Mon titre")).toBeTruthy();
            expect(screen.getByText("Mon autre sous-titre...")).toBeTruthy();
        });

        it('should render with correct locales when rendering server side', () => {
            const html = renderToStaticMarkup(
                <IntlProvider locales={locales} language={"fr"} async={false} onError={() => {}}>
                    <IntlComponent />
                </IntlProvider>
            )

            expect(html).toContain("Mon titre");
            expect(html).toContain("Sous-titre")
        });
    });

    describe('async mode', () => {
        it('should render children with correct language', async () => {
            await act(async () => {
                render(
                    <IntlProvider locales={localesAsync} language={"fr"} async onError={() => {}}>
                        <IntlComponent />
                    </IntlProvider>
                )
            });

            await waitFor(() => {
                expect(screen.getByText("Mon titre")).toBeTruthy();
                expect(screen.getByText("Sous-titre")).toBeTruthy();
            });
        });

        it('should render children with another language', async () => {
            await act(async () => {
                render(
                    <IntlProvider locales={localesAsync} language={"en"} async onError={() => {}}>
                        <IntlComponent />
                    </IntlProvider>
                )
            });

            await waitFor(() => {
                expect(screen.getByText("My title")).toBeTruthy();
                expect(screen.getByText("Subtitle")).toBeTruthy();
            });
        });

        it('should render with custom messages', async () => {
            const customMessages = {
                "header.subtitle": "Mon autre sous-titre..."
            }

            await act(async () => {
                render(
                    <IntlProvider locales={localesAsync} language={"fr"} customMessages={customMessages} async onError={() => {}}>
                        <IntlComponent />
                    </IntlProvider>
                )
            });

            await waitFor(() => {
                expect(screen.getByText("Mon titre")).toBeTruthy();
                expect(screen.getByText("Mon autre sous-titre...")).toBeTruthy();
            });
        });

        it('should render with default locales when rendering server side', () => {
            const { window } = global;
            delete global.window;
            const html = renderToStaticMarkup(
                <IntlProvider locales={localesAsync} language={"fr"} async onError={() => {}}>
                    <IntlComponent />
                </IntlProvider>
            )

            expect(html).toContain("Default title");
            expect(html).toContain("Default subtitle")
            global.window = window;
        });
    });
});