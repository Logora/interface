import { Button } from "@logora/debate/action/button";
import { Modal } from "@logora/debate/dialog/modal";
import React from "react";
import { useIntl } from "react-intl";
import styles from "./SubscriptionModal.module.scss";

export const SubscriptionModal = ({ title, text, buttonLabel, url }) => {
	const intl = useIntl();

	return (
		<Modal data-vid={"subscription_modal"} showCloseButton>
			<div className={styles.body}>
				<div className={styles.title}>
					{title ||
						intl.formatMessage({
							id: "auth.subscription_modal.title",
							defaultMessage: "Subscribe to comment",
						})}
				</div>
				<div>
					{text ||
						intl.formatMessage({
							id: "auth.subscription_modal.text",
							defaultMessage: "Commenting is reserved to subscribers.",
						})}
				</div>
				{url && (
					<Button data-tid={"link_subscribe"} to={url} external border={false}>
						{buttonLabel ||
							intl.formatMessage({
								id: "auth.subscription_modal.button",
								defaultMessage: "Subscribe",
							})}
					</Button>
				)}
			</div>
		</Modal>
	);
};
