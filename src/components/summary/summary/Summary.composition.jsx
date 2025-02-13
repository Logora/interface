import React from 'react';
import { Summary } from './Summary';
import { faker } from '@faker-js/faker';
import { IntlProvider } from 'react-intl';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import * as regularIcons from '@logora/debate.icons.regular_icons';

const summaryWithPositions = {
    id: faker.datatype.uuid(),
    group_context: {
        positions: Array.from({ length: 3 }, (_, index) => ({
            id: faker.datatype.uuid(),
            name: faker.lorem.word()
        }))
    }
};

export const DefaultSummaryWithPositions = () => {
    const contentId = summaryWithPositions.id;
    const positions = summaryWithPositions.group_context.positions;

    return (
        <ResponsiveProvider>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <Summary contentId={contentId} positions={positions} />
                </IntlProvider>
            </IconProvider>
        </ResponsiveProvider>
    );
};

const summaryWithoutPositions = {
    id: faker.datatype.uuid(),
    group_context: {
        positions: []  
    }
};

export const DefaultSummaryWithoutPositions = () => {
    const contentId = summaryWithoutPositions.id;
    const positions = summaryWithoutPositions.group_context.positions;

    return (
        <ResponsiveProvider>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <Summary contentId={contentId} positions={positions} />
                </IntlProvider>
            </IconProvider>
        </ResponsiveProvider>
    );
};
