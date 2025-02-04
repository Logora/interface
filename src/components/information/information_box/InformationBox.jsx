import React from 'react';
import styles from './InformationBox.module.scss';
import { Icon } from '@logora/debate.icons.icon';
import { Link } from 'react-router';
import { useIntl, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

export const InformationBox = ({ icon, title, points, description, textLink, link, isActive = false}) => {
    const intl = useIntl();

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                { icon && <div className={styles.icon} data-testid="icon">{icon}</div> }
                <span>{ title }</span>
            </div>
            <div className={styles.point}>
                <span className={styles.pointNumber}>
                    <FormattedMessage id="information.information_box.eloquence_point" values={{ count: points }} defaultMessage={"From {count} eloquence points"}/>
                </span>
            </div>
            <div className={styles.text}>
                <span>{ description }</span>
            </div>
            {isActive ?
                <div className={styles.link}>
                    <Link to={link}>
                        <span>{ textLink }</span>
                        <Icon name="lightArrow" width={10} height={10} />
                    </Link>
                </div>
            :
                <span className={styles.moduleNotActive}>{intl.formatMessage({ id: "information.information_box.module_not_active", defaultMessage: "Module not available on this debate space" })}</span>
            }
        </div>
  )
};

InformationBox.propTypes = {
    /** Icon to display */
    icon: PropTypes.any,
    /** Box title */
    title: PropTypes.string,
    /** Points reward */
    points: PropTypes.number,
    /** Box description */
    description: PropTypes.string,
    /** Link's text */
    textLink: PropTypes.string,
    /** Router link */
    link: PropTypes.string,
    /** If true, enable link and redirectio */
    isActive: PropTypes.bool,
};
