import { Link } from "@logora/debate/action/link";
import { useResponsive } from "@logora/debate/hooks/use_responsive";
import { SectionBox } from "@logora/debate/section/section_box";
import { ContextSourceBox } from "@logora/debate/source/context_source_box";
import cx from "classnames";
import React from "react";
import styles from "./ContextSourceList.module.scss";

export const ContextSourceList = ({ sources = [], title = "" }) => {
	const { isMobile, isTablet, isDesktop } = useResponsive();

	const displaySource = (source) => {
		return (
			<Link
				className={styles.listItem}
				to={source.source_url}
				key={source.id}
				target="_blank"
				external
			>
				<ContextSourceBox
					imageUrl={source.origin_image_url}
					author={source.publisher}
					title={source.title}
					date={source.published_date}
				/>
			</Link>
		);
	};
	return (
		<SectionBox
			className={styles.sectionBox}
			isCollapsible
			isCollapsedByDefault={false}
			title={title}
		>
			<div
				className={cx(styles.content, {
					[styles.contentDesktop]: isDesktop,
					[styles.contentTablet]: isTablet,
					[styles.contentMobile]: isMobile,
				})}
			>
				{sources.map(displaySource)}
			</div>
		</SectionBox>
	);
};
