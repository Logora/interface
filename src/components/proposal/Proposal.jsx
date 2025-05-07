import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useTranslatedContent } from '@logora/debate.translation.translated_content';
import { useAuth } from "@logora/debate.auth.use_auth";
import { ContentHeader } from '@logora/debate.user_content.content_header';
import { ReadMore } from "@logora/debate.text.read_more";
import { lexicalToHtml } from "@logora/debate.input.text_editor";
import { HashScroll } from '@logora/debate.tools.hash_scroll';
import { TranslationButton } from "@logora/debate.translation.translation_button";
import { ContentFooter } from '@logora/debate.user_content.content_footer';
import { useConfig } from '@logora/debate.data.config_provider';
import { UpDownVoteBox } from "@logora/debate.vote.up_down_vote_box";
import draftToHtml from "draftjs-to-html";
import cx from "classnames";
import styles from './Proposal.module.scss';

export const Proposal = ({ proposal, disabled = false, fixedContentHeight, contentMaxHeight = 156, enableEdition = true }) => {
    const [richContent, setRichContent] = useState(null);
    const [flash, setFlash] = useState(false);
    const intl = useIntl();
    const config = useConfig();
    const { currentUser } = useAuth();
    const proposalId = `proposal_${proposal.id}`;
    const title = useTranslatedContent(proposal.title, proposal.language, "title", proposal.translation_entries);
    const content = useTranslatedContent(proposal.content, proposal.language, "content", proposal.translation_entries);

    useEffect(() => {
        if (proposal.rich_content) {
            const rawContent = JSON.parse(proposal.rich_content);
            if (rawContent.hasOwnProperty("root")) {
                const html = lexicalToHtml(rawContent);
                setRichContent(html);
            } else {
                const htmlContent = draftToHtml(rawContent);
                setRichContent(htmlContent);
            }
        }
    }, [proposal.rich_content]);

    const resetTranslations = () => {
        title.toggleContent();
        content.toggleContent();
    }

    return (
        <HashScroll elementId={proposalId} onScroll={() => setFlash(true)}>
            <div className={cx(styles.proposalBoxContainer, { [styles.flash]: flash })} id={proposalId}>
                <ContentHeader
                    author={proposal.author}
                    tag={proposal.tag?.display_name}
                    date={proposal.created_at}
                    oneLine={false}
                />
                <div className={cx(styles.proposalBoxContent, { [styles.fixedHeight]: fixedContentHeight })}>
                    <div>
                        <ReadMore
                            content={
                                <>
                                    {proposal.edited_at && <div className={styles.edited}>{intl.formatMessage({ id: "proposal.updated", defaultMessage: "Updated proposal" })}</div>}
                                    <div className={styles.proposalTitle}>
                                        {title.translatedContent}
                                    </div>
                                    {richContent && !content.isTranslated ? (
                                        <div className={styles.proposalContent}
                                            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                                            dangerouslySetInnerHTML={{ __html: richContent }}
                                        />
                                    ) : (
                                        <div className={styles.proposalContent}>{content.translatedContent}</div>
                                    )}
                                    {(content.isTranslated || title.isTranslated) &&
                                        <TranslationButton language={proposal.language} callback={() => resetTranslations()} />
                                    }
                                </>
                            }
                            lineCount={7}
                            readMoreText={intl.formatMessage({ id: "action.read_more", defaultMessage: "Read more" })}
                            readLessText={intl.formatMessage({ id: "action.read_less", defaultMessage: "Read less" })}
                        />
                    </div>
                </div>
                <ContentFooter
                    resource={proposal}
                    disabled={disabled}
                    reportType={"Proposal"}
                    deleteType={"proposals"}
                    deleteListId={"proposalsList"}
                    shareModal
                    shareModalTitle={intl.formatMessage({ id: "share.proposal" })}
                    shareUrl={`https://app.logora.fr/share/p/${proposal.id}`}
                    shareTitle={intl.formatMessage({ id: "share.proposal.title" })}
                    shareText={intl.formatMessage({ id: "share.proposal.text" })}
                    shareCode={`<iframe src="https://cdn.logora.com/embed.html?shortname=${config.shortname}&id=${proposal.id}&resource=proposal" frameborder="0" width="100%" height="335px" scrolling="no"></iframe>`}
                    showShareCode={config?.actions?.hideCodeShare !== true}
                    showActions={!proposal.author.consultation_id}
                    enableEdition={enableEdition}
                >
                    <UpDownVoteBox
                        voteableType={"Proposal"}
                        voteableId={proposal.id}
                        totalUpvote={proposal.total_upvotes}
                        totalDownvote={proposal.total_downvotes}
                        disabled={disabled || (currentUser?.id === proposal?.author?.id)}
                    />
                </ContentFooter>
            </div>
        </HashScroll>
    )
}