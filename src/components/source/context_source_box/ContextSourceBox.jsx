import React from 'react';
import { useIntl } from "react-intl";
import { FormattedDate } from 'react-intl';
import styles from './ContextSourceBox.module.scss';

export const ContextSourceBox = ({ title, imageUrl, date, author }) => {
  const intl = useIntl();

  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.infos}>
              { author &&
                <>
                  <span className={styles.sourceAuthor}>{author}</span>
                  <span className={styles.separator}>·</span>
                </>
              }
              <span className={styles.sourcePublishedDate}><FormattedDate day="2-digit" month="2-digit" year="numeric" value={new Date(date)} /></span>
            </div>
            <div className={styles.sourceTitle}>{title}</div>
        </div>
        <img src={imageUrl} alt={intl.formatMessage({ id: "source.context_source_box.alt", defaultMessage: "Debate source image"})} className={styles.image} />
    </div>
  )
}

