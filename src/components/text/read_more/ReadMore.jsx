import React, { useState } from 'react';
import { Link } from '@logora/debate.action.link';
import { FormattedMessage } from 'react-intl';
import styles from './ReadMore.module.scss';
import cx from 'classnames';

export const ReadMore = (props) => {
    const { content, contentCharCount = 250, readMoreUrl, nextLine = false, lineCount = false, nextLineSpacing = 0, className, ...rest } = props;
    const [showMore, setShowMore] = useState(false);
    const [contentLength, setContentLength] = useState(contentCharCount)

    const formatContent = (content) => {
        return `${content.replace(/[\n\r]/g, ' ').slice(0, contentLength)}...`;
    }

    const showContent = () => {
        setShowMore(!showMore);
        setContentLength(content.toString().length);
    }

    const hideContent = () => {
        setShowMore(!showMore);
        setContentLength(contentCharCount);
    }

    const lineClampingStyle = {
        WebkitLineClamp: lineCount,
    }

    const nextLineStyle = {
        paddingTop: `${nextLineSpacing}px`,
    }
    
    return (
        <div>
            <span className={{[styles.contentBody]: lineCount}} style={lineCount ? lineClampingStyle : {}}>
                { lineCount ? content : formatContent(content) }
            </span>
            <span className={{ [styles.nextLine]: nextLine }} style={ nextLine ? nextLineStyle : {}}>
                { readMoreUrl ?
                    <Link 
                        to={readMoreUrl} 
                        className={cx(styles.readMoreElement, className)}
                        data-tid={"link_comment_read_more"}
                        target="_top"
                        external
                        {...rest}
                    >
                        <FormattedMessage id="action.read_more" defaultMessage={"Read more"} />
                    </Link>
                :
                    <span 
                        className={cx(styles.readMoreElement, className)} 
                        onClick={showMore ? hideContent : showContent}
                    >
                        {showMore ?
                            <FormattedMessage id="action.read_more" defaultMessage={"Read less"} />
                        :
                            <FormattedMessage id="action.read_less" defaultMessage={"Read more"} />
                        }
                    </span>
                }
            </span>
        </div>
    );
}