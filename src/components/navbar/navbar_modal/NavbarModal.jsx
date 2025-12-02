import React from "react";
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router";
import { matchPath } from "react-router-dom";
import { Modal, useModal } from "@logora/debate.dialog.modal";
import { useAuth } from "@logora/debate.auth.use_auth";
import { useConfig, useRoutes } from "@logora/debate.data.config_provider";
import { useAuthRequired } from "@logora/debate.hooks.use_auth_required";
import { useResponsive } from "@logora/debate.hooks.use_responsive";
import { Icon } from "@logora/debate.icons.icon";
import { Link } from "@logora/debate.action.link";
import { Avatar } from "@logora/debate.user.avatar";
import cx from "classnames";
import styles from "./NavbarModal.module.scss";

export const NavbarModal = () => {
	const { hideModal } = useModal();
	const config = useConfig();
	const routes = useRoutes();
	const { pathname } = useLocation();
	const { isLoggedIn, currentUser } = useAuth();
	const requireAuthentication = useAuthRequired();
	const responsive = useResponsive?.() || {};
	const { isMobile, elementWidth } = responsive;
	const shouldShowProfileOnMobile = isMobile && elementWidth <= 576 && !config.isDrawer;

	const isActive = (activePath) => {
		return !!matchPath(activePath, pathname);
	};

	const showLoginModal = () => {
		requireAuthentication({});
	};

	return (
		<Modal fullScreen={!config.isDrawer} showCloseButton>
			<div className={styles.modalContainer}>
				<div className={styles.modalTitle}>
					<FormattedMessage id="info.menu" defaultMessage={"Navigation"} />
				</div>
				<div className={styles.navigationContainer}>
					<div
						className={cx(styles.modalItem, {
							[styles.active]:
								isActive(routes.indexLocation.path) ||
								isActive(routes.debateShowLocation.path) ||
								isActive(routes.rootLocation.path || "/"),
						})}
						onClick={hideModal}
					>
						<Link
							className={cx(styles.itemContainer, {
								[styles.activeItem]:
									isActive(routes.indexLocation.path) ||
									isActive(routes.debateShowLocation.path) ||
									isActive(routes.rootLocation.path || "/"),
							})}
							to={routes.indexLocation.toUrl()}
							data-tid={"view_index"}
						>
							<Icon name="chat" height={24} width={24} />
							<span className={styles.text}>
								<FormattedMessage id="info.all_debates_short" defaultMessage={"Debates"} />
							</span>
						</Link>
					</div>
					{config.modules.consultation && (
						<div
							className={cx(styles.modalItem, {
								[styles.active]:
									isActive(routes.consultationIndexLocation.path) ||
									isActive(routes.consultationShowLocation.path),
							})}
							onClick={hideModal}
						>
							<Link
								className={cx(styles.itemContainer, {
									[styles.activeItem]:
										isActive(routes.consultationIndexLocation.path) ||
										isActive(routes.consultationShowLocation.path),
								})}
								to={routes.consultationIndexLocation.toUrl()}
								data-tid={"view_consultation"}
							>
								<Icon name="community" height={24} width={24} />
								<span className={cx(styles.text, styles.consultationText)}>
									<FormattedMessage id="info.consultations" defaultMessage={"Consultations"} />
								</span>
							</Link>
						</div>
					)}
					{config.modules.suggestions?.active === false ? null : (
						<div
							className={cx(styles.modalItem, {
								[styles.active]: isActive(routes.suggestionLocation.path),
							})}
							onClick={hideModal}
						>
							<Link
								className={cx(styles.itemContainer, {
									[styles.activeItem]: isActive(routes.suggestionLocation.path),
								})}
								to={routes.suggestionLocation.toUrl()}
								data-tid={"view_suggestions"}
							>
								<Icon name="suggestion" height={24} width={24} />
								<span className={styles.text}>
									<FormattedMessage id="info.suggestion" defaultMessage={"Suggestions"} />
								</span>
							</Link>
						</div>
					)}
					{isLoggedIn && shouldShowProfileOnMobile && (
						<div
							className={cx(styles.modalItem, {
								[styles.active]:
									isActive(routes.userShowLocation.path) ||
									isActive(routes.userEditLocation.path),
							})}
							onClick={hideModal}
						>
							<Link
								className={cx(styles.itemContainer, {
									[styles.activeItem]:
										isActive(routes.userShowLocation.path) ||
										isActive(routes.userEditLocation.path),
								})}
								to={routes.userShowLocation.toUrl({
									userSlug: currentUser.hash_id,
								})}
								data-tid={"view_user_profile"}
							>
								<div data-tid={"view_user_profile"} className={styles.profile}>
									<Avatar
										avatarUrl={currentUser.image_url}
										userName={currentUser.full_name}
										size={24}
										data-tid={"view_user_profile"}
									/>
									<span className={styles.text}>
										<FormattedMessage id="info.profile" defaultMessage={"Profile"} />
									</span>
								</div>
							</Link>
						</div>
					)}
					{!isLoggedIn && config?.actions?.hideLoginButton !== true && (
						<div
							className={styles.modalItem}
							data-tid={"action_login_link"}
							onClick={showLoginModal}
						>
							<div
								className={styles.itemContainer}
								data-tid={"action_login_link"}
							>
								<Icon name="login" height={24} width={24} />
								<span className={styles.text}>
									<FormattedMessage id="action.sign_in" defaultMessage={"Sign in"} />
								</span>
							</div>
						</div>
					)}
				</div>
			</div>
			{!config.isDrawer && (
				<div className={styles.mobileExitButton} onClick={hideModal}>
					<Icon name="mobileClose" width={50} height={50} />
				</div>
			)}
		</Modal>
	);
};


