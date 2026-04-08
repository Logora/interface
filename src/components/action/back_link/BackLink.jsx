import React from 'react';
import { Link } from '@logora/debate/action/link';
import { Icon } from "@logora/debate/icons/icon";
import cx from 'classnames';
import styles from './BackLink.module.scss';

export const BackLink = ({ to, text, external = true, className, ...rest }) => {
    return (
        <Link to={to} className={cx(className, styles.backLink)} external={external} {...rest}>
            <Icon name="arrow" height={24} width={24} />
            <span className={styles.arrowIcon}>
                { text }
            </span>
        </Link>
    );
}

