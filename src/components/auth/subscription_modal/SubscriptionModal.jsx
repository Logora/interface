import { Button } from "@logora/debate/action/button";
import { useConfig } from "@logora/debate/data/config_provider";
import { Modal } from "@logora/debate/dialog/modal";
import { Icon } from "@logora/debate/icons/icon";
import React from "react";
import { useIntl } from "react-intl";
import styles from "./SubscriptionModal.module.scss";

export const SubscriptionModal = ({ title, text, buttonLabel, url, onLogin }) => {
	const intl = useIntl();
	const config = useConfig();
	const providerName = config?.provider?.companyName;

	return (
		<Modal data-vid={"subscription_modal"}>
			<div className={styles.body}>
				<div className={styles.logo}>
					{config?.logo_url ? (
						<img
							height={100}
							width={100}
							className={styles.logoImage}
							src={config.logo_url}
							alt={`Logo ${providerName || ""}`}
						/>
					) : (
						<Icon
							name="next"
							aria-hidden="true"
							height={50}
							width={50}
							className={styles.icon}
						/>
					)}
				</div>
				<div className={styles.mainText}>
					<div className={styles.title}>
						{title ||
							intl.formatMessage({
								id: "auth.subscription_modal.title",
								defaultMessage: "Subscribe to comment",
							})}
					</div>
					{text ||
						intl.formatMessage({
							id: "auth.subscription_modal.text",
							defaultMessage: "Commenting is reserved to subscribers.",
						})}
				</div>
				{url && (
					<Button
						data-tid={"link_subscribe"}
						className={styles.button}
						to={url}
						external
						border={false}
					>
						{buttonLabel ||
							intl.formatMessage({
								id: "auth.subscription_modal.button",
								defaultMessage: "Subscribe",
							})}
					</Button>
				)}
				{onLogin && (
					<div className={styles.loginText}>
						{intl.formatMessage({
							id: "auth.sso_form.already_account",
							defaultMessage: "Already have an account ?",
						})}
						<button
							type="button"
							className={styles.loginLink}
							data-tid={"link_login"}
							onClick={onLogin}
						>
							{intl.formatMessage({
								id: "auth.sso_form.signin",
								defaultMessage: "Sign in",
							})}
						</button>
					</div>
				)}
			</div>
		</Modal>
	);
};
