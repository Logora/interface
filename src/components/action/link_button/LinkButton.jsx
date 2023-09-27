import React from 'react';
import { Link } from '@logora/debate.action.link';
import cx from 'classnames';
import styles from './LinkButton.module.scss';
import PropTypes from "prop-types";

export const LinkButton = ({ className, to, external, children, ...rest }) => {
  return (
    <Link 
      to={to} 
      className={cx(styles.primaryLink, className)}
      external={external}
      {...rest}
    >
      { children }
    </Link>
  );
}

LinkButton.propTypes = {
  /** href, or object passed to react-router */
  to: PropTypes.any,
  /** Class name to style the link */
  className: PropTypes.string,
  /** If `true`, will render a plain anchor tag instead of react-router's Link */
  external: PropTypes.bool,
  /**  Content of the link */
  children: PropTypes.node,
  /** Extra props passed to the Link component */
  rest: PropTypes.object
};