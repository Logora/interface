import React from "react";
import { Select } from '@logora/debate.input.select';
import { SearchInput } from "@logora/debate.input.search_input";
import { Tag } from '@logora/debate.tag.tag';
import { Icon } from '@logora/debate.icons.icon';
import { useIntl } from "react-intl";
import { useResponsive } from "@logora/debate.hooks.use_responsive";
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import cx from "classnames";
import styles from "./ActionBar.module.scss";
import PropTypes from "prop-types";

export const ActionBar = ({ title, sortOptions, defaultSelectOption, searchBar = false, tagList, activeTagId, withUrlParams = false, onSearch, onSortChange, onTagChange }) => {
    const intl = useIntl();
    const history = useHistory();
    const location = useLocation();
    const { isMobile } = useResponsive();
    const urlParams = new URLSearchParams(window !== "undefined" ? window.location.search : location.search);

    const handleSortChange = (selectOption) => {
        if (withUrlParams) {
            for (const key of urlParams.keys()) {
                sortOptions.map((o) => {
                    if (o.name === key) {
                        urlParams.delete(key);
                    }
                })
            }
            urlParams.delete("sort");
            urlParams.set(selectOption.type === "filter" ? selectOption.name : "sort", selectOption.value);
            history.push({
                pathname: location.pathname,
                search: urlParams.toString()
            });
        }
        onSortChange(selectOption)
    };

    const handleActiveTag = (tag) => {
        if (withUrlParams) {
            if (tag.id == activeTagId) {
                urlParams.delete("tagId");
            } else {
                urlParams.set("tagId", tag.id);
            }
            history.push({
                pathname: location.pathname,
                search: urlParams.toString()
            })
        }
        onTagChange(tag.id == activeTagId ? null : tag.id)
    }

    const handleSearch = (query) => {
        if (withUrlParams) {
            if (!query) {
                urlParams.delete("search");
            } else {
                urlParams.set("search", query);
            }
            history.push({
                pathname: location.pathname,
                search: urlParams.toString()
            })
        }
        onSearch(query);
    }

    const displayTags = (tag) => {
        const tagIsActive = activeTagId === tag.id;
        
        return (
            <div className={styles.tagItem} key={tag.id} onClick={() => handleActiveTag(tag)}>
                <Tag text={tag.display_name} active={tagIsActive} rightIcon={<Icon name="close" height={10} width={10} />} />
            </div>
        );
    }

    return (
        <>
            {(title || sortOptions || searchBar) && (
                <>
                    <div className={cx(styles.listHeader, { [styles.listHeaderOneItem]: (!searchBar || !sortOptions) })}>
                        {title &&
                            <div className={styles.listTitle}>{title}</div>
                        }
                        {(sortOptions || searchBar) &&
                            <div className={cx(styles.rightBar, { [styles.rightBarOneItem]: (!searchBar || !sortOptions) })}>
                                {searchBar ? (
                                    <div className={styles.search}>
                                        <SearchInput
                                            onSearchSubmit={handleSearch}
                                            placeholder={intl.formatMessage({ id: "info.search_mobile", defaultMessage: "Search" })}
                                            reducedByDefault={isMobile}
                                        />
                                    </div>
                                ) : null}
                                {sortOptions ? (
                                    <Select
                                        onChange={handleSortChange}
                                        options={sortOptions}
                                        defaultOption={defaultSelectOption}
                                        horizontalPosition={"right"}
                                        className={styles.select}
                                    />
                                ) : null}
                            </div>
                        }
                    </div>
                    {tagList && tagList.length > 0 &&
                        <div className={styles.tagList}>
                            {tagList.map(displayTags)}
                        </div>
                    }
                </>
            )}
        </>
    )
}

ActionBar.propTypes = {
    /** The title of the list */
    title: PropTypes.node,
    /** An array of sort options to be displayed in a dropdown */
    sortOptions: PropTypes.any,
    /** Current selected option in filters */
    defaultSelectOption: PropTypes.string,
    /** If true, activate the search bar */
    searchBar: PropTypes.bool,
    /** A list of tags to filter the list */
    tagList: PropTypes.array,
    /** Current active tag id */
    activeTagId: PropTypes.number,
    /** Activate url params */
    withUrlParams: PropTypes.bool,
    /** Search callback */
    onSearch: PropTypes.func,
    /** Sort change callback */
    onSortChange: PropTypes.func,
    /** Tag change callback */
    onTagChange: PropTypes.func
};
