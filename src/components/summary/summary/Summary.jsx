import React, { useEffect, useState } from 'react';
import { SectionBox } from '@logora/debate.section.section_box';
import { SummaryBox } from '@logora/debate.summary.summary_box';
import { BoxSkeleton } from '@logora/debate.skeleton.box_skeleton';
import { useIntl } from "react-intl";

import styles from './Summary.module.scss';

export const Summary = ({ apiUrl, summaryId, tags = [], tagClassNames = [], title, subtitle }) => {
    const [summaries, setSummaries] = useState({});
    const intl = useIntl();


    const fetchSummary = async (summaryId, tagId = '') => {
        try {
            const url = `${apiUrl}/${summaryId}${tagId ? `-${tagId}` : ''}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = await response.json();
            return json.data || [];
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchSummaries = async () => {
            try {
                const summariesData = {};

                if (tags.length === 0) {
                    summariesData['no-position'] = await fetchSummary(summaryId);
                } else {
                    const results = await Promise.all(
                        tags.map((tag) => fetchSummary(summaryId, tag.id))
                    );

                    tags.forEach((tag, index) => {
                        summariesData[tag.id] = results[index];
                    });
                }

                setSummaries(summariesData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSummaries();
    }, [summaryId, tags]);

    return (
        <SectionBox isCollapsible isCollapsedByDefault={true} title={title} subtitle={subtitle}>
            <div className={styles.summaryContainer}>
                {Object.keys(summaries).length === 0 ? (
                    tags.length === 0 ? (
                        <BoxSkeleton onlyEdgeBox boxHeight={120} />
                    ) : (
                        tags.map((tag) => <BoxSkeleton key={tag.id} onlyEdgeBox boxHeight={120} />)
                    )
                ) : (
                    tags.length === 0 ? (
                        <div>
                            <SummaryBox summaryItems={summaries['no-position'] || []} />
                        </div>
                    ) : (
                        tags.map((tag) => (
                            <div key={tag.id}>
                                <SummaryBox
                                    summaryItems={summaries[tag.id] || []}
                                    tag={tag.name}
                                    tagClassName={tagClassNames}
                                    emptySummaryText={intl.formatMessage({ id: "info.emptysummary", defaultMessage: "No resume found." })}

                                />
                            </div>
                        ))
                    )
                )}
            </div>
        </SectionBox>
    );
};
