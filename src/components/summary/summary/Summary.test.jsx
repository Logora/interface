import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
            json: () => Promise.resolve({ data: ['mocked summary data'] }),
        })
    );
});


describe('Summary Component', () => {
    const mockTags = [
        { id: 'tag1', name: 'Tag 1' },
        { id: 'tag2', name: 'Tag 2' },
    ];

    const mockSummaryId = 'summary123';

    it('renders without crashing with positions', async () => {
        render(
            <ResponsiveProvider>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <Summary
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

        await waitFor(() => {
            const summaries = screen.getAllByText((content) => content.includes('mocked summary data'));
            expect(summaries.length).toBe(mockTags.length);
        });
    });

    it('renders without crashing without positions', async () => {
        render(
            <ResponsiveProvider>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <Summary
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

        await waitFor(() => expect(screen.getByText('mocked summary data')).toBeInTheDocument());
    });

    it('fetches data correctly', async () => {
        render(
            <ResponsiveProvider>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <Summary
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

        await waitFor(() => expect(fetch).toHaveBeenCalled());
    });
});
