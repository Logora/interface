import React, { useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useConfig, useRoutes } from '@logora/debate.data.config_provider';
import { ContentHeader } from '@logora/debate.user_content.content_header';
import { useResponsive } from "@logora/debate.hooks.use_responsive";
import { useAuth } from "@logora/debate.auth.use_auth";
import { ContentFooter } from '@logora/debate.user_content.content_footer';
import { SuggestionVoteBox } from '@logora/debate.vote.suggestion_vote_box';
import { Button } from '@logora/debate.action.button'; 
import { ProgressBar } from "@logora/debate.progress.progress_bar";
import { Icon } from '@logora/debate.icons.icon';
import { useTranslatedContent } from '@logora/debate.translation.translated_content';
import { TranslationButton } from '@logora/debate.translation.translation_button';
import styles from './SuggestionBox.module.scss';
import cx from 'classnames';

export const SuggestionBox = ({ suggestion, disabled = false }) => {
    const intl = useIntl();
    const startDate = new Date(suggestion.created_at);
    const endDate = new Date(suggestion.expires_at);
    const [totalUpvotes, setTotalUpvotes] = useState(suggestion.total_upvotes);
    const [isVoted, setIsVoted] = useState(false);
    const { isMobile } = useResponsive();
    const content = useTranslatedContent(suggestion.name, suggestion.language, "name", suggestion.translation_entries);
    const routes = useRoutes();
    const config = useConfig();
    const { currentUser } = useAuth();

    const activeVote = (isUpvote) => {
        if (isUpvote) {
            setTotalUpvotes(totalUpvotes + 1);
            setIsVoted(true);
        } else {
            setTotalUpvotes(totalUpvotes - 1);
            setIsVoted(false);
        }
    }

    const getTag = () => {
        if(suggestion.is_accepted) {
            return intl.formatMessage({ id: "suggestion.selected", defaultMessage: "Selected" });
        } else if(suggestion.is_expired === true || endDate < startDate) {
            return intl.formatMessage({ id: "suggestion.ended", defaultMessage: "Expired" });
        } else {
            return null;
        }
    }

    const getTagClassName = () => {
        if(suggestion.is_accepted) {
            return styles.selected;
        } else if(suggestion.is_expired === true || endDate < startDate) {
            return styles.expired;
        } else {
            return null;
        }
    }

    return (
        <div className={styles.container}>
            <ContentHeader
                author={suggestion.author} 
                tag={getTag()}
                tagClassName={getTagClassName()}
                date={endDate < startDate ? null : endDate.getTime()} 
            />
            <div className={styles.suggestion}>
                {content.translatedContent}
                {content.isTranslated &&
                    <TranslationButton language={suggestion.language} callback={() => content.toggleContent()} />
                }
            </div>
            <div className={styles.footer}>
                <ContentFooter 
                    resource={suggestion}
                    reportType={"DebateSuggestion"}
                    deleteType={"debate_suggestions"}
					deleteListId={"suggestionsList"}
                    disabled={disabled}
                    enableEdition={false}
                    showActions={suggestion.is_accepted !== true}
                    containerClassName={styles.footerContainer}
                    voteActionClassName={styles.footerActionContainer}
                >
                    { suggestion.is_published && suggestion.is_accepted && suggestion.group && 
                        <div className={styles.voteButton}>
                            <Button rightIcon={<Icon name="lightArrow" width={10} height={10} className={styles.arrowIcon} />} className={styles.linkToDebate} to={routes.debateShowLocation.toUrl({debateSlug: suggestion.group.slug})}>
                                <span>{ intl.formatMessage({ id: "action.link_to_debate", defaultMessage: "Go to debate" }) }</span>
                            </Button>
                        </div>
                    }
                    { suggestion.is_accepted === false && suggestion.is_expired === false &&
                        <SuggestionVoteBox 
                            voteableType={"DebateSuggestion"} 
                            voteableId={suggestion.id} 
                            totalUpvote={totalUpvotes} 
                            totalDownvote={suggestion.total_downvotes} 
                            onVote={(isUpvote) => activeVote(isUpvote)} 
                            disabled={disabled || (currentUser?.id === suggestion?.author?.id)}
                        />
                    }
                    <div className={cx(styles.progressBarContainer, {[styles.progressBarContainerIsMobile]: isMobile, [styles.progressBarSelected]: suggestion.is_accepted && suggestion.is_published === false, [styles.hideElement]: suggestion.is_accepted && suggestion.is_published, [styles.active]: isVoted})}>
                        <div className={styles.userProgress}>
                            <span className={styles.voteGoalText}>{totalUpvotes || 0}/{config.modules?.suggestions?.vote_goal || 30}</span>
                            <FormattedMessage id='suggestion.goal' values={{ count: config.modules?.suggestions?.vote_goal || 30 }} />
                        </div>
                        <div className={styles.goals}>
                            <ProgressBar 
                                className={styles.suggestionProgress} 
                                innerClassName={styles.bar} 
                                progress={totalUpvotes} 
                                goal={config.modules.suggestions?.vote_goal ? parseInt(config.modules.suggestions?.vote_goal) : 30}
                            />
                        </div>
                    </div>
                </ContentFooter>
            </div>
        </div>
    )
}

SuggestionBox.propTypes = {
    /** Suggestion object */
    suggestion: PropTypes.object.isRequired,
    /** Indicates if the suggestion is disabled */
    disabled: PropTypes.bool,
};
