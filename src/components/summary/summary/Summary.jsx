import React, { useEffect, useState } from 'react';
import styles from './Summary.module.scss';
import { SectionBox } from '@logora/debate.section.section_box';
import { SummaryBox } from '@logora/debate.summary.summary_box';
import { useConfig } from '@logora/debate.data.config_provider';
import { BoxSkeleton } from '@logora/debate.skeleton.box_skeleton';
import { useIntl } from 'react-intl';

export const Summary = ({ contentId, positions }) => {
    const [summaryFirstPosition, setSummaryFirstPosition] = useState([]);
    const [summarySecondPosition, setSummarySecondPosition] = useState([]);
    const [isLoadedFirstPosition, setIsLoadedFirstPosition] = useState(false);
    const [isLoadedSecondPosition, setIsLoadedSecondPosition] = useState(false);
    const config = useConfig();
    const intl = useIntl();

    useEffect(() => {
        fetch(`https://nlp.logora.fr/analysis/argument-summary-${contentId}-${positions[0].id}`)
            .then(response => response.json())
            .then(json => {
                setSummaryFirstPosition(json.data);
                setIsLoadedFirstPosition(true);
            })
            .catch(error => console.error(error));

        fetch(`https://nlp.logora.fr/analysis/argument-summary-${contentId}-${positions[1]}`)
            .then(response => response.json())
            .then(json => {
                setSummarySecondPosition(json.data);
                setIsLoadedSecondPosition(true);
            })
            .catch(error => console.error(error));
    }, [contentId, positions]);

    return (
        <SectionBox isCollapsible isCollapsedByDefault={false}
            title={intl.formatMessage({
                id: "source.context_source_list.title",
                defaultMessage: "Summary"
            })}>
            <div className={styles.argumentsListContainer}>
                {isLoadedFirstPosition ? (
                    <SummaryBox
                        contentItems={summaryFirstPosition || []}
                        tag={positions}
                    />
                ) : (
                    <BoxSkeleton onlyEdgeBox boxHeight={120} />
                )}

                {isLoadedSecondPosition ? (
                    <SummaryBox
                        contentItems={summarySecondPosition || []}
                        tag={positions}
                    />
                ) : (
                    <BoxSkeleton onlyEdgeBox boxHeight={120} />
                )}
            </div>
        </SectionBox>
    );
};
