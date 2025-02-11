import React from 'react';
import { Summary } from './Summary';
import { faker } from '@faker-js/faker';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from '@logora/debate.data.config_provider';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import * as regularIcons from '@logora/debate.icons.regular_icons';

const mockDebate = {
    id: 1,
    group_context: {
        positions: [
            { id: 1, name: "Position 1" },
            { id: 2, name: "Position 2" }
        ]
    }
};

export const DefaultSummary = () => {
    const contentId = mockDebate.id;
    const positions = mockDebate.group_context.positions;

    return (
        <ConfigProvider>
            <ResponsiveProvider>
                <IconProvider library={regularIcons}>
                    <IntlProvider locale="en">
                        <Summary contentId={contentId} positions={positions} />
                    </IntlProvider>
                </IconProvider>
            </ResponsiveProvider>
        </ConfigProvider>
    );
};
