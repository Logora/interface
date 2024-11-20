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
    ...rest
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showToggle, setShowToggle] = useState(false);
    const contentRef = useRef(null);

    const formatContent = (content) => {
        if (isExpanded) {
            return content.toString();
        } else if (content.length > charCount) {
            return content.replace(/[\n\r]/g, ' ').slice(0, charCount);
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
        textOverflow: 'ellipsis'
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

    useEffect(() => {
        if (expandable && content && charCount) {
            setShowToggle(content.length > charCount);
        }
    }, [charCount, content]);

    return (
        <div className={styles.readMore}>
            <div
                ref={contentRef}
                style={lineCount && !isExpanded ? lineClampingStyle : {}}
                onClick={expandable ? handleContentToggle : undefined}
            >
                {(!expandable || lineCount) ? content : formatContent(content)}
            </div>
            {showToggle && (
                <div className={styles.readMoreWrapper}>
                    {to ? (
                        <Link
                            to={to}
                            className={cx(styles.readMoreElement, className)}
                            {...rest}
                        >
                            {readMoreText}
                        </Link>
                    ) : (
                        <span
                            className={cx(styles.readMoreElement, className)}
                            onClick={handleContentToggle}
                            {...rest}
                        >
                            {isExpanded ? readLessText : readMoreText}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};