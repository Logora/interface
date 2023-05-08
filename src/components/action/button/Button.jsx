import React from 'react';
import classnames from 'classnames';
import styles from './Button.module.scss'

export const Button = (props) => {
  const { className, type, active, leftIcon, rightIcon, accent, border = true, handleClick, children, ...rest } = props;

  const onClick = (event) => {
      event.stopPropagation();
      handleClick && handleClick(event);
  }

  return (
    <button 
      type={type ? type : "button"} 
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