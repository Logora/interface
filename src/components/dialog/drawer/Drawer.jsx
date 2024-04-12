import React, { useState, useEffect } from 'react';
import ReactDrawer from 'react-modern-drawer';
import { Icon } from '@logora/debate.icons.icon';
import cx from 'classnames';
import 'react-modern-drawer/dist/index.css';
import styles from './Drawer.module.scss';
import PropTypes from 'prop-types';

export const Drawer = ({ isOpen = false, onClose, title, size = '60vw', enableOverlay = false, children }) => {
    const [isdrawerOpen, setIsDrawerOpen] = useState(isOpen);

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        if (onClose) {
            onClose();
        }
    }

    useEffect(() => {
        setIsDrawerOpen(isOpen)
    }, [isOpen])

    return (
        <>
            <ReactDrawer
                open={isdrawerOpen}
                onClose={closeDrawer}
                direction='right'
                size={size}
                enableOverlay={enableOverlay}
                className={styles.drawer}
            >
                <div className={styles.header}>
                    {title &&
                        <div className={styles.title}>
                            {title}
                        </div>
                    }
                    <div onClick={closeDrawer} className={cx(styles.closeButton)}>
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
    /** Drawer content */
    children: PropTypes.node,
};

Drawer.defaultProps = {
    isOpen: false,
    size: '60vw',
    enableOverlay: false
};