import React from 'react';
import classnames from 'classnames';
import styles from './Button.module.scss'
import PropTypes from "prop-types";

export const Button = ({ className, type = "button", active, leftIcon, rightIcon, accent, border = true, handleClick, children, ...rest }) => {
  const onClick = (event) => {
      event.stopPropagation();
      handleClick && handleClick(event);
  }

  return (
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
  /**  Content of the button */
  children: PropTypes.node,
  /** Extra props passed to the button */
  rest: PropTypes.object
};