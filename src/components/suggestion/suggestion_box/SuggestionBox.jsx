import React, { useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useRoutes } from '@logora/debate.data.config_provider';
import { useAuth } from "@logora/debate.auth.use_auth";
import { useTranslatedContent } from '@logora/debate.translation.translated_content';
import { ContentHeader } from '@logora/debate.user_content.content_header';
import { ContentFooter } from '@logora/debate.user_content.content_footer';
import { SuggestionVoteBox } from '@logora/debate.vote.suggestion_vote_box';
import { Button } from '@logora/debate.action.button';
import { Icon } from '@logora/debate.icons.icon';
import { TranslationButton } from '@logora/debate.translation.translation_button';
import styles from './SuggestionBox.module.scss';
import cx from 'classnames';
import PropTypes from "prop-types";

export const SuggestionBox = ({ suggestion, disabled = false, onVoteCallback = null, hideFooter = false }) => {
    const intl = useIntl();
    const routes = useRoutes();
    const startDate = new Date(suggestion.created_at);
    const endDate = new Date(suggestion.expires_at);
    const [totalUpvotes, setTotalUpvotes] = useState(suggestion.debate_suggestion.total_upvotes);
    const content = useTranslatedContent(suggestion.name, suggestion.language, "name", suggestion.translation_entries);
    const { currentUser } = useAuth();

    const handleVote = (isUpvote, activeVote, totalUpvotes, totalDownvotes) => {
        onVoteCallback?.(suggestion);
        setTotalUpvotes(totalUpvotes);
    }

    const getTag = () => {
        if (suggestion.is_accepted || suggestion.is_published) {
            return intl.formatMessage({ id: "suggestion.suggestion_box.selected", defaultMessage: "Selected" });
        }
        if (suggestion.debate_suggestion.is_expired === true || endDate < startDate) {
            return intl.formatMessage({ id: "suggestion.suggestion_box.ended", defaultMessage: "Expired" });
        }
        return null;
    }

    const getTagClassName = () => {
        if (suggestion.is_accepted || suggestion.is_published) {
            return styles.selected;
        } 
        if (suggestion.debate_suggestion.is_expired === true || endDate < startDate) {
            return styles.expired;
        }
        return null;
    }

    return (
        <div className={styles.container}>
            <ContentHeader
                author={suggestion.debate_suggestion.author}
                tag={getTag()}
                tagClassName={getTagClassName()}
            />
            <div className={styles.suggestion}>
                {content.translatedContent}
                {content.isTranslated &&
                    <TranslationButton language={suggestion.language} callback={() => content.toggleContent()} />
                }
            </div>
            <div className={styles.footer}>
            {!hideFooter &&
                <ContentFooter
                    resource={suggestion}
                    reportType={"Group"}
                    deleteType={"groups"}
                    deleteListId={"suggestionsList"}
                    disabled={disabled}
                    showShareButton={false}
                    enableEdition={false}
                    showActions={suggestion.is_accepted !== true}
                    containerClassName={styles.footerContainer}
                    voteActionClassName={styles.footerActionContainer}
                >
                    {suggestion.is_published &&
                        <div className={styles.voteButton}>
                            <Button rightIcon={<Icon name="lightArrow" width={10} height={10} className={styles.arrowIcon} />} className={styles.linkToDebate} to={routes.debateShowLocation.toUrl({ debateSlug: suggestion.slug })}>
                                <span>{intl.formatMessage({ id: "action.link_to_debate", defaultMessage: "Go to debate" })}</span>
                            </Button>
                        </div>
                    }
                    {suggestion.debate_suggestion.is_accepted === false && suggestion.debate_suggestion.is_expired === false && !suggestion.is_published &&
                        <SuggestionVoteBox
                            voteableType={"DebateSuggestion"}
                            voteableId={suggestion.debate_suggestion.id}
                            totalUpvote={totalUpvotes}
                            totalDownvote={suggestion.debate_suggestion.total_downvotes}
                            onVote={handleVote}
                            disabled={disabled || (currentUser?.id === suggestion?.debate_suggestion?.author?.id)}
                            data-testid="upvote-icon"
                        />
                    }
                    <div className={cx(styles.voteResultsContainer)}>
                        <FormattedMessage id="suggestion.goal" defaultMessage={"{count} supports"}  values={{ count: totalUpvotes }} />
                    </div>
                </ContentFooter>
}
            </div>
        </div>
    )
}

SuggestionBox.propTypes = {
    /** Suggestion object */
    suggestion: PropTypes.object,
    /** Indicates if the suggestion is disabled */
    disabled: PropTypes.bool,
};