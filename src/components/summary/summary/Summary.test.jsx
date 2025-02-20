import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Summary } from './Summary';
import { IntlProvider } from 'react-intl';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import * as regularIcons from '@logora/debate.icons.regular_icons';
import styles from './Summary.module.scss';

beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                data: {
                    content: {
                        arguments: [
                            { argument: "Mocked argument 1", id: 0, weight: 5 },
                            { argument: "Mocked argument 2", id: 1, weight: 3 }
                        ]
                    }
                }
            }),
        })
    );
});

const apiUrl = "https://example.com"

describe('Summary Component', () => {
    const mockTags = [
        { id: 'tag1', name: 'Tag 1' },
        { id: 'tag2', name: 'Tag 2' },
    ];

    const mockSummaryId = 'summary123';

    it('renders without crashing with tags', async () => {
        render(
            <ResponsiveProvider>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <Summary
                            apiUrl={apiUrl}
                            summaryId={mockSummaryId}
                            tags={mockTags}
                            tagClassNames={styles.tag}
                            title="Summary"
                            subtitle="This is a summary"
                        />
                    </IntlProvider>
                </IconProvider>
            </ResponsiveProvider>
        );

        expect(screen.getByText('Summary')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Summary'));

        await waitFor(() => {
            const summaries = screen.getAllByText((content) => content.includes('Mocked argument'));
            expect(summaries.length).toBeGreaterThan(0);
        });
    });

    it('renders without crashing without tags', async () => {
        render(
            <ResponsiveProvider>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <Summary
                            apiUrl={apiUrl}
                            summaryId={mockSummaryId}
                            tags={[]}
                            title="Summary"
                            subtitle="This is a summary"
                        />
                    </IntlProvider>
                </IconProvider>
            </ResponsiveProvider>
        );

        expect(screen.getByText('Summary')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Summary'));

        await waitFor(() => {
            const summaryItems = screen.getAllByText((content) => content.includes('Mocked argument'));
            expect(summaryItems.length).toBeGreaterThan(0);
        });

    });

    it('fetches data correctly', async () => {
        render(
            <ResponsiveProvider>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <Summary
                            apiUrl={apiUrl}
                            summaryId={mockSummaryId}
                            tags={mockTags}
                            tagClassNames={styles.tag}
                            title="Summary"
                            subtitle="This is a summary"
                        />
                    </IntlProvider>
                </IconProvider>
            </ResponsiveProvider>
        );

        fireEvent.click(screen.getByText('Summary'));

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    });
});
