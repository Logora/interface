import React from "react";
import { SummaryBox } from './SummaryBox';
import { render } from '@testing-library/react';
import styles from './SummaryBox.module.scss';


describe('SummaryBox', () => {
    it('renders SummaryBox component correctly with tag', () => {
        const contentItems = [
            "Les algorithmes d'intelligence artificielle sont utilisés dans de nombreux domaines, comme la santé, la finance et l'éducation.",
            "Les avancées en IA permettent de développer des assistants virtuels toujours plus performants."
        ];

        const { getByText } = render(
            <SummaryBox
                contentItems={contentItems}
                className={styles.navy}
                tag={"Yes"}
            />
        );

        expect(getByText("Yes")).toBeInTheDocument();

        contentItems.forEach(item => {
            expect(getByText(item)).toBeInTheDocument();
        });
    });

    it('renders SummaryBox component correctly without tag', () => {
        const contentItems = [
            "Les algorithmes d'intelligence artificielle sont utilisés dans de nombreux domaines, comme la santé, la finance et l'éducation.",
            "Les avancées en IA permettent de développer des assistants virtuels toujours plus performants."
        ];

        const { getByText, queryByText } = render(
            <SummaryBox
                contentItems={contentItems}
                className={styles.darksalmon}
            />
        );

        expect(queryByText("Yes")).not.toBeInTheDocument();

        contentItems.forEach(item => {
            expect(getByText(item)).toBeInTheDocument();
        });
    });
});
