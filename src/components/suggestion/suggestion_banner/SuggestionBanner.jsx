import React, { useMemo, useState } from "react";
import { useResponsive } from "@logora/debate.hooks.use_responsive";
import { useRoutes } from '@logora/debate.data.config_provider';
import { useIntl } from 'react-intl';
import { Button } from '@logora/debate.action.button';
import { VotePaginatedList } from "@logora/debate.list.paginated_list";
import { Icon } from "@logora/debate.icons.icon";
import { FormattedMessage } from "react-intl";
import { UserContentSkeleton } from '@logora/debate.skeleton.user_content_skeleton';
import { SuggestionBox } from '@logora/debate.suggestion.suggestion_box';
import { useList } from "@logora/debate.list.list_provider";
import cx from 'classnames';
import styles from "./SuggestionBanner.module.scss";

export const SuggestionBanner = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const list = useList();
    const seed = useMemo(() => Math.random(), []);
    const routes = useRoutes();
    const intl = useIntl();
    const { isMobile } = useResponsive();

    const handleVoteCallback = (suggestion) => {
        list.remove("bannerSuggestionsList", [suggestion]);
        if (currentPage + 1 < maxPage) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className={styles.suggestionBannerContainer}>
            <div className={cx(styles.suggestionBannerContext, { [styles.isMobile]: isMobile })}>
                <div className={styles.suggestionBannerTitle}>
                    <FormattedMessage id="suggestion.banner_title" defaultMessage="Suggest a debate question" />
                </div>
                <div className={styles.suggestionBannerDescription}>
                    <FormattedMessage
                        id="suggestion.banner_description"
                        defaultMessage="Propose your own debate question and vote for your favourite. Questions that generate community interest are submitted to the editorial team."
                    />
                </div>
                <Button
                    to={routes.suggestionLocation.toUrl()}
                    data-tid={"action_suggestions_banner"}
                    className={cx(styles.suggestionBannerButton, { [styles.isMobile]: isMobile })}
                    rightIcon={<Icon name="lightArrow" width={10} height={10} />}
                >
                    <span><FormattedMessage id="suggestion.suggest" defaultMessage="Suggest" /></span>
                </Button>
            </div>
            <div className={styles.suggestionBannerList}>
                <VotePaginatedList
                    voteableType={"DebateSuggestion"}
                    currentListId={"bannerSuggestionsList"}
                    resource={"groups"}
                    resourcePropName="suggestion"
                    filters={{ "is_expired": false, "is_accepted": false, "status": "accepted", "is_admin": false, "random": seed }}
                    perPage={1}
                    withPagination={false}
                    searchBar={false}
                    currentPage={currentPage}
                    display={"column"}
                    onUpdateTotal={(total) => setMaxPage(total)}
                    loadingComponent={<UserContentSkeleton />}
                    emptyListComponent={
                        <UserContentSkeleton border enableAnimation={false} numberLines={3}>
                            <Button data-tid={"action_add_suggestion"} to={routes.suggestionLocation.toUrl()}>
                                {intl.formatMessage({ id: "suggestion.suggestion_blank_box.add_suggestion", defaultMessage: "Add suggestion" })}
                            </Button>
                        </UserContentSkeleton>
                    }
                >
                    <SuggestionBox onVoteCallback={handleVoteCallback} />
                </VotePaginatedList>
            </div>
        </div>
    )
}
