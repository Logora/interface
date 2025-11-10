import React from 'react';
import PropTypes from "prop-types";
import { ContentHeader } from '@logora/debate.user_content.content_header';
import { Link } from '@logora/debate.action.link';
import { Icon } from "@logora/debate.icons.icon";
import { ReadMore } from '@logora/debate.text.read_more';
import { FormattedMessage } from 'react-intl';
import { useTranslatedContent } from '@logora/debate.translation.translated_content';
import cx from 'classnames';
import styles from './SummaryContentBox.module.scss';

export const SummaryContentBox = ({ author, tag, date, title = '', content, link, contentCount = 0, tagClassName, headerOneLine = false, showFooter = false, language, lineCount, translationEntries = [] }) => {
    const translatedTitle = useTranslatedContent(title, language, "title", translationEntries);
    const translatedContent = useTranslatedContent(content, language, "content", translationEntries);
    return (
        <div className={styles.contentBox}>
            <>
                <ContentHeader 
                    author={author} 
                    tag={tag}
                    tagClassName={tagClassName}
                    date={date}
                    oneLine={headerOneLine}
                />
                <div className={styles.contentBody}>
                    { title &&
                        <div className={styles.title}>
                            { translatedTitle.translatedContent }
                        </div>
                    }
                    <ReadMore 
                        content={translatedContent.translatedContent}
                        charCount={lineCount ? undefined : 200}
                        lineCount={lineCount ?? undefined }
                        to={link} 
                        data-tid={"link_argument_read_more"}
                        target="_top"
                        external
                        expandable={true}
                        readMoreText={
                            <div className={styles.readMore}>
                                <FormattedMessage id="user_content.summary_content_box.read_more" defaultMessage={"Read more"} />
                                <Icon name="arrow" height={20} width={20} className={styles.arrow} />
                            </div>
                        }
                    />
                </div>
                { showFooter &&
                    <Link 
                        className={cx(styles.contentBoxFooter, tagClassName)} 
                        to={link}
                        data-tid={"link_arguments_read_more"}
                        target="_top"
                        external
                    >
                        <FormattedMessage 
                            id="user_content.summary_content_box.read_more_arguments" 
                            values={{ count: contentCount, position: tag }}
                            defaultMessage={'Read {count} arguments "{position}"'}
                        />
                    </Link>
                }
            </>
        </div>
    );
}

SummaryContentBox.propTypes = {
    /** Object containing the author name */
    author: PropTypes.object.isRequired,
    /** Tag displayed in the header */
    tag: PropTypes.string,
    /** Date displayed in the header */
    date: PropTypes.instanceOf(Date),
    /** Title of the argument */
    title: PropTypes.string,
    /** Content of the argument */
    content: PropTypes.string.isRequired,
    /** Call-to-action URL */
    link: PropTypes.string.isRequired,
    /** Number of arguments in the debate */
    contentCount: PropTypes.number,
    /** CSS class name of the argument's tag  */
    tagClassName: PropTypes.string,
    /** Show author, position and date in one line */
    headerOneLine: PropTypes.bool,
    /** Show footer link to read more arguments */
    showFooter: PropTypes.bool,
};
