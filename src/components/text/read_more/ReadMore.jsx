import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@logora/debate.action.link';
import styles from './ReadMore.module.scss';
import cx from 'classnames';

export const ReadMore = ({
    content,
    charCount,
    lineCount,
    to,
    className,
    readMoreText,
    readLessText,
    expandable = true,
    readMoreClassName,
    ...rest
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showToggle, setShowToggle] = useState((expandable && content && charCount) ? content.length > charCount : false);
    const contentRef = useRef(null);

    const formatContent = (content) => {
        if (isExpanded) {
            return content.toString();
        } else if (content.length > charCount) {
            return `${content.replace(/[\n\r]/g, ' ').slice(0, charCount)}`;
        }
        return content;
    }
    
    const handleContentToggle = () => {
        setIsExpanded(isExpanded => !isExpanded);
    }

    const lineClampingStyle = {
        display: '-webkit-box',
        WebkitLineClamp: lineCount,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'clip'
    };

    useEffect(() => {
        if (expandable && content) {
            if (lineCount && contentRef.current) {
                const element = contentRef.current;
                const { clientHeight, scrollHeight } = element;
                setShowToggle(clientHeight !== scrollHeight);
            }
        }
    }, [lineCount, content, contentRef]);

    return (
        <div className={cx(styles.readMore, { [styles.pointer]: showToggle })}>
            <div
                ref={contentRef}
                style={lineCount && !isExpanded ? lineClampingStyle : {}}
                onClick={expandable ? handleContentToggle : undefined}
            >
                {(!expandable || lineCount) ? content : formatContent(content)}
            </div>
            {showToggle && (
                <>
                    <div className={cx(styles.readMoreWrapper, readMoreClassName)}>
                        {!isExpanded && (
                            <span className={styles.ellipsis}>...</span>
                        )}
                        {to ? (
                            <Link
                                to={to}
                                className={cx(styles.readMoreElement, className)}
                                {...rest}
                            >
                                {readMoreText}
                            </Link>
                        ) : (
                            !isExpanded && (
                                <span
                                    className={cx(styles.readMoreElement, className)}
                                    onClick={handleContentToggle}
                                    {...rest}
                                >
                                    {readMoreText}
                                </span>
                            )
                        )}
                    </div>
                    {isExpanded && (
                        <div className={styles.readLessWrapper}>
                            <span
                                className={cx(styles.readLessElement, className)}
                                onClick={handleContentToggle}
                                {...rest}
                            >
                                {readLessText}
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
