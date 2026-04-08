import React from 'react';
import classnames from 'classnames';
import styles from './TextInput.module.scss';

export function Message({ message, className, ...rest }) {
  if (!message) return null;
  return (
    <div {...rest} className={classnames(styles.errorMessage, className)}>
      {message}
    </div>
  );
}
