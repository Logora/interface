import React from 'react';
import { useIntl } from "react-intl";
import { useResponsive } from "@logora/debate.hooks.use_responsive";
import { Link } from '@logora/debate.action.link';
import { ContextSourceBox } from "@logora/debate.source.context_source_box";
import { SectionBox } from "@logora/debate.section.section_box"
import styles from './ContextSourceList.module.scss';
import cx from "classnames";
import PropTypes from "prop-types";

export const ContextSourceList = ({ sources = [] }) => {
    const intl = useIntl();
    const { isMobile, isTablet, isDesktop } = useResponsive();

    const displaySource = (source) => {
        return (
            <Link className={styles.listItem} to={source.source_url} key={source.id} target="_blank" external>
                <ContextSourceBox imageUrl={source.origin_image_url} author={source.publisher} title={source.title} date={source.published_date} />
            </Link>
        )
    }
    return (
        <SectionBox isCollapsible title={intl.formatMessage({ id: "source.context_source_list.title", defaultMessage: "Debate context" })}>
            <div className={cx(styles.content, { [styles.contentDesktop]: isDesktop, [styles.contentTablet]: isTablet, [styles.contentMobile]: isMobile })}>
                {sources.map(displaySource)}
            </div>
        </SectionBox>
    )
}

ContextSourceList.propTypes = {
    /** A list of articles to display */
    sources: PropTypes.arrayOf(PropTypes.shape({
        /** ID of the source to be used as a unique source */
        id: PropTypes.number,
        title: PropTypes.string,
        source_url: PropTypes.string,
        published_date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        publisher: PropTypes.string,
        origin_image_url: PropTypes.string
    }))
}