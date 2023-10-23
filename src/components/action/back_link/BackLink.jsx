import React from 'react';
import { Link } from '@logora/debate.action.link';
import { Icon } from "@logora/debate.icons.icon";
import cx from 'classnames';
import styles from './BackLink.module.scss';
import PropTypes from "prop-types";

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

BackLink.propTypes = {
    /** href, or object passed to the link */
    to: PropTypes.any.isRequired,
    /** Link text */
    text: PropTypes.string.isRequired,
    /** If `true`, will render a plain anchor tag instead of react-router's Link */
    external: PropTypes.bool,
    /**  Class name to style the link */
    className: PropTypes.string,
    /** Extra props passed to the link */
    rest: PropTypes.object
};