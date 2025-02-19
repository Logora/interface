import React from "react";
import { SummaryBox } from './SummaryBox';
import { render } from '@testing-library/react';
import styles from './SummaryBox.module.scss';

describe('SummaryBox', () => {
    it('renders SummaryBox component correctly with tag', () => {
        const summaryItems = [
            "Les algorithmes d'intelligence artificielle sont utilisés dans de nombreux domaines, comme la santé, la finance et l'éducation.",
            "Les avancées en IA permettent de développer des assistants virtuels toujours plus performants."
        ];

        const { getByText } = render(
            <SummaryBox
                summaryItems={summaryItems}
                tagClassName={styles.navy}
                tag={"Yes"}
            />
        );

        expect(getByText("Yes")).toBeInTheDocument();

        summaryItems.forEach(item => {
            expect(getByText(item)).toBeInTheDocument();
        });
    });

    it('renders SummaryBox component correctly without tag', () => {
        const summaryItems = [
            "Les algorithmes d'intelligence artificielle sont utilisés dans de nombreux domaines, comme la santé, la finance et l'éducation.",
            "Les avancées en IA permettent de développer des assistants virtuels toujours plus performants."
        ];

        const { getByText, queryByText } = render(
            <SummaryBox
                summaryItems={summaryItems}
                tagClassName={styles.darksalmon}
            />
        );

        expect(queryByText("Yes")).not.toBeInTheDocument();

        summaryItems.forEach(item => {
            expect(getByText(item)).toBeInTheDocument();
        });
    });
});
