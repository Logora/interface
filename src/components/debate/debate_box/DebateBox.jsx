import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useConfig, useRoutes } from '@logora/debate.data.config_provider';
import { Avatar } from '@logora/debate.user.avatar';
import { useIntl, FormattedMessage } from 'react-intl';
import { Icon } from '@logora/debate.icons.icon';
import { getWinningVote } from '@logora/debate.util.get_winning_vote';
import { useResponsive } from '@logora/debate.hooks.use_responsive';
import { TranslatedContent, useTranslatedContent } from '@logora/debate.translation.translated_content';
import cx from 'classnames';
import styles from './DebateBox.module.scss';
import PropTypes from "prop-types";

export const DebateBox = ({ debate }) => {
    const [winningPosition, setWinningPosition] = useState(debate.group_context.positions[0] || undefined);
    const [totalVotes, setTotalVotes] = useState(0);
    const config = useConfig();
    const routes = useRoutes();
    const intl = useIntl();
    const { isMobile } = useResponsive();
    const name = useTranslatedContent(debate.name, debate.language, "name", debate.translation_entries);

    useEffect(() => {
        setTotalVotes(getWinningVote(debate.votes_count, debate.group_context.positions).totalVotes);
        setWinningPosition(getWinningVote(debate.votes_count, debate.group_context.positions).winningPositionObj);
    }, [])

    const getPercentageValue = (voteCount, totalVotes) => {
        if (totalVotes == 0 || voteCount == 0) { return 0; }
        return Math.round(100 * (voteCount / (totalVotes)));
    }

    const displayParticipant = (participant, index) => {
        return (
            <div className={styles.debateParticipantItem} key={index}>
                <Link to={routes.userShowLocation.toUrl({ userSlug: participant.hash_id })}>
                    <Avatar avatarUrl={participant.image_url} userName={participant.full_name} isOnline={(new Date(participant.last_activity) > Date.now())} />
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.debateBox}>
            <div className={styles.debateBoxHeader}>
                <div className={styles.debateBoxImageBox}>
                    <Link to={routes.debateShowLocation.toUrl({ debateSlug: debate.slug })} className={styles.imageLink}>
                        <img data-tid={"view_debate_image"} loading={"lazy"} className={styles.debateBoxImage} src={debate.image_url} height={200} alt={intl.formatMessage({ id: "debate.debate_box.alt_debate_image", defaultMessage: "Debate image " })} />
                    </Link>
                    {debate.is_active === false &&
                        <div className={styles.inactiveDebate}>
                            <FormattedMessage id="debate.debate_box.debate_is_inactive" defaultMessage={"Debate is ended"} />
                        </div>
                    }
                </div>
                {debate.group_context.author && debate.group_context.author.is_admin === false &&
                    <div className={styles.debateSuggestion}>
                        <Icon name="suggestion" width={15} height={15} />
                        <span className={styles.authorSuggestion}>
                            <FormattedMessage id="debate.debate_box.suggestion_author_short" defaultMessage={"Suggested by"} />
                            <span className={styles.authorName}>{debate.group_context.author.full_name}</span>
                        </span>
                    </div>
                }
            </div>
            <div className={styles.debateBoxBody}>
                <div className={styles.debateBoxTitle} title={name.translatedContent}>
                    <Link to={routes.debateShowLocation.toUrl({ debateSlug: debate.slug })}>
                        <>
                            {isMobile ?
                                <div data-tid={"view_debate_title"} className={cx(styles.debateTitle, styles.debateTitleMobile)}>
                                    {name.translatedContent}
                                </div>
                                :
                                <div data-tid={"view_debate_title"} className={styles.debateTitle}>
                                    {name.translatedContent}
                                </div>
                            }
                        </>
                    </Link>
                </div>
                <div className={styles.debateBoxFooter}>
                    <div className={styles.debateParticipantsBox}>
                        {debate.participants.length === 0 ? (
                            <span className={styles.debateParticipantsEmpty}>{intl.formatMessage({ id: "debate.debate_box.fallback_no_participants", defaultMessage: "No participants" })}</span>
                        ) : (
                            <>
                                {debate.participants.map(displayParticipant)}
                                {debate.participants_count > 3 &&
                                    <div className={styles.debateParticipantItem}>
                                        <Link to={routes.debateShowLocation.toUrl({ debateSlug: debate.slug })}>
                                            <div className={styles.participantsCountBox}>
                                                +{intl.formatNumber(debate.participants_count - 3, { notation: 'compact', maximumFractionDigits: 1, roundingMode: "floor" })}
                                            </div>
                                        </Link>
                                    </div>
                                }
                            </>
                        )}
                    </div>
                    {config.modules.votes === false ?
                        null
                        :
                        <div className={styles.debateBoxNumbers}>
                            <div className={styles.debateBoxNumbersText}>
                                {winningPosition && (
                                    <>
                                        {getPercentageValue(winningPosition.count, totalVotes)} %{" "}
                                        <TranslatedContent
                                            originalContent={winningPosition.name}
                                            originalLanguage={winningPosition.language}
                                            targetField={"name"}
                                            translations={winningPosition.translation_entries}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

DebateBox.propTypes = {
    /** Debate object containing all the debate information */
    debate: PropTypes.object.isRequired,
};