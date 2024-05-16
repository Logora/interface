import React from "react";
import { Modal, useModal } from "@logora/debate.dialog.modal";
import { FormattedMessage } from "react-intl";
import { Button } from '@logora/debate.action.button';
import { Icon } from "@logora/debate.icons.icon";
import { useTranslatedContent } from '@logora/debate.translation.translated_content';
import PropTypes from "prop-types";
import styles from "./SideModal.module.scss";

export const SideModal = ({ modalTitle, onChooseSide, title, positions, disabledPositions, isNeutral = false }) => {
    const { hideModal } = useModal();

    const handleChoosePosition = (position) => {
        hideModal();
        onChooseSide(position);
    };

    return (
        <Modal
            data-vid={"side_modal"}
            title={modalTitle}
        >
            <div className={styles.modalContent}>{title}</div>
            <div className={styles.modalActions}>
                { positions.slice(0, 2).map((position) => {
                    return (
                        <Button
                            data-tid={"action_choose_side"}
                            key={position.id}
                            className={styles.modalAction}
                            onClick={() => handleChoosePosition(position.id)}
                            disabled={disabledPositions.filter((pos) => pos.id === position.id).length > 0}
                        >
                            { useTranslatedContent(position.name, position.language, "name", position.translation_entries).translatedContent }
                        </Button>
                    );
                })}
            </div>
            { disabledPositions?.length > 0 && (
                <div className={styles.argumentInputWarning}>
                    <FormattedMessage
                        id={"modal.side_modal.side_limit_short"}
                        values={{ position: disabledPositions[0].name }}
                        defaultMessage={"You have already reached the argument limit (10) for position {position}."}
                    />
                </div>
            )}
            { isNeutral && positions[2] && (
                <div className={styles.neutralPosition}>
                    <div className={styles.userChoice}>
                        <FormattedMessage id={"modal.side_modal.neutral_position"} defaultMessage={"You support the position"} />
                        <span className={styles.neutralPositionName}>{ useTranslatedContent(positions[2].name, positions[2].language, "name", positions[2].translation_entries).translatedContent }</span>
                    </div>
                    <FormattedMessage id={"modal.side_modal.neutral_position_change"} defaultMessage={"It is not possible to write an argument with this one. If you wish to participate in the debate, choose one of the positions displayed above."}/>
                </div>
            )}
        </Modal>
    );
};

SideModal.propTypes = {
    /** Title of the modal */
    modalTitle: PropTypes.string.isRequired,
    /** Title displayed in the modal */
    title: PropTypes.string.isRequired,
    /** An array of objects containing the id and name of each position in the debate. */
    positions: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        })
    ).isRequired,
    /** An array of objects containing the id and name of each position that should be disabled. */
    disabledPositions: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        })
    ),
    /** Whether to show a neutral position option in the modal. */
    isNeutral: PropTypes.bool,
    /** A callback function that will be called with the selected position id when a user chooses a side. */
    onChooseSide: PropTypes.func.isRequired,
};

SideModal.defaultProps = {
    isNeutral: false,
};
