import React, { useState, useEffect } from "react";
import { useDataProvider, useData } from '@logora/debate.data.data_provider';
import { useResponsive } from "@logora/debate.hooks.use_responsive";
import { useIntl } from "react-intl";
import { useLocation } from 'react-router';
import { useList } from "@logora/debate.list.list_provider";
import { ActionBar } from './action_bar/ActionBar';
import { Pagination } from '@logora/debate.list.pagination';
import { uniqueBy } from '@logora/debate.util.unique_by';
import StandardErrorBoundary from '@logora/debate.error.standard_error_boundary';
import usePrevious from "@rooks/use-previous";
import cx from "classnames";
import styles from "./PaginatedList.module.scss";
import PropTypes from "prop-types";

export const PaginatedList = ({
    query,
    sortOptions,
    sort,
    filters,
    tagList,
    currentPage,
    resource,
    currentListId,
    withToken,
    perPage,
    perPageParam = "per_page",
    pageParam = "page",
    sortParam = "sort",
    queryParam = "query",
    tagParam = "tag_id",
    totalHeaderParam = "total",
    onUpdateTotal,
    onElementsLoad,
    transformData,
    uniqueIdKey = "id",
    children,
    resourcePropName,
    loadingComponent,
    searchBar = false,
    title,
    emptyListComponent,
    emptyText,
    display,
    elementsPerLine,
    indexLayout = false,
    gap = "1em",
    withPagination = true,
    numberElements,
    countless,
    onElementClick,
    withUrlParams = false,
    onLoadNewPage
}) => {
    const intl = useIntl();
    const list = useList();
    const api = useDataProvider();
    const location = useLocation();
    const { isMobile, isTablet, isDesktop } = useResponsive();
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState(false);
    const [currentResources, setCurrentResources] = useData(currentListId, []);
    const [totalElements, setTotalElements] = useState(currentResources?.length || 0);
    const [page, setPage] = useState(currentPage || 1);
    const [currentQuery, setCurrentQuery] = useState(query || null);
    const [activeTagId, setActiveTagId] = useState(null);
    const [defaultSelectOption, setDefaultSelectOption] = useState(null);
    const urlParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : location.search);

    const getInitSort = () => {
        return (sortOptions && sortOptions[0].type === "sort" && sortOptions[0].value) || sort || "";
    };

    const getInitFilters = () => {
        let initFilters = {};
        if (sortOptions && sortOptions[0].type === "filter") {
            initFilters[sortOptions[0].name] = sortOptions[0].value;
        }
        if (filters) {
            initFilters = Object.assign({}, initFilters, filters);
        }
        return initFilters;
    }

    const [currentSort, setCurrentSort] = useState(getInitSort());
    const [currentFilters, setCurrentFilters] = useState(getInitFilters());
    const previousFilters = usePrevious(filters);

    if (currentPage && (currentPage !== page)) {
        setPage(currentPage);
    }
    if (query !== undefined && (query !== currentQuery)) {
        setCurrentQuery(query);
    }
    if (sort !== undefined && (sort !== currentSort)) {
        setCurrentSort(sort);
    }
    if (previousFilters && (JSON.stringify(filters) !== JSON.stringify(previousFilters)) && (JSON.stringify(filters) !== JSON.stringify(currentFilters))) {
        setCurrentFilters(filters);
    }

    useEffect(() => {
        if (urlParams.get('tagId')) {
            setActiveTagId(Number.parseInt(urlParams.get('tagId')));
        }
        if (urlParams.get('search')) {
            setCurrentQuery(urlParams.get('search'));
        }
        if (urlParams.get('sort')) {
            setCurrentSort(urlParams.get('sort'));
            for (const value of urlParams.values()) {
                sortOptions?.map((o) => {
                    if (o.value === value) {
                        setDefaultSelectOption(o.name);
                    }
                });
                break;
            }
        }
        for (const key of urlParams.keys()) {
            sortOptions?.map((o) => {
                if (o.name === key) {
                    setCurrentFilters({
                        ...filters,
                        [o.name]: o.value,
                    });
                    setDefaultSelectOption(o.name);
                }
            });
            break;
        }
    }, [location.search]);

    useEffect(() => {
        if (resource) {
            setPage(1);
            setCurrentResources([]);
            setIsLoading(true);
            loadResources(1);
        } else {
            setIsLoading(false);
        }
    }, [currentSort, currentFilters, currentQuery, resource, activeTagId, perPage]);

    useEffect(() => {
        if (page > 1) {
            setIsLoading(true);
            loadResources(page);
        }
    }, [page]);

    useEffect(() => {
        if (list.addElements && (currentListId in list.addElements)) {
            if (list.addElements[currentListId].length > 0) {
                handleAddElements(list.addElements[currentListId]);
                const addElements = list.addElements;
                delete addElements[currentListId];
                list.setAddElements(addElements);
            }
        }
    }, [list.addElements]);

    useEffect(() => {
        if (list.updateElements && (currentListId in list.updateElements)) {
            if (list.updateElements[currentListId].length > 0) {
                handleEditElements(list.updateElements[currentListId]);
                const updateElements = list.updateElements;
                delete updateElements[currentListId];
                list.setUpdateElements(updateElements);
            }
        }
    }, [list.updateElements]);

    useEffect(() => {
        if (list.removeElements && (currentListId in list.removeElements)) {
            if (list.removeElements[currentListId].length > 0) {
                handleRemoveElements(list.removeElements[currentListId]);
                const removeElements = list.removeElements;
                delete removeElements[currentListId];
                list.setRemoveElements(removeElements);
            }
        }
    }, [list.removeElements]);

    const handleSortChange = (selectOption) => {
        if (selectOption.type === "filter") {
            setCurrentSort("");
            setCurrentFilters({
                ...filters,
                [selectOption.name]: selectOption.value,
            });
        } else {
            // If filters is present, we want it to be persistent with the sort option
            setCurrentSort(selectOption.value);
            setCurrentFilters(filters ? { ...filters } : {});
        }
    }

    const handleLoadNewPage = () => {
        if (typeof onLoadNewPage === 'function' && onLoadNewPage() !== null) {
        } else {
            setPage(page + 1);
        }
    }

    const loadResources = (pageNumber) => {
        const loadFunction = withToken ? api.getListWithToken : api.getList;
        if (((pageNumber - 1) * perPage <= (numberElements || totalElements)) || pageNumber === 1) {
            const params = {
                [pageParam]: pageNumber,
                [perPageParam]: perPage,
                ...(currentSort && !currentQuery && { [sortParam]: currentSort }),
                ...(currentQuery && { [queryParam]: currentQuery }),
                ...(countless === true && { countless: true }),
                ...currentFilters,
                ...(activeTagId && { [tagParam]: activeTagId })
            }
            loadFunction(resource, params).then((response) => {
                const headers = response.headers;
                if (headers) {
                    if (totalHeaderParam in headers) {
                        setTotalElements(Number.parseInt(headers[totalHeaderParam || "total"], 10));
                        if (onUpdateTotal) {
                            onUpdateTotal(headers[totalHeaderParam || "total"]);
                        }
                    }
                }

                let newElements = response?.data?.data;
                if (onElementsLoad) {
                    onElementsLoad(newElements);
                }
                if (transformData) {
                    newElements = newElements.filter(transformData);
                }
                if (list.addElements && (currentListId in list.addElements) && list.addElements[currentListId].length > 0) {
                    newElements = [...list.addElements[currentListId], newElements];
                }
                addElements(newElements);
                setIsLoading(false);
            }).catch((error) => {
                console.error(error);
                if (!(error?.response?.status === 404)) {
                    setLoadError(true);
                }
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }

    const handleAddElements = (elements) => {
        setCurrentResources(prevElements => uniqueBy([...elements, ...prevElements], uniqueIdKey || "id"));
        if (onElementsLoad) {
            onElementsLoad(elements);
        }
    }

    const handleEditElements = (elements) => {
        let newElements = currentResources;
        elements.forEach(element =>
            newElements = newElements.map((a) => (a.id === element.id ? element : a))
        );
        setCurrentResources(uniqueBy(newElements, uniqueIdKey || "id"));
    }

    const handleRemoveElements = (elements) => {
        const removedElementsIds = elements.map(elm => elm.id);
        const newElements = currentResources.filter(elm => removedElementsIds.indexOf(elm.id) === -1);
        setCurrentResources(uniqueBy(newElements, uniqueIdKey || "id"));
    }

    const addElements = (newElements) => {
        setCurrentResources(prevElements => uniqueBy([...prevElements, ...newElements], uniqueIdKey || "id"));
    }

    const displayResource = (resource, index) => {
        if (resource !== undefined) {
            return (
                <li className={styles.paginatedListItem} data-testid={"list-item"} key={resource[uniqueIdKey || "id"]} onClick={onElementClick}>
                    <StandardErrorBoundary hideMessage={true}>
                        {React.cloneElement(children, { ...{ index: index, [resourcePropName]: resource } })}
                    </StandardErrorBoundary>
                </li>
            );
        }
        return null;
    }

    const displayLoadingComponent = (index) => {
        if (loadingComponent) {
            return (
                <li className={styles.paginatedListItem} key={index}>
                    {loadingComponent}
                </li>
            );
        }
        return null;
    }

    if (loadError) {
        throw new Error(intl.formatMessage({ id: "error.list", defaultMessage: "Error when loading content." }));
    }

    return (
        <div className={styles.listContainer}>
            <ActionBar
                title={title}
                sortOptions={sortOptions}
                defaultSelectOption={defaultSelectOption}
                searchBar={searchBar}
                tagList={tagList}
                activeTagId={activeTagId}
                onSearch={(query) => setCurrentQuery(query)}
                onSortChange={handleSortChange}
                onTagChange={(tagId) => setActiveTagId(tagId)}
                withUrlParams={withUrlParams}
            />
            {!isLoading && currentResources.length === 0 ? (
                emptyListComponent ?
                    <div className={styles.emptyListElement}>
                        {emptyListComponent}
                    </div>
                    :
                    <div className={styles.emptyList}>
                        {emptyText ? emptyText : intl.formatMessage({ id: "info.emptyList", defaultMessage: "No items for now." })}
                    </div>
            ) :
                <>
                    <ul className={cx(styles.paginatedList, { [styles.paginatedListIsTablet]: !isMobile && !isDesktop, [styles.centeredList]: display === "column", [styles.column]: display === "column", [styles.twoElementsPerLine]: elementsPerLine === 2, [styles.oneElementPerLine]: elementsPerLine === 1, [styles.indexLayoutList]: indexLayout, [styles.listIsDesktop]: isDesktop, [styles.listIsTablet]: isTablet && !isDesktop, [styles.listIsMobile]: isMobile })} style={{ gap: gap }}>
                        {currentResources.map(displayResource)}
                        {/* Show loading components directly in list when loading more elements */}
                        {isLoading ?
                            Array(perPage).fill().map((v, i) => i).map(displayLoadingComponent)
                            :
                            null
                        }
                    </ul>
                    {/* Show pagination button when content is loaded */}
                    {(!isLoading && withPagination !== false) && (
                        <Pagination
                            buttonText={intl.formatMessage({ id: "action.see_more", defaultMessage: "See more" })}
                            currentPage={page}
                            perPage={perPage}
                            totalElements={numberElements || totalElements}
                            onLoad={handleLoadNewPage}
                            isLoading={isLoading}
                            hideLoader={true}
                            data-tid={"list_read_more"}
                        />
                    )}
                </>
            }
        </div>
    )
};

PaginatedList.propTypes = {
    resource: PropTypes.string,
    query: PropTypes.string,
    sortOptions: PropTypes.any,
    sort: PropTypes.string,
    filters: PropTypes.object,
    currentPage: PropTypes.number,
    currentListId: PropTypes.string,
    withToken: PropTypes.bool,
    perPage: PropTypes.number,
    perPageParam: PropTypes.string,
    pageParam: PropTypes.string,
    sortParam: PropTypes.string,
    queryParam: PropTypes.string,
    tagParam: PropTypes.string,
    totalHeaderParam: PropTypes.string,
    onUpdateTotal: PropTypes.func,
    onElementsLoad: PropTypes.func,
    onElementClick: PropTypes.func,
    transformData: PropTypes.func,
    uniqueIdKey: PropTypes.string,
    resourcePropName: PropTypes.string,
    loadingComponent: PropTypes.node,
    searchBar: PropTypes.bool,
    title: PropTypes.node,
    tagList: PropTypes.array,
    emptyListComponent: PropTypes.node,
    emptyText: PropTypes.string,
    display: PropTypes.string,
    elementsPerLine: PropTypes.number,
    indexLayout: PropTypes.bool,
    gap: PropTypes.string,
    withPagination: PropTypes.bool,
    numberElements: PropTypes.number,
    countless: PropTypes.bool,
    withUrlParams: PropTypes.bool,
    onLoad: PropTypes.func,
    onLoadNewPage: PropTypes.func
};