import React from 'react';
import { FormattedDate } from 'react-intl';
import styles from './ContextSourceBox.module.scss';
import PropTypes from "prop-types";

export const ContextSourceBox = ({ title, imageUrl, date, author }) => {
  return (
    <div className={styles.container}>
        <img src={imageUrl} alt="" className={styles.image} />
        <div className={styles.content}>
            <div className={styles.infos}>
              { author &&
                <>
                  <span className={styles.sourceAuthor}>{author}</span>
                  <span className={styles.separator}>•</span>
                </>
              }
              <span className={styles.sourcePublishedDate}><FormattedDate value={new Date(date)} year="numeric" month="long" day="2-digit" /></span>
            </div>
            <div className={styles.sourceTitle}>{title}</div>
        </div>
    </div>
  )
}

ContextSourceBox.propTypes = {
  /** Title of the source */
  title: PropTypes.string.isRequired,
  /** Author of the source */
  author: PropTypes.string,
  /** Publication date of the source */
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date) ]),
  /**  URL of the source image */
  imageUrl: PropTypes.string
};