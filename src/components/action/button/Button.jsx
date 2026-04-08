import React from 'react';
import classnames from 'classnames';
import styles from './Button.module.scss'
import { Link } from '@logora/debate/action/link';

export const Button = ({ className, type = "button", active, leftIcon, rightIcon, accent, border = true, handleClick, to, external, children, ...rest }) => {
  const onClick = (event) => {
      handleClick && handleClick(event);
  }

  return (
    <>
      {to ?
        <Link 
          to={to} 
          tabIndex={0}
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
          tabIndex={0}
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

