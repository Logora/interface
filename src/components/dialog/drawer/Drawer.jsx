import React, { useState, useEffect, Suspense } from 'react';
import ReactDrawer from 'react-modern-drawer';
import { Icon } from '@logora/debate.icons.icon';
import { NavbarButton } from '@logora/debate.navbar.navbar_button';
import { useLocation } from "react-router";
import { useAuth } from "@logora/debate.auth.use_auth";
import { useIntl } from 'react-intl';
import { useConfig, useRoutes } from "@logora/debate.data.config_provider";
import { useAuthRequired } from "@logora/debate.hooks.use_auth_required";
import { Link } from "@logora/debate.action.link";
import { Avatar } from "@logora/debate.user.avatar";
import { Dropdown } from "@logora/debate.dialog.dropdown";
import { IconTextLink } from "@logora/debate.action.icon_text_link";
import { Loader } from "@logora/debate.progress.loader";
import NotificationMenu from "@logora/debate.notification.notification_menu";
import 'react-modern-drawer/dist/index.css';
import styles from './Drawer.module.scss';
import PropTypes from 'prop-types';

export const Drawer = ({ isOpen = false, onClose, title, size = '30vw', enableOverlay = false, pathParameter = null, children, notificationDefinitions = {} }) => {
    const [isdrawerOpen, setIsDrawerOpen] = useState(isOpen);
    const location = useLocation();
    const routes = useRoutes();
    const config = useConfig();
    const intl = useIntl();
    const { isLoggedIn, currentUser } = useAuth();
    const requireAuthentication = useAuthRequired();
    const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        if (pathParameter && typeof window !== 'undefined') {
            const url = new URL(window.location);
            url.searchParams.delete(pathParameter);
            window.history.pushState({}, '', url);
        }
        onClose?.();
    }

    useEffect(() => {
        setIsDrawerOpen(isOpen)
    }, [isOpen])

    useEffect(() => {
        if (pathParameter && location?.pathname && typeof window !== 'undefined') {
            const url = new URL(window?.location);
            url.searchParams.set(pathParameter, location.pathname);
            window.history.pushState({}, '', url);
        }
    }, [location])

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener('logora:drawer:close', closeDrawer);
            return () => {
                window.removeEventListener('logora:drawer:close', closeDrawer);
            };
        }
    }, []);

    const toggleNotificationDropdown = () => {
        setUnreadNotificationCount(0);
    };

    return (
        <>
            <ReactDrawer
                open={isdrawerOpen}
                onClose={closeDrawer}
                direction='right'
                size={size}
                enableOverlay={enableOverlay}
                className={styles.drawer}
                zIndex={1000000}
            >
                <div className={styles.header}>
                    <div className={styles.headerRowTop}>
                        <button
                            type="button"
                            onClick={closeDrawer}
                            className={styles.closeButton}
                            aria-label={intl.formatMessage({ id: "dialog.drawer.aria_label", defaultMessage: "Close drawer" })}
                        >
                            <Icon name="close" width={15} height={15} />
                        </button>
                    </div>

                    <div className={styles.headerRowBottom}>
                        <div className={styles.headerLeft}>
                            <NavbarButton
                                inDrawer
                                showNavbarButtonInDrawer={(config?.layout?.showNavbarButtonInDrawer !== false)}
                            />
                        </div>

                        {isLoggedIn && config?.layout?.showProfileNotificationInDrawer !== false && (
                            <div className={styles.headerRight}>
                                <Dropdown
                                    onClick={toggleNotificationDropdown}
                                    dropdownClassName={styles.notificationDropdown}
                                    className={styles.notificationsContainer}
                                >
                                    <div className={styles.notificationIcon}>
                                        <IconTextLink
                                            pin={unreadNotificationCount > 0}
                                            pinText={unreadNotificationCount.toString()}
                                            textClassName={styles.hideText}
                                        >
                                            <Icon name="alarm" height={24} width={24} />
                                        </IconTextLink>
                                    </div>

                                    <Suspense fallback={<Loader />}>
                                        <NotificationMenu
                                            notificationDefinitions={notificationDefinitions}
                                        />
                                    </Suspense>
                                </Dropdown>

                                <div className={styles.drawerProfile}>
                                    <Link to={routes.userShowLocation.toUrl({ userSlug: currentUser.hash_id })}>
                                        <Avatar
                                            avatarUrl={currentUser.image_url}
                                            userName={currentUser.full_name}
                                            size={30}
                                        />
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {title && <div className={styles.title}>{title}</div>}
                </div>

                <div className={styles.body}>
                    {children}
                </div>
            </ReactDrawer>
        </>
    )
}

Drawer.propTypes = {
    /** Controls the opening of the drawer */
    isOpen: PropTypes.bool,
    /** On close callback */
    onClose: PropTypes.func,
    /** Drawer title */
    title: PropTypes.node,
    /** Determines the size of drawer */
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Determines whether to show the overlay */
    enableOverlay: PropTypes.bool,
    /** Name of the query parameter that will store the current path */
    pathParameter: PropTypes.string,
    /** Drawer content */
    children: PropTypes.node,
};
