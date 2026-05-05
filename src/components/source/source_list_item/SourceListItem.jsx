import { Link } from "@logora/debate/action/link";
import { Icon } from "@logora/debate/icons/icon";
import React from "react";
import styles from "./SourceListItem.module.scss";

export const SourceListItem = ({ index = 0, url, title, publisher, onRemove }) => {
	return (
		<div className={styles.sourceListItemContainer}>
			<Link
				className={styles.sourceListItem}
				to={url}
				external
				target="_blank"
				rel="nofollow noreferrer noopener"
				data-tid={"link_view_source"}
			>
				<Icon name="link" width={16} height={16} />
				<div className={styles.sourceListItemLink}>
					<span>[ {index + 1} ] </span>
					<span>
						{publisher && `${publisher} – `} {title}
					</span>
				</div>
			</Link>

			{onRemove && (
				<button
					type="button"
					className={styles.removeSourceButton}
					onClick={(event) => {
						event.preventDefault();
						event.stopPropagation();
						onRemove();
					}}
					aria-label="Remove source"
				>
					<Icon name="close" width={10} height={10} />
				</button>
			)}
		</div>
	);
};