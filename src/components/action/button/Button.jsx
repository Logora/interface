import React from 'react';
import classnames from 'classnames';
import styles from './Button.module.scss'
import PropTypes from "prop-types";
import { Link } from '@logora/debate.action.link';

export const Button = ({ className, type = "button", active, leftIcon, rightIcon, accent, border = true, handleClick, to, external, children, ...rest }) => {
  const onClick = (event) => {
      event.stopPropagation();
      handleClick && handleClick(event);
  }

  return (
    <>
      {to ?
        <Link 
          to={to} 
          className={classnames(
            styles.primaryButton,
            className, 
            (leftIcon || rightIcon) && !children && styles.iconOnly,
            (leftIcon || rightIcon) && styles.withIcon,
            leftIcon && styles.withLeftIcon,
            rightIcon && styles.withRightIcon,
            active && styles.active,
            !border && styles.withoutBorder,
            styles[accent],
          )}
          external={external}
          {...rest}
        >
          { leftIcon }
          { children }
          { rightIcon }
        </Link>
      :
        <button 
          type={type} 
          className={classnames(
            styles.primaryButton,
            className, 
            (leftIcon || rightIcon) && !children && styles.iconOnly,
            (leftIcon || rightIcon) && styles.withIcon,
            leftIcon && styles.withLeftIcon,
            rightIcon && styles.withRightIcon,
            active && styles.active,
            !border && styles.withoutBorder,
            styles[accent],
          )} 
          onClick={onClick} 
          {...rest}
        >
            { leftIcon }
            { children }
            { rightIcon }
        </button>
      }
    </>
  );
}

Button.propTypes = {
  /** The type of the button (e.g. 'button', 'submit') */
  type: PropTypes.string,
  /** The active state of the button */
  active: PropTypes.bool,
  /** Left icon displayed inside the button  */
  leftIcon: PropTypes.node,
  /**  Right icon displayed inside the button */
  rightIcon: PropTypes.node,
  /**  Color accent of the button, can be `success` or `danger` */
  accent: PropTypes.string,
  /**  Whether to show the border */
  border: PropTypes.bool,
  /**  Callback function for the onClick event. */
  handleClick: PropTypes.func,
  /**  Class name to style the button */
  className: PropTypes.string,
  /** href, or object passed to react-router's Link */
  to: PropTypes.any,
  /** If `true`, will render a plain anchor tag instead of react-router's Link */
  external: PropTypes.bool,
  /**  Content of the button */
  children: PropTypes.node,
  /** Extra props passed to the button */
  rest: PropTypes.object
};