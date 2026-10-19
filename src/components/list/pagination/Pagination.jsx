import { Button } from "@logora/debate/action/button";
import { Icon } from "@logora/debate/icons/icon";
import { Loader } from "@logora/debate/progress/loader";
import React, { useState, useEffect } from "react";
import styles from "./Pagination.module.scss";

export const Pagination = ({
	currentPage,
	perPage,
	totalElements,
	buttonText,
	onLoad,
	isLoading,
	hideLoader,
	hasMore,
	...rest
}) => {
	const [hasNextPage, setHasNextPage] = useState(
		hasMore ?? currentPage * perPage < totalElements,
	);

	useEffect(() => {
		if (hasMore !== undefined) {
			setHasNextPage(hasMore);
		} else if (totalElements > 0) {
			setHasNextPage(currentPage * perPage < totalElements);
		}
	}, [totalElements, currentPage, hasMore]);

	return (
		<>
			{hasNextPage ? (
				<div className={styles.paginationBox}>
					{!isLoading ? (
						<Button
							handleClick={onLoad}
							{...rest}
							rightIcon={<Icon name="lightArrow" height={10} width={10} />}
						>
							{buttonText}
						</Button>
					) : hideLoader ? null : (
						<Loader />
					)}
				</div>
			) : null}
		</>
	);
};
