import React from 'react';
import classNames from 'classnames';
import { CheckboxLabel, Input } from '@logora/debate.input.checkbox.label';
import styles from './Toggle.module.scss';

export { Input };

export function Toggle({ className, message, ...rest }) {
  const indicator = <span className={styles.slider}></span>;
  return (
    <>
      <div className={styles.toggleContainer}>
        <CheckboxLabel className={classNames(styles.toggle, className)} indicator={indicator} {...rest} />
        { rest.label &&
          <span className={styles.toggleLabel}>{ rest.label }</span>
        }
      </div>
      { message && 
        <div className={styles.errorMessage}>
          {message}
        </div>
      }
    </>
  );
}
