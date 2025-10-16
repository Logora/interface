import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import ReactDrawer from 'react-modern-drawer';
import { Icon } from '@logora/debate.icons.icon';
import cx from 'classnames';
import 'react-modern-drawer/dist/index.css';
import styles from './Drawer.module.scss';
import PropTypes from 'prop-types';

export const Drawer = ({ isOpen = false, onClose, title, size = '30vw', enableOverlay = false, pathParameter = null, children }) => {
    const [isdrawerOpen, setIsDrawerOpen] = useState(isOpen);
    const location = useLocation();

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
                    {title &&
                        <div className={styles.title}>
                            {title}
                        </div>
                    }
                    <div onClick={closeDrawer} className={cx(styles.closeButton)} data-testid="close-button">
                        <Icon name="close" width={15} height={15} />
                    </div>
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
