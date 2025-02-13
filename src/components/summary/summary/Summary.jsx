import React, { useEffect, useState } from 'react';
import styles from './Summary.module.scss';
import { SectionBox } from '@logora/debate.section.section_box';
import { SummaryBox } from '@logora/debate.summary.summary_box';
import { BoxSkeleton } from '@logora/debate.skeleton.box_skeleton';
import { useIntl } from 'react-intl';

export const Summary = ({ contentId, positions = [] }) => {
    const [summaries, setSummaries] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const intl = useIntl();

    useEffect(() => {
        const fetchSummaries = async () => {
            try {
                const summariesData = {};

                if (positions.length === 0) {
                    const response = await fetch(`https://nlp.logora.fr/analysis/argument-summary-${contentId}`);
                    if (!response.ok) {
                        throw new Error('HTTP error');
                    }
                    const json = await response.json();
                    summariesData['no-position'] = json.data;
                } else {
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
                }
                setSummaries(summariesData);
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
                    positions.length === 0 ? (
                        <BoxSkeleton key="no-position" onlyEdgeBox boxHeight={120} />
                    ) : (
                        positions.map((position) => (
                            <BoxSkeleton key={position.id} onlyEdgeBox boxHeight={120} />
                        ))
                    )
                ) : (
                    positions.length === 0 ? (
                        <div key="no-position">
                            <SummaryBox
                                summaryItems={summaries['no-position'] || []}
                            />
                        </div>
                    ) : (
                        positions.map((position) => (
                            <div key={position.id}>
                                <SummaryBox
                                    summaryItems={summaries[position.id] || []}
                                    tag={position.name}
                                    tagClassName={styles.tag}
                                />
                            </div>
                        ))
                    )
                )}
            </div>
        </SectionBox>
    );
};
