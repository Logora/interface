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
    alwaysShowReadMore = false,
    ...rest
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showToggle, setShowToggle] = useState(alwaysShowReadMore ? true : (expandable && content && charCount) ? content.length > charCount : false);
    const contentRef = useRef(null);

    const formatContent = (content) => {
        if (isExpanded) {
            return content.toString();
        } else if (charCount && content.length > charCount) {
            return `${content.replace(/[\n\r]/g, ' ').slice(0, charCount)}`;
        }
        return content;
    };

    const handleContentToggle = () => {
        setIsExpanded(isExpanded => !isExpanded);
    };

    const lineClampingStyle = {
        display: '-webkit-box',
        WebkitLineClamp: lineCount,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'clip',
        width: '100%'
    };

    useEffect(() => {
        if (alwaysShowReadMore) {
            setShowToggle(true);
            return;
        }
        if (expandable && content) {
            if (lineCount && contentRef.current) {
                const element = contentRef.current;
                const { clientHeight, scrollHeight } = element;
                setShowToggle(clientHeight !== scrollHeight);
            } else if (charCount) {
                setShowToggle(content.length > charCount);
            }
        }
    }, [lineCount, content, contentRef, expandable, charCount, alwaysShowReadMore]);

    return (
        <div className={cx(styles.readMore, { [styles.pointer]: showToggle })}>
            <div
                ref={contentRef}
                style={lineCount && !isExpanded ? lineClampingStyle : { width: '100%' }}
                onClick={expandable ? handleContentToggle : undefined}
            >
                {(!expandable || lineCount) ? content : formatContent(content)}
            </div>
            {showToggle && (
                <>
                    <div className={cx(styles.readMoreWrapper, readMoreClassName)}>
                        {!isExpanded || alwaysShowReadMore && (
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
