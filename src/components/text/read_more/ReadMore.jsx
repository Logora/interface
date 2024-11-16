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
        WebkitLineClamp: isExpanded ? 'none' : lineCount
    }

    useEffect(() => {
        if (expandable && content) {
            if (charCount) {
                setShowToggle(content.length > charCount);
            } else if (lineCount && contentRef.current) {
                const element = contentRef.current;
                const totalHeight = element.scrollHeight;
                const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
                const collapsedHeight = lineCount * lineHeight;
                setShowToggle(totalHeight > collapsedHeight);
            }
        } else {
            setShowToggle(false);
        }
    }, [expandable, lineCount, charCount, content]);


    return (
        <div className={styles.readMore}>
            <div
                ref={contentRef}
                className={lineCount ? styles.lineClamp : null}
                style={lineCount ? lineClampingStyle : {}}
                onClick={expandable ? handleContentToggle : undefined}
            >
                {(!expandable || lineCount) ? content : formatContent(content)}
            </div>
            {showToggle && (
                <span className={styles.readMoreWrapper}>
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
                        <span
                            className={cx(styles.readMoreElement, className)}
                            onClick={handleContentToggle}
                            {...rest}
                        >
                            {isExpanded ? readLessText : readMoreText}
                        </span>
                    )}
                </span>
            )}
        </div>
    );
};