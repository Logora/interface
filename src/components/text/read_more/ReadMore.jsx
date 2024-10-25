import React, { useState } from 'react';
import { Link } from '@logora/debate.action.link';
import styles from './ReadMore.module.scss';
import cx from 'classnames';

export const ReadMore = (props) => {
    const { content, contentCharCount = 250, to, nextLine = false, lineCount = false, nextLineSpacing = 0, className, readMoreText, readLessText, ...rest } = props;
    const [showMore, setShowMore] = useState(false);
    const [contentLength, setContentLength] = useState(contentCharCount)

    const formatContent = (content) => {
        if (content.length > contentCharCount) {
            return `${content.replace(/[\n\r]/g, ' ').slice(0, contentLength)}...`;
        } else {
            return content + "...";
        }
    }

    const handleContentToggle = () => {
        setShowMore(!showMore);
        setContentLength(showMore ? contentCharCount : content.toString().length);
    };

    const lineClampingStyle = {
        WebkitLineClamp: lineCount,
    }

    const nextLineStyle = {
        paddingTop: `${nextLineSpacing}px`,
    }
    
    return (
        <div className={styles.readMore}>
            <span className={lineCount ? styles.contentBody : {}} style={lineCount ? lineClampingStyle : {}}  onClick={handleContentToggle} >
                { lineCount ? content : formatContent(content) }
            </span>
            <span className={nextLine ? styles.nextLine : {}} style={ nextLine ? nextLineStyle : {}}>
                { to ?
                    <Link 
                        to={to} 
                        className={cx(styles.readMoreElement, className)}
                        {...rest}
                    >
                        { readMoreText }
                    </Link>
                :
                    <span 
                        className={cx(styles.readMoreElement, className)} 
                        onClick={handleContentToggle} 
                        {...rest}
                    >
                        { showMore ?  readLessText  : readMoreText  }
                    </span>
                }
            </span>
        </div>
    );
}