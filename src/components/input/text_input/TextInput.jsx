import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { useForm } from '@logora/debate.forms.form';
import { getAccent } from './color-accent';
import { Message } from './message';
import styles from './TextInput.module.scss';

export const TextInput = forwardRef(function TextInputWithRef(
  {
    className,
    style,
    error,
    success,
    filled,
    iconRight,
    iconLeft,
    placeholder,
    inputClass,
    messageClass,
    message,
    activeLabel = true,
    ...rest
  },
  ref
) {
  const accent = getAccent({ error, success });
  const { onChange } = useForm();

  return (
    <>
      <div className={classNames(styles.container, iconRight && styles.textInputWithRightIcon, iconLeft && styles.textInputWithLeftIcon, className)} style={style}>
        {iconLeft}
        <input
          ref={ref}
          className={classNames(styles.textInput, filled && styles.filled, accent, inputClass)}
          {...rest}
          placeholder={activeLabel ? "" : placeholder}
          onChange={onChange || rest.onChange}
        />
        {activeLabel && <label>{placeholder}</label>}
        {iconRight}
      </div>
      <Message message={message} className={messageClass} />
    </>
  );
});