import { Button } from "@logora/debate/action/button";
import { Modal, useModal } from "@logora/debate/dialog/modal";
import { Icon } from "@logora/debate/icons/icon";
import { useTranslatedContent } from "@logora/debate/translation/translated_content";
import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "./SideModal.module.scss";

export const SideModal = ({
	modalTitle,
	onChooseSide,
	title,
	positions,
	isNeutral = false,
}) => {
	const { hideModal } = useModal();

	const handleChoosePosition = (position) => {
		hideModal();
		onChooseSide(position);
	};

	return (
		<Modal data-vid={"side_modal"} title={modalTitle}>
			<div className={styles.modalContent}>{title}</div>
			<div className={styles.modalActions}>
				{positions.slice(0, 2).map((position) => {
					return (
						<Button
							data-tid={"action_choose_side"}
							key={position.id}
							className={styles.modalAction}
							onClick={() => handleChoosePosition(position.id)}
						>
							{
								useTranslatedContent(
									position.name,
									position.language,
									"name",
									position.translation_entries,
								).translatedContent
							}
						</Button>
					);
				})}
			</div>
			{isNeutral && positions[2] && (
				<div className={styles.neutralPosition}>
					<div className={styles.userChoice}>
						<FormattedMessage
							id={"modal.side_modal.neutral_position"}
							defaultMessage={"You support the position"}
						/>
						<span className={styles.neutralPositionName}>
							{
								useTranslatedContent(
									positions[2].name,
									positions[2].language,
									"name",
									positions[2].translation_entries,
								).translatedContent
							}
						</span>
					</div>
					<FormattedMessage
						id={"modal.side_modal.neutral_position_change"}
						defaultMessage={
							"It is not possible to write an argument with this one. If you wish to participate in the debate, choose one of the positions displayed above."
						}
					/>
				</div>
			)}
		</Modal>
	);
};
