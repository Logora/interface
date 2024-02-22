import React, { useState, useEffect } from "react";
import { useDataProvider } from '@logora/debate.data.data_provider';
import { useResponsive } from "@logora/debate.hooks.use_responsive";
import { useIntl } from "react-intl";
import { useList } from "@logora/debate.list.list_provider";
import { ActionBar } from './action_bar/ActionBar';
import { Pagination } from '@logora/debate.list.pagination';
import { uniqueBy } from '@logora/debate.util.unique_by';
import StandardErrorBoundary from '@logora/debate.error.standard_error_boundary';
import usePrevious from "@rooks/use-previous";
import cx from "classnames";
import styles from "./PaginatedList.module.scss";
import { useLocation } from 'react-router';
import PropTypes from "prop-types";

export const PaginatedList = ({ staticContext,
	staticResourceName,
	query,
	sortOptions,
	sort,
	filters,
	tagList,
	currentPage,
	resources,
	resource,
	currentListId,
	withToken,
	perPage,
	perPageParam = "per_page",
	pageParam = "page",
	sortParam = "sort",
	queryParam = "query",
	tagParam = "tag_id",
	totalHeaderParam,
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
	withUrlParams = false
}) => {
	const intl = useIntl();
	const list = useList();
	const api = useDataProvider();
	const location = useLocation();
	const { isMobile, isTablet, isDesktop } = useResponsive();
	const [isLoading, setIsLoading] = useState(false);
	const [loadError, setLoadError] = useState(false);
	const [currentResources, setCurrentResources] = useState(staticContext && staticResourceName && staticResourceName in staticContext ? staticContext[staticResourceName] : (resources || []));
	const [totalElements, setTotalElements] = useState(staticContext && staticResourceName && staticResourceName in staticContext ? staticContext[staticResourceName].length : 0);
	const [page, setPage] = useState(1);
	const [currentQuery, setCurrentQuery] = useState(query || null);
	const [activeTagId, setActiveTagId] = useState(null);
	const [defaultSelectOption, setDefaultSelectOption] = useState(null);
	const urlParams = new URLSearchParams(location.search);

	const getInitSort = () => {
		return (sortOptions && sortOptions[0].type === "sort" && sortOptions[0].value) || sort || "";
	}

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
		setQuery(query);
	}

	if (sort !== undefined && (sort !== currentSort)) {
		setCurrentSort(sort);
	}

	if (previousFilters && (JSON.stringify(filters) !== JSON.stringify(previousFilters)) && (JSON.stringify(filters) !== JSON.stringify(currentFilters))) {
		setCurrentFilters(filters);
	}

	useEffect(() => {
		if (urlParams.get('tagId')) {
			setActiveTagId(parseInt(urlParams.get('tagId')));
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
			loadResources();
		} else {
			setIsLoading(false);
		}
	}, [currentSort, currentFilters, currentQuery, resource, activeTagId]);

	useEffect(() => {
		if (page > 1) {
			setIsLoading(true);
			loadResources();
		}
	}, [page]);

	useEffect(() => {
		if (list.addElements && (currentListId in list.addElements)) {
			if (list.addElements[currentListId].length > 0) {
				handleAddElements(list.addElements[currentListId]);
				let addElements = list.addElements;
				delete addElements[currentListId];
				list.setAddElements(addElements);
			}
		}
	}, [list.addElements]);

	useEffect(() => {
		if (list.updateElements && (currentListId in list.updateElements)) {
			if (list.updateElements[currentListId].length > 0) {
				handleEditElements(list.updateElements[currentListId]);
				let updateElements = list.updateElements;
				delete updateElements[currentListId];
				list.setUpdateElements(updateElements);
			}
		}
	}, [list.updateElements]);

	useEffect(() => {
		if (list.removeElements && (currentListId in list.removeElements)) {
			if (list.removeElements[currentListId].length > 0) {
				handleRemoveElements(list.removeElements[currentListId]);
				let removeElements = list.removeElements;
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
	};

	const loadResources = () => {
		const loadFunction = withToken ? api.getListWithToken : api.getList;
		if (((page - 1) * perPage < totalElements) || page === 1) {
			const params = {
				[pageParam]: page,
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
						setTotalElements(parseInt(headers[totalHeaderParam || "total"], 10));
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
				setLoadError(true);
				setIsLoading(false);
			});
		} else {
			setIsLoading(false);
		}
	};

	const handleAddElements = (elements) => {
		setCurrentResources(prevElements => uniqueBy([...elements, ...prevElements], uniqueIdKey || "id"));
		onElementsLoad(elements);
	};

	const handleEditElements = (elements) => {
		let newElements = currentResources;
		elements.forEach(element =>
			newElements = newElements.map((a) => (a.id === element.id ? element : a))
		)
		setCurrentResources(uniqueBy(newElements, uniqueIdKey || "id"));
	};

	const handleRemoveElements = (elements) => {
		let removedElementsIds = elements.map(elm => elm.id);
		const newElements = currentResources.filter(elm => removedElementsIds.indexOf(elm.id) === -1);
		setCurrentResources(uniqueBy(newElements, uniqueIdKey || "id"));
	};

	const addElements = (newElements) => {
		setCurrentResources(prevElements => uniqueBy([...prevElements, ...newElements], uniqueIdKey || "id"));
	};

	const displayResource = (resource, index) => {
		if (resource != undefined) {
			return (
				<div className={styles.paginatedListItem} key={resource[uniqueIdKey || "id"]} onClick={onElementClick}>
					<StandardErrorBoundary hideMessage={true}>
						{React.cloneElement(children, { ...{ index: index, [resourcePropName]: resource } })}
					</StandardErrorBoundary>
				</div>
			);
		} else { return null; }
	};

	const displayLoadingComponent = (index) => {
		if (loadingComponent) {
			return (
				<div className={styles.paginatedListItem} key={index}>
					{loadingComponent}
				</div>
			);
		} else { return null; }
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
					<div className={cx(styles.paginatedList, { [styles.paginatedListIsTablet]: !isMobile && !isDesktop, [styles.centeredList]: display === "column", [styles.column]: display === "column", [styles.twoElementsPerLine]: elementsPerLine === 2, [styles.oneElementPerLine]: elementsPerLine === 1, [styles.indexLayoutList]: indexLayout, [styles.listIsDesktop]: isDesktop, [styles.listIsTablet]: isTablet && !isDesktop, [styles.listIsMobile]: isMobile })} style={{ gap: gap }}>
						{currentResources.map(displayResource)}
						{/* Show loading components directly in list when loading more elements */}
						{isLoading ?
							Array(perPage).fill().map((v, i) => i).map(displayLoadingComponent)
							:
							null
						}
					</div>
					{/* Show pagination button when content is loaded */}
					{(!isLoading && withPagination !== false) && (
						<Pagination
							buttonText={intl.formatMessage({ id: "action.see_more", defaultMessage: "See more" })}
							currentPage={page}
							perPage={perPage}
							totalElements={numberElements || totalElements}
							onLoad={() => setPage(page + 1)}
							isLoading={isLoading}
							hideLoader={true} // Disable loader when there is loading components to display instead
						/>
					)}
				</>
			}
		</div>
	);
}

PaginatedList.propTypes = {
	/** Array of the resources */
	resources: PropTypes.array,
	/**  Name of the resource */
	resource: PropTypes.string,
	/** Static context */
	staticContext: PropTypes.object,
	/** The name of the static resource */
	staticResourceName: PropTypes.string,
	/** Query to pass */
	query: PropTypes.string,
	/** An array of sort options to be displayed in a dropdown */
	sortOptions: PropTypes.any,
	/** Actual sort */
	sort: PropTypes.string,
	/** Actual filters */
	filters: PropTypes.object,
	/** The current page number */
	currentPage: PropTypes.number,
	/** The current list id */
	currentListId: PropTypes.string,
	/** If true, with token */
	withToken: PropTypes.bool,
	/** The number of elements to display per page */
	perPage: PropTypes.number,
	/** The name of the parameter used for number of elements */
	perPageParam: PropTypes.string,
	/** The name of the parameter used for pagination */
	pageParam: PropTypes.string,
	/** The name of the parameter used for sorting */
	sortParam: PropTypes.string,
	/** The name of the parameter used for query search */
	queryParam: PropTypes.string,
	/** The name of the parameter used for the tag filter */
	tagParam: PropTypes.string,
	/** The name of the parameter used for the total filter */
	totalHeaderParam: PropTypes.string,
	/** A callback function when the total number of elements updates */
	onUpdateTotal: PropTypes.func,
	/** A callback function when elements load */
	onElementsLoad: PropTypes.func,
	/** A callback function when clicking on an item */
	onElementClick: PropTypes.func,
	/** A function to transform the data before rendering */
	transformData: PropTypes.func,
	/** A unique key to identify elements in the list */
	uniqueIdKey: PropTypes.string,
	/** Name of the resource */
	resourcePropName: PropTypes.string,
	/** A loading component to be displayed when loading data */
	loadingComponent: PropTypes.node,
	/** If true, activate the search bar */
	searchBar: PropTypes.bool,
	/** The title of the list */
	title: PropTypes.node,
	/** A list of tags to filter the list */
	tagList: PropTypes.array,
	/** A component to display when the list is empty */
	emptyListComponent: PropTypes.node,
	/** The text to display when the list is empty */
	emptyText: PropTypes.string,
	/** If column, only one element per line */
	display: PropTypes.string,
	/** Display elements per line */
	elementsPerLine: PropTypes.number,
	/** Other element layout */
	indexLayout: PropTypes.bool,
	/** Spacing between elements */
	gap: PropTypes.string,
	/** If true, show pagination */
	withPagination: PropTypes.bool,
	/** The total number of elements in the list */
	numberElements: PropTypes.number,
	/** Activate countless */
	countless: PropTypes.bool,
	/** Activate url params */
	withUrlParams: PropTypes.bool,
};

PaginatedList.defaultProps = {
	pageParam: "page",
	perPageParam: "per_page",
	sortParam: "sort",
	queryParam: "query",
	tagParam: "tag_id",
	totalHeaderParam: "total",
	searchBar: false,
	indexLayout: false,
	gap: "1em",
	withPagination: true,
	uniqueIdKey: "id",
	withUrlParams: false
};