import React, { useEffect, useState } from 'react';
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
        data: [
            faker.lorem.sentences(3),
            faker.lorem.sentences(2),
            faker.lorem.sentences(4),
        ]
    })
});

const summaryWithPositions = {
    id: faker.datatype.uuid(),
    group_context: {
        tags: Array.from({ length: 3 }, (_, index) => ({
            id: faker.datatype.uuid(),
            name: faker.lorem.word()
        }))
    }
};

export const SummaryWithPositions = () => {
    const contentId = summaryWithPositions.id;
    const tags = summaryWithPositions.group_context.tags;
    const [summaryData, setSummaryData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch();
            const data = await response.json();
            setSummaryData(data.data);
        };

        fetchData();
    }, []);

    return (
        <ResponsiveProvider>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <Summary
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

const summaryWithoutPositions = {
    id: faker.datatype.uuid(),
    group_context: {
        tags: []
    }
};

export const SummaryWithoutPositions = () => {
    const contentId = summaryWithoutPositions.id;
    const tags = summaryWithoutPositions.group_context.tags;
    const [summaryData, setSummaryData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch();
            const data = await response.json();
            setSummaryData(data.data);
        };

        fetchData();
    }, []);

    return (
        <ResponsiveProvider>
            <IconProvider library={regularIcons}>
                <IntlProvider locale="en">
                    <Summary
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
