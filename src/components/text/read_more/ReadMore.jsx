import React, { useState } from 'react';
import { Link } from '@logora/debate.action.link';
import styles from './ReadMore.module.scss';
import cx from 'classnames';

export const ReadMore = ({content, contentCharCount = 250, to, lineCount = false, className, readMoreText, readLessText, expandable = true, ...rest }) => {
    const [showMore, setShowMore] = useState(false);
    const [contentLength, setContentLength] = useState(contentCharCount)

    const formatContent = (content) => {
        if (!expandable) {
            return content;
        }
        if (content.length > contentCharCount) {
            return content.replace(/[\n\r]/g, ' ').slice(0, contentLength);
        } else {
            return content;
        }
    }
    const handleContentToggle = () => {
        setShowMore(!showMore);
        setContentLength(showMore ? contentCharCount : content.toString().length);
    };

    const lineClampingStyle = {
        WebkitLineClamp: showMore ? 'unset' : lineCount,
    }

    return (
        <div className={styles.readMore}>
            <span className={lineCount ? styles.contentBody : {}} style={lineCount ? lineClampingStyle : {}} onClick={expandable ? handleContentToggle : undefined} >
                {lineCount ? content : formatContent(content)}
            </span>
            {expandable &&  (
                <span className={styles.readMoreWrapper} >
                    <span className={styles.ellipsis}>...</span>
                    {to ?
                        <Link
                            to={to}
                            className={cx(styles.readMoreElement, className)}
                            {...rest}
                        >
                            {readMoreText}
                        </Link>
                        :
                        <span
                            className={cx(styles.readMoreElement, className)}
                            onClick={handleContentToggle}
                            {...rest}
                        >
                            {showMore ? readLessText : readMoreText}
                        </span>
                    }
                </span>
            )}
        </div>
    );
    
}