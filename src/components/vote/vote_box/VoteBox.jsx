import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { useLocation } from 'react-router';
import { useRoutes, useConfig } from '@logora/debate.data.config_provider';
import { useDataProvider } from '@logora/debate.data.data_provider';
import { useAuth } from "@logora/debate.auth.use_auth";
import { useIntl, FormattedMessage } from 'react-intl';
import { useAuthRequired } from '@logora/debate.hooks.use_auth_required';
import { useToast } from '@logora/debate.dialog.toast_provider';
import useSessionStorageState from '@rooks/use-sessionstorage-state';
import { useTranslatedContent } from '@logora/debate.translation.translated_content';
import { Link } from '@logora/debate.action.link';
import { ProgressBar } from "@logora/debate.progress.progress_bar";
import { Icon } from '@logora/debate.icons.icon';
import { Button } from '@logora/debate.action.button';
import cx from 'classnames';
import styles from './VoteBox.module.scss';

export const VoteBox = ({ numberVotes, votePositions, voteableType, voteableId, redirectUrl, displayColumn, textAlignLeft, voteBoxClassName, buttonContainerClassName, buttonClassName, showResultClassName, onVote, disabled }) => {
    const [isLoadingVote, setIsLoadingVote] = useState(true);
    const [currentVote, setCurrentVote] = useState(undefined);
    const [showResults, setShowResults] = useState(false);
    const [totalVotes, setTotalVotes] = useState(parseFloat(numberVotes.total) || Object.values(numberVotes).reduce((sum,value)=> sum + parseFloat(value), 0) || 0);
    const firstPosition = useTranslatedContent(votePositions[0]?.name, votePositions[0]?.language, "name", votePositions[0]?.translation_entries);
    const secondPosition = useTranslatedContent(votePositions[1]?.name, votePositions[1]?.language, "name", votePositions[1]?.translation_entries);
    const neutralPosition = useTranslatedContent(votePositions[2]?.name, votePositions[2]?.language, "name", votePositions[2]?.translation_entries);
    const [savedVote, setSavedVote, removeSavedVote] = useSessionStorageState("storedUserVote", {});
    const [savedUserSide, setSavedUserSide, removeSavedUserSide] = useSessionStorageState("userSide", {});
    const { toast } = useToast() || {};

    const initVotesCount = () => {
        const votesCountObj = {};
        votePositions && votePositions.forEach(position => 
            votesCountObj[position.id] = {
                count: parseFloat(numberVotes[position.id]) || 0, 
                percentage: totalVotes === 0 ? 0 : Math.round(100 * ((numberVotes[position.id] || 0) / (totalVotes)))
            }
        );

        return votesCountObj;
    }
    const [votesCount, setVotesCount] = useState(initVotesCount());

    const requireAuthentication = useAuthRequired();
    const location = useLocation();
    const api = useDataProvider();
    const routes = useRoutes();
    const config = useConfig();
    const intl = useIntl();
    const { isLoggedIn, isLoggingIn } = useAuth();

    useEffect(() => {
        if (isLoggingIn === false) {
            if (isLoggedIn) { 
                getVote(voteableId);
            } else {
                setIsLoadingVote(false);
            }
        }
    }, [isLoggingIn, isLoggedIn])

    useEffect(() => {
        if (isLoadingVote === false && !redirectUrl) {
            const [initVote, positionId] = getStoredVote();
            if (initVote) {
                if (!positionId) { 
                    setShowResults(true); 
                } else {
                    handleVote(positionId);
                }
            }
        }
    }, [isLoadingVote])

    useEffect(() => {
        if(onVote) {
            onVote(currentVote);
        }
    }, [currentVote])

    const getStoredVote = () => {
        if (savedVote && Object.keys(savedVote).length !== 0) {
            return [true, savedVote.positionId]
        } else {
            const urlParams = new URLSearchParams(location.search);
            const initVote = Boolean(urlParams.get('initVote'));
            const positionId = parseInt(urlParams.get('positionId')) || false;
            return [initVote, positionId];
        }
    }

    const getVote = (debateId) => {
        setIsLoadingVote(true);
        if(onVote) {
            onVote(currentVote);
        }
        api.getOneWithToken("votes", `${voteableType.toLowerCase()}/${debateId}`, {}).then(response => {
            if (response.data.data.resource) {
                setCurrentVote(response.data.data.resource);
                setShowResults(true);
                setIsLoadingVote(false);
            } else {
                setIsLoadingVote(false);
                setShowResults(false);
            }
        }).catch(error => {
            setIsLoadingVote(false);
        });
    }

    const getPercentageValue = (voteCount, totalVotes) => {
        return totalVotes === 0 ? 0 : Math.round(100 * (voteCount / (totalVotes)));
    }
    
    const voteAction = (positionId) => {
        const data = {
            voteable_id: voteableId,
            voteable_type: voteableType || 'Group',
            position_id: positionId
        }
        const userSideToSave = {
            groupId: voteableId,
            voteableType: voteableType,
            positionId: positionId
        }
        setSavedUserSide(userSideToSave);
        if (currentVote) {
            updateVote(positionId, currentVote.position_id);
            showResults === false && toggleResults();
            if (positionId !==  currentVote.position_id) {
                api.update("votes", currentVote.id, data).then(response => {
                    if(response.data.success) {
                        setCurrentVote(response.data.data.resource);
                        toast(intl.formatMessage({ id: "header.vote_confirm_modal", defaultMessage: "Your vote has been saved !" }), { type: "success" });
                    }
                });
            }
        } else {
            addVote(positionId);
            toggleResults();
            api.create("votes", data).then(response => {
                if(response.data.success) {
                    setCurrentVote(response.data.data.resource);
                    toast(intl.formatMessage({ id: "header.vote_confirm_modal", defaultMessage: "Your vote has been saved !"  }), { type: "success", points: 1 });
                }
            });
        }
    }

    const addVote = (positionId) => {
        const newCount = votesCount[positionId].count + 1;
        const newTotal = totalVotes + 1;
        const newVotesCount = {};
        votePositions.forEach((element) => {
            if(positionId === element.id) {
                newVotesCount[element.id] = { count: newCount, percentage: getPercentageValue(newCount, newTotal) };
            } else {
                const newElementCount = votesCount[element.id].count;
                newVotesCount[element.id] = { count: newElementCount, percentage: getPercentageValue(newElementCount, newTotal) };
            }
        });
        setVotesCount(newVotesCount);
        setTotalVotes(newTotal);
    }

    const updateVote = (newPosition, previousPosition) => {
        if (previousPosition !== newPosition){
            const newVotesCount = {
                ...votesCount,
                [previousPosition]: { count: votesCount[previousPosition].count - 1,
                    percentage: getPercentageValue(votesCount[previousPosition].count - 1, totalVotes) },
                [newPosition]: { count: votesCount[newPosition].count + 1,
                    percentage: getPercentageValue(votesCount[newPosition].count + 1, totalVotes) }
            }
            setVotesCount(newVotesCount);
        }
    }

    const getRedirectUrl = (positionId) => {
         let searchParams = new URLSearchParams({
            initVote: "true",
            ...(positionId && { positionId: positionId })
        });
        return redirectUrl + `?${searchParams.toString()}`;
    }

    const handleVote = (positionId) => {
        if (isLoggedIn) {
            if (Object.keys(votesCount).includes(positionId.toString())) {
                voteAction(positionId);
                removeSavedVote();
            }
        } else {
            if (Object.keys(votesCount).includes(positionId.toString())) {
                const voteToSave = {
                    groupId: voteableId,
                    voteableType: voteableType,
                    positionId: positionId
                }
                setSavedVote(voteToSave);
            }
            requireAuthentication({ loginAction: "vote" });
        }
    }

    const toggleResults = () => {
        if (showResults) { removeSavedUserSide(); }
        setShowResults(!showResults);
    }

    const displayVotePosition = (position, index) => {
        let currentPositionName;
        if (index === 0) { currentPositionName = firstPosition.translatedContent }
        else if (index === 1) { currentPositionName = secondPosition.translatedContent }
        else if (index === 2) { currentPositionName = neutralPosition.translatedContent }

        const isButton = (typeof window !== "undefined" && !redirectUrl);

        return (
            <div key={index} className={cx(styles.voteAction, {[styles.buttonAlignLeft]: styles.buttonAlignLeft})}>
                <Button
                    data-tid={"action_vote"} 
                    type="button"
                    title={currentPositionName}
                    className={cx(styles.voteButton, {[styles.textAlignLeft]: textAlignLeft, [buttonClassName]: buttonClassName})}
                    onClick={isButton ? (() => handleVote(position.id)) : null}
                    disabled={disabled}
                    data-testid={"voteButton"}
                    to={isButton ? null : getRedirectUrl(position.id)}
                    target={isButton ? null : "_top"}
                    rel={isButton ? null : "nofollow"}
                    external={isButton ? null : true}
                >
                    <div data-tid={"action_vote"} className={cx(styles.voteButtonThesis, {[styles.voteButtonThesisSynthesisMobile]: !displayColumn })}>{currentPositionName}</div>
                </Button>
            </div>
        );
    }

    const handleShowResults = () => {
        if (isLoggedIn || config.actions?.unloggedVoteResults === true) {
            setShowResults(true);
        } else {
            requireAuthentication({ loginAction: "vote" });
        }
    }

    return (
        <div className={cx(styles.voteBox, { [voteBoxClassName]: voteBoxClassName } )} >
            <>
                { showResults || disabled ? (
                    <div className={styles.voteResultsBox} data-testid={"voteResultsBox"}>
                        <div className={styles.voteResults}>
                            {
                                votePositions.map((value, index) => {
                                    let currentPositionName;
                                    if (index === 0) { currentPositionName = firstPosition.translatedContent }
                                    else if (index === 1) { currentPositionName = secondPosition.translatedContent }
                                    else if (index === 2) { currentPositionName = neutralPosition.translatedContent }
                                    return (
                                        <div key={index}>
                                            <div className={index > 0 ? cx(styles.voteProgressHeader, styles.voteProgressHeaderAgainst) : styles.voteProgressHeader}>
                                                { currentPositionName } {( currentVote && currentVote.position_id === value.id) ? <span title={intl.formatMessage({ id:"vote.vote_box.vote_side" }) + currentPositionName } className={styles.sideIcon}><Icon name="checkbox" width={16} height={16} /></span> : null}
                                            </div>
                                            <ProgressBar 
                                                progress={votesCount[value.id].percentage / 100} 
                                                goal={1} 
                                                className={styles.progress} 
                                                innerClassName={styles.progressBar} 
                                            >
                                                { votesCount[value.id].percentage }%
                                            </ProgressBar>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className={styles.voteBoxFooter}>
                            <div className={styles.voteResultsNumberVoters}>
                                <FormattedMessage id="vote.vote_box.votes" values={{ votesCount: totalVotes }} defaultMessage="{votesCount} votes" />
                            </div>
                            {!disabled &&
                                <div>
                                    { currentVote ?
                                        <button data-tid={"action_edit_vote"} className={styles.changeVoteButton} type="button" onClick={toggleResults}>
                                            <FormattedMessage id="vote.vote_box.update" defaultMessage="Modify" />
                                        </button>
                                    :
                                        <div className={styles.backToVote} onClick={() => setShowResults(false)}>
                                            <FormattedMessage id="vote.vote_box.back" defaultMessage="Back to vote" />
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                ) : (
                    <div className={styles.voteBoxActions}>
                        <div className={cx(styles.voteBoxActionsBody, { [styles.voteBoxActionsBodyColumn]: displayColumn, [buttonContainerClassName]: buttonContainerClassName})}>
                            {votePositions.map((value, index) => displayVotePosition(value, index))}
                        </div>
                        <div className={cx(styles.voteBoxActions, styles.voteBoxShowResultContainer, {[showResultClassName]: showResultClassName})}>
                            <div className={styles.voteBoxShowResult}>
                                {typeof window !== "undefined" && !redirectUrl ?
                                    <div onClick={() => handleShowResults()} data-tid="show_vote_result" data-testid={"show-result"}>
                                        <span><FormattedMessage id="vote.vote_box.votes" values={{ votesCount: totalVotes }} defaultMessage="{votesCount} votes" /> – <span className={styles.boldShowResult}><FormattedMessage id="vote.vote_box.show_result" defaultMessage="Show result" /></span></span>
                                    </div>
                                :
                                    <Link to={getRedirectUrl(null)} rel="nofollow" data-tid="show_vote_result" target="_top" external data-testid={"show-result"}>
                                        <span><FormattedMessage id="vote.vote_box.votes" values={{ votesCount: totalVotes }} defaultMessage="{votesCount} votes" /> – <span className={styles.boldShowResult}><FormattedMessage id="vote.vote_box.show_result" defaultMessage="Show result" /></span></span>
                                    </Link>
                                }
                            </div> 
                        </div>
                    </div>
                )} 
            </>
        </div>
    )
}

VoteBox.propTypes = {
    /** Array containing the debate positions */
    votePositions: PropTypes.array.isRequired,
    /** Type of vote */
    voteableType: PropTypes.string,
    /** The id of the element */
    voteableId: PropTypes.number.isRequired,
    /** Object containing all the votes and the total */
    numberVotes: PropTypes.object.isRequired,
    /** The redirect url after voting */
    redirectUrl: PropTypes.string,
    /** If true, activate the column layout */
    displayColumn: PropTypes.bool,
    /** If true, display buttons in full width*/
    textAlignLeft: PropTypes.bool,
    /** CSS class name of the vote box  */
    voteBoxClassName: PropTypes.string,
    /** CSS class name of the button container */
    buttonContainerClassName: PropTypes.string,
    /** CSS class name of the button */
    buttonClassName: PropTypes.string,
    /** CSS class name of the show result text */
    showResultClassName: PropTypes.string,
    /** Callback function */
    onVote: PropTypes.func,
    /** Disabled vote buttons and show result */
    disabled: PropTypes.bool,
};