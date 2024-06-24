import React from 'react';
import PropTypes from "prop-types";
import styles from './TopArguments.module.scss';
import { useConfig } from '@logora/debate.data.config_provider';
import { useResponsive } from "@logora/debate.hooks.use_responsive";
import { useTranslatedContent } from '@logora/debate.translation.translated_content';
import { SummaryContentBox } from '@logora/debate.user_content.summary_content_box';
import { UserContentSkeleton } from '@logora/debate.skeleton.user_content_skeleton';
import { Button } from '@logora/debate.action.button';
import { FormattedMessage } from 'react-intl';

export const TopArguments = ({ argumentFor, argumentAgainst, debateUrl, argumentCount, debate }) =>  {
    const config = useConfig();
    const { isMobile } = useResponsive();
    const positionForName = useTranslatedContent(argumentFor?.position.name, argumentFor?.position.language, "name", argumentFor?.position.translation_entries);
    const positionAgainstName = useTranslatedContent(argumentAgainst?.position.name, argumentAgainst?.position.language, "name", argumentAgainst?.position.translation_entries);

    const getTopArgument = () => {
        if(argumentFor && argumentAgainst) {
            return argumentFor.score > argumentAgainst.score ? argumentFor : argumentAgainst;
        } else {
            return argumentFor || argumentAgainst || false;
        }
    }

    const topArgument = getTopArgument();

    const displayArgument = (argument, positionIndex, compact) => {
        return (
            <>
                { argument ?
                    <SummaryContentBox 
                        author={argument.author}
                        tag={positionIndex === 0 ? positionForName.translatedContent : positionAgainstName.translatedContent} 
                        date={new Date(argument.created_at)}
                        link={debateUrl + "#argument_" + argument.id} 
                        content={argument.content}
                        tagClassName={styles[`positionBackground-${positionIndex}`]}
                        contentCount={argumentCount[positionIndex]} 
                        headerOneLine={compact}
                        showFooter={!compact}
                        language={argument.language}
                        translationEntries={argument.translation_entries}
                    />
                :
                    <UserContentSkeleton enableAnimation={false} border tag={positionIndex === 0 ? positionForName.translatedContent : positionAgainstName.translatedContent} tagClassName={styles[`positionBackground-${positionIndex}`]}>
                        <Button to={debateUrl} external data-tid={"action_add_argument"} target={"_top"}>
                            <FormattedMessage id="argument.top_arguments.call_to_action" defaultMessage={"Add an argument"} />
                        </Button>
                    </UserContentSkeleton>
                }
            </>
        );
    }

    return (
        <>
            { config.synthesis.newDesign === true || (isMobile && config.synthesis.onlyShowTopArgument === true) ? 
                <div className={styles.topArgumentsUnique}>
                    <div className={styles.topArgument}>
                        { displayArgument(topArgument, topArgument === argumentAgainst ? 1 : 0, true) }
                    </div>
                </div>
            :
                <div className={styles.topArguments}>
                    <div className={styles.topArgument}>
                        { displayArgument(argumentFor, 0, false) }
                    </div>
                    <div className={styles.topArgument}>
                        { displayArgument(argumentAgainst, 1, false) }
                    </div>
                </div>
            }
        </>
    )
};

TopArguments.propTypes = {
    /** Object representing the argument that supports the first thesis */
    argumentFor: PropTypes.object,
    /** Object representing the argument that supports the second thesis */
    argumentAgainst: PropTypes.object,
    /** URL of the debate */
    debateUrl: PropTypes.string.isRequired,
    /** Array containing the count of arguments for each position in the debate */
    argumentCount: PropTypes.array.isRequired,
    /** Object containing information about the debate */
    debate: PropTypes.object.isRequired
};