import { useModal } from '@logora/debate.dialog.modal';
import { useResponsive } from "@logora/debate.hooks.use_responsive";
import { Icon } from '@logora/debate.icons.icon';
import cx from "classnames";
import { NavbarModal } from '@logora/debate.navbar.navbar_modal';

import styles from './NavbarButton.module.scss';

export const NavbarButton = ({ inDrawer = false, showInDrawer = true }) => {
    const modal = useModal?.();
    const responsive = useResponsive?.() || {};
    const { isMobile, elementWidth } = responsive;

    const handleShowModal = () => {
        modal?.showModal?.(<NavbarModal />);
    };

    if (inDrawer && !showInDrawer) {
        return null;
    }

    if (!inDrawer) {
        const shouldShowOnMobile = isMobile && elementWidth <= 576;
        if (!shouldShowOnMobile) {
            return null;
        }
    }

    const className = cx({
        [styles.mobileIcon]: !inDrawer,
        [styles.mobileIconDrawer]: inDrawer,
    });

    return (
        <div
            className={className}
            onClick={handleShowModal}
            data-tid="action_view_mobile_navigation"
        >
            <Icon name="mobileMenu" width={50} height={50} />
        </div>
    );
};
