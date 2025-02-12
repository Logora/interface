import React from 'react';
import { Summary } from './Summary';
import { faker } from '@faker-js/faker';
import { IntlProvider } from 'react-intl';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import * as regularIcons from '@logora/debate.icons.regular_icons';

const mockDebate = {
    id: faker.datatype.uuid(),  
    group_context: {
        positions: Array.from({ length: 3 }, (_, index) => ({
            id: faker.datatype.uuid(),  
            name: faker.lorem.word()    
        }))
    }
};

export const DefaultSummary = () => {
    const contentId = mockDebate.id; 
    const positions = mockDebate.group_context.positions;  

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
