import React, { useEffect, useState } from 'react';
import styles from './Summary.module.scss';
import { SectionBox } from '@logora/debate.section.section_box';
import { SummaryBox } from '@logora/debate.summary.summary_box';
import { BoxSkeleton } from '@logora/debate.skeleton.box_skeleton';
import { useIntl } from 'react-intl';

export const Summary = ({ contentId, positions = [] }) => {
    const [summarys, setSummarys] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const intl = useIntl();

    useEffect(() => {
        const fetchSummaries = async () => {
            try {
                const summariesData = {};

                await Promise.all(
                    positions.map(async (position) => {
                        try {
                            const response = await fetch(`https://nlp.logora.fr/analysis/argument-summary-${contentId}-${position.id}`);
                            if (!response.ok) {
                                throw new Error('HTTP error');
                            }
                            const json = await response.json();
                            summariesData[position.id] = json.data;
                        } catch (error) {
                            console.error(error);
                        }
                    })
                );
                setSummarys(summariesData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchSummaries();
    }, [contentId, positions]);


    return (
        <SectionBox
            isCollapsible
            isCollapsedByDefault={false}
            title={intl.formatMessage({
                id: "source.context_source_list.title",
                defaultMessage: "Summary"
            })}
        >
            <div className={styles.summaryContainer}>
                {isLoading ? (
                    positions.map((position) => (
                        <BoxSkeleton key={position.id} onlyEdgeBox boxHeight={120} />
                    ))
                ) : (
                    positions.map((position) => (
                        <div key={position.id}>
                            <SummaryBox
                                contentItems={summarys[position.id] || []}
                                tag={position.name}
                                className={styles.test}
                            />
                        </div>
                    ))
                )}
            </div>
        </SectionBox>
    );
};
