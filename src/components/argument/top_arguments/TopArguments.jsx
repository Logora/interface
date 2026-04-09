import { Button } from "@logora/debate/action/button";
import { useConfig } from "@logora/debate/data/config_provider";
import { useResponsive } from "@logora/debate/hooks/use_responsive";
import { UserContentSkeleton } from "@logora/debate/skeleton/user_content_skeleton";
import { useTranslatedContent } from "@logora/debate/translation/translated_content";
import { SummaryContentBox } from "@logora/debate/user_content/summary_content_box";
import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "./TopArguments.module.scss";

export const TopArguments = ({
	argumentFor,
	argumentAgainst,
	debateUrl,
	argumentCount,
	debate,
}) => {
	const config = useConfig();
	const { isMobile } = useResponsive();
	const positionForName = useTranslatedContent(
		argumentFor?.position.name,
		argumentFor?.position.language,
		"name",
		argumentFor?.position.translation_entries,
	);
	const positionAgainstName = useTranslatedContent(
		argumentAgainst?.position.name,
		argumentAgainst?.position.language,
		"name",
		argumentAgainst?.position.translation_entries,
	);

	const getTopArgument = () => {
		if (argumentFor && argumentAgainst) {
			return argumentFor.score > argumentAgainst.score
				? argumentFor
				: argumentAgainst;
		}
		return argumentFor || argumentAgainst || false;
	};

	const topArgument = getTopArgument();

	const displayArgument = (argument, positionIndex, compact) => {
		return (
			<>
				{argument ? (
					<SummaryContentBox
						author={argument.author}
						tag={
							positionIndex === 0
								? positionForName.translatedContent
								: positionAgainstName.translatedContent
						}
						date={new Date(argument.created_at)}
						link={`${debateUrl}#argument_${argument.id}`}
						content={argument.content}
						tagClassName={styles[`positionBackground-${positionIndex}`]}
						contentCount={argumentCount[positionIndex]}
						headerOneLine={compact}
						showFooter={!compact}
						language={argument.language}
						translationEntries={argument.translation_entries}
						lineCount={config?.actions?.argumentLineCount ?? undefined}
					/>
				) : (
					<UserContentSkeleton
						enableAnimation={false}
						border
						tag={
							positionIndex === 0
								? positionForName.translatedContent
								: positionAgainstName.translatedContent
						}
						tagClassName={styles[`positionBackground-${positionIndex}`]}
					>
						<Button
							to={debateUrl}
							external
							data-tid={"action_add_argument"}
							target={"_top"}
							rel="nofollow"
						>
							<FormattedMessage
								id="argument.top_arguments.call_to_action"
								defaultMessage={"Add an argument"}
							/>
						</Button>
					</UserContentSkeleton>
				)}
			</>
		);
	};

	return (
		<>
			{config.synthesis.newDesign !== false ||
			(isMobile && config.synthesis.onlyShowTopArgument === true) ? (
				<div
					className={styles.topArgumentsUnique}
					data-testid={"topArgumentsContainerUnique"}
				>
					<div className={styles.topArgument}>
						{displayArgument(
							topArgument,
							topArgument === argumentAgainst ? 1 : 0,
							true,
						)}
					</div>
				</div>
			) : (
				<div
					className={styles.topArguments}
					data-testid={"topArgumentsContainer"}
				>
					<div className={styles.topArgument}>
						{displayArgument(argumentFor, 0, false)}
					</div>
					<div className={styles.topArgument}>
						{displayArgument(argumentAgainst, 1, false)}
					</div>
				</div>
			)}
		</>
	);
};
