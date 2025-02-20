import React from 'react';
import { Summary } from './Summary';
import { faker } from '@faker-js/faker';
import { IntlProvider } from 'react-intl';
import { IconProvider } from '@logora/debate.icons.icon_provider';
import { ResponsiveProvider } from '@logora/debate.hooks.use_responsive';
import styles from './Summary.module.scss';
import * as regularIcons from '@logora/debate.icons.regular_icons';

global.fetch = async () => ({
    ok: true,
    json: () => Promise.resolve({
        data: {
            content: {
                arguments: [
                    { argument: faker.lorem.sentences(3), id: 0, weight: 5 },
                    { argument: faker.lorem.sentences(2), id: 1, weight: 3 },
                    { argument: faker.lorem.sentences(4), id: 1, weight: 3 }
                ]
            }
        }
    })
});


const summaryWithTags = {
    id: faker.datatype.uuid(),
    group_context: {
        tags: Array.from({ length: 3 }, (_, index) => ({
            id: faker.datatype.uuid(),
            name: faker.lorem.word()
        }))
    }
};

const apiUrl = "https://example.com"

export const SummaryWithTags = () => {
    const contentId = summaryWithTags.id;
    const tags = summaryWithTags.group_context.tags;

    return (
        <ResponsiveProvider>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <Summary
                        apiUrl={apiUrl}
                        summaryId={contentId}
                        tags={tags}
                        tagClassNames={styles.tag}
                        title={"Summary"}
                        subtitle={"this is a summary"}
                    />
                </IntlProvider>
            </IconProvider>
        </ResponsiveProvider>
    );
};

const summaryWithoutTags = {
    id: faker.datatype.uuid(),
    group_context: {
        tags: []
    }
};

export const SummaryWithoutTags = () => {
    const contentId = summaryWithoutTags.id;
    const tags = summaryWithoutTags.group_context.tags;

    return (
        <ResponsiveProvider>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <Summary
                        apiUrl={apiUrl}
                        summaryId={contentId}
                        tags={tags}
                        tagClassNames={styles.tag}
                        title={"Summary"}
                        subtitle={"this is a summary"}
                    />
                </IntlProvider>
            </IconProvider>
        </ResponsiveProvider>
    );
};
