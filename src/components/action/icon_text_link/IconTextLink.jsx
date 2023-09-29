import React from "react";
import styles from "./IconTextLink.module.scss";
import { Link } from "@logora/debate.action.link";
import cx from "classnames";
import PropTypes from "prop-types";

export const IconTextLink = ({ className, to, icon: Icon, text, active = false, children, pin = false, pinText, ...rest }) =>  {
	const displayIconText = () => {
		return (
			<div data-testid={"iconTextContainer"} className={cx(styles.iconTextContainer, {[styles.active]: active})} {...(to ? {} : {...rest})}>
				<div className={styles.iconPinContainer}>
					{ pin &&
						<span
							className={cx(styles.pinWithText, { [styles.pin]: !pinText })}
							data-notification-count={pinText}
						>
							{pinText || ""}
						</span>
					}
					{ Icon ? <Icon height={24} width={24} /> : children }
				</div>
				<div className={styles.iconText}>{ text }</div>
			</div>
		);
	};

	return to ? (
		<Link data-testid={"iconTextLink"} to={to} className={cx(styles.iconTextLink, className)} {...rest}>
			{ displayIconText() }
		</Link>
	) : (
		displayIconText()
	);
}

IconTextLink.propTypes = {
    /** href, or object passed to the link */
    to: PropTypes.any,
    /** Icon to be displayed */
    icon: PropTypes.any,
    /** Text displayed under the icon */
    text: PropTypes.string,
    /** If `true`, link is displayed as active */
    active: PropTypes.bool,
    /** If `true`, will render a plain anchor tag instead of react-router's Link */
    external: PropTypes.bool,
    /**  Class name to style the link */
    className: PropTypes.string,
    /** If `true`, will display a red pin on the icon */
    pin: PropTypes.bool,
    /** Text displayed under the icon */
    pinText: PropTypes.string,
	/**  Content of the link if icon is empty*/
	children: PropTypes.node,
    /** Extra props passed to the link */
    rest: PropTypes.object
};

IconTextLink.defaultProps = {
    active: false,
	pin: false
};