import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@logora/debate.action.link';
import styles from './ReadMore.module.scss';
import cx from 'classnames';

export const ReadMore = ({
    content,
    charCount = 250,
    lineCount,
    to,
    className,
    readMoreText,
    readLessText,
    expandable = true,
    ...rest
}) => {
    const [expanded, setExpanded] = useState(false);
    const [isClamped, setIsClamped] = useState(false);
    const contentRef = useRef(null);
    const showToggle = expandable && ((lineCount && isClamped) || (charCount && content.length > charCount))

    const formatContent = (content) => {
        if (expanded) {
            return content.toString();
        } else if (content.length > charCount) {
            return content.replace(/[\n\r]/g, ' ').slice(0, charCount);
        }
        return content;
    }

    const handleContentToggle = () => {
        setExpanded(!expanded);
    }

    const lineClampingStyle = {
        WebkitLineClamp: expanded ? 'unset' : lineCount,
    }

    useEffect(() => {
        if (contentRef.current && lineCount) {
            const element = contentRef.current;
            setIsClamped(element.scrollHeight > element.clientHeight);
        }
    }, [content, lineCount]);

    return (
        <div className={styles.readMore}>
            <span
                ref={contentRef}
                className={lineCount ? styles.lineClamp : {}}
                style={lineCount ? lineClampingStyle : {}}
                onClick={expandable ? handleContentToggle : undefined}
            >
                {(!expandable || lineCount) ? content : formatContent(content)}
            </span>
            {showToggle && (
                <span className={styles.readMoreWrapper}>
                    <span className={styles.ellipsis}>...</span>
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
                            {expanded ? readLessText : readMoreText}
                        </span>
                    )}
                </span>
            )}
        </div>
    );
};
