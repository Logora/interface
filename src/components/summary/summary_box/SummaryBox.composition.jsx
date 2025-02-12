import React from 'react';
import { SummaryBox } from './SummaryBox';
import { faker } from '@faker-js/faker';
import styles from './SummaryBox.module.scss';

export const DefaultSummaryBox = () => {
    const generateContent = () => {
        const summaryItems = [];
        for (let i = 0; i < 5; i++) {
            summaryItems.push(faker.lorem.sentence());
        }
        return summaryItems;
    };

    return (
        <SummaryBox
            summaryItems={generateContent()}
            tagClassName={styles.navy}
            tag={"Yes"}
        />
    );
}

export const SummaryBoxRed = () => {
    const generateContent = () => {
        const summaryItems = [];
        for (let i = 0; i < 5; i++) {
            summaryItems.push(faker.lorem.sentence());
        }
        return summaryItems;
    };

    return (
        <SummaryBox
            summaryItems={generateContent()}
            tagClassName={styles.darksalmon}
            tag={"No"}
        />
    );
}


export const SummaryBoxWithoutTag = () => {
    const generateContent = () => {
        const summaryItems = [];
        for (let i = 0; i < 5; i++) {
            summaryItems.push(faker.lorem.sentence());
        }
        return summaryItems;
    };
    return (
        <SummaryBox
            summaryItems={generateContent()}
        />
    );
};
