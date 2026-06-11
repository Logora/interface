import { useResponsive } from "@logora/debate/hooks/use_responsive";
import { Icon } from "@logora/debate/icons/icon";
import { SearchInput } from "@logora/debate/input/search_input";
import { Select } from "@logora/debate/input/select";
import { Tag } from "@logora/debate/tag/tag";
import cx from "classnames";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useIntl } from "react-intl";
import { useLocation } from "react-router";
import styles from "./ActionBar.module.scss";

export const ActionBar = ({
	title,
	subtitle,
	showDebateConsultationSubtitle = false,
	sortOptions,
	defaultSelectOption,
	searchBar = false,
	tagList,
	pinnedTagList = [],
	activeTagId,
	withUrlParams = false,
	onSearch,
	onSortChange,
	onTagChange,
}) => {
	const intl = useIntl();
	const location = useLocation();
	const { isMobile } = useResponsive();
	const [searchActive, setSearchActive] = useState(false);
	const tagContainerRef = useRef(null);
	const [tagCanScrollLeft, setTagCanScrollLeft] = useState(false);
	const [tagCanScrollRight, setTagCanScrollRight] = useState(false);

	const checkTagScroll = useCallback(() => {
		const el = tagContainerRef.current;
		if (!el) return;
		setTagCanScrollLeft(el.scrollLeft > 1);
		setTagCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
	}, []);

	useEffect(() => {
		checkTagScroll();
		const el = tagContainerRef.current;
		if (!el) return;
		const observer = new ResizeObserver(checkTagScroll);
		observer.observe(el);
		return () => observer.disconnect();
	}, [orderedTagList, checkTagScroll]);

	const scrollTags = (direction, e) => {
		e.stopPropagation();
		const el = tagContainerRef.current;
		if (!el) return;
		const scrollAmount = 200;
		el.scrollBy({
			left: direction === "left" ? -scrollAmount : scrollAmount,
			behavior: "smooth",
		});
		setTimeout(checkTagScroll, 300);
	};
	const urlParams = new URLSearchParams(
		typeof window !== "undefined" ? window.location.search : location.search,
	);
	const tags = Array.isArray(tagList) ? tagList : tagList?.data || [];
	const pinnedTagIds = [
		...new Set(
			(Array.isArray(pinnedTagList) ? pinnedTagList : [pinnedTagList])
				.filter(Boolean)
				.map(String),
		),
	];
	const orderedTagList = tags.length > 0
		? [
				...pinnedTagIds
					.map((tagId) => tags.find((tag) => String(tag.id) === tagId))
					.filter(Boolean),
				...tags.filter((tag) => !pinnedTagIds.includes(String(tag.id))),
			]
		: [];

	const handleSortChange = (selectOption) => {
		if (withUrlParams) {
			for (const key of urlParams.keys()) {
				sortOptions.map((o) => {
					if (o.name === key) {
						urlParams.delete(key);
					}
				});
			}
			urlParams.delete("sort");
			urlParams.set(
				selectOption.type === "filter" ? selectOption.name : "sort",
				selectOption.value,
			);
		}
		onSortChange(selectOption);
	};

	const handleActiveTag = (tag) => {
		if (withUrlParams) {
			if (tag.id === activeTagId) {
				urlParams.delete("tagId");
			} else {
				urlParams.set("tagId", tag.id);
			}
		}
		onTagChange(tag.id === activeTagId ? null : tag.id);
	};

	const handleSearch = (query) => {
		if (withUrlParams) {
			if (!query) {
				urlParams.delete("search");
			} else {
				urlParams.set("search", query);
			}
		}
		onSearch(query);
		setSearchActive(query !== "");
	};

	const displayTags = (tag) => {
		const tagIsActive = activeTagId === tag.id;

		return (
			<div
				className={styles.tagItem}
				key={tag.id}
				onClick={() => handleActiveTag(tag)}
			>
				<Tag
					text={tag.display_name}
					active={tagIsActive}
					rightIcon={
						tagIsActive && <Icon name="close" height={10} width={10} />
					}
				/>
			</div>
		);
	};

	return (
		<>
			{(title || sortOptions || searchBar) && (
				<>
					<div
						className={cx(styles.listHeader, {
							[styles.listHeaderOneItem]: !searchBar || !sortOptions,
						})}
					>
						{title && <div className={styles.listTitle}>{title}</div>}
						{(sortOptions || searchBar) && (
							<div
								className={cx(styles.rightBar, {
									[styles.rightBarOneItem]: !searchBar || !sortOptions,
								})}
							>
								{searchBar ? (
									<div className={styles.search}>
										<SearchInput
											onSearchSubmit={handleSearch}
											placeholder={intl.formatMessage({
												id: "info.search_mobile",
												defaultMessage: "Search",
											})}
											reducedByDefault={false}
										/>
									</div>
								) : null}
								{sortOptions ? (
									<Select
										onChange={handleSortChange}
										options={sortOptions}
										defaultOption={defaultSelectOption}
										horizontalPosition={"right"}
										disabled={searchActive}
										className={styles.select}
									/>
								) : null}
							</div>
						)}
					</div>
					{showDebateConsultationSubtitle && subtitle && (
						<div className={styles.listSubtitle}>{subtitle}</div>
					)}
					{orderedTagList.length > 0 && (
						<div className={styles.tagSection}>
							<button
								type="button"
								className={`${styles.arrow} ${styles.arrowLeft} ${!tagCanScrollLeft ? styles.arrowHidden : ""}`}
								onClick={(e) => scrollTags("left", e)}
								aria-label="Tag précédent"
								tabIndex={tagCanScrollLeft ? 0 : -1}
							>
								<Icon name="lightArrow" height={24} width={24} />
							</button>
							<div
								ref={tagContainerRef}
								className={styles.tagList}
								onScroll={checkTagScroll}
							>
								{orderedTagList.map(displayTags)}
							</div>
							<button
								type="button"
								className={`${styles.arrow} ${styles.arrowRight} ${!tagCanScrollRight ? styles.arrowHidden : ""}`}
								onClick={(e) => scrollTags("right", e)}
								aria-label="Tag suivant"
								tabIndex={tagCanScrollRight ? 0 : -1}
							>
								<Icon name="lightArrow" height={24} width={24} />
							</button>
						</div>
					)}
				</>
			)}
		</>
	);
};
