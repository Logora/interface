import React, { forwardRef, useState } from 'react';
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
  const [hasValue, setHasValue] = useState(!!rest.value || !!rest.defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (onChange) {
      onChange(e);
    } else if (rest.onChange) {
      rest.onChange(e);
    }
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (rest.onFocus) rest.onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (rest.onBlur) rest.onBlur(e);
  };

  const isLabelActive = hasValue || isFocused;

  return (
    <>
      <div className={classNames(styles.container, iconRight && styles.textInputWithRightIcon, iconLeft && styles.textInputWithLeftIcon, className)} style={style}>
        {iconLeft}
        <input
          ref={ref}
          className={classNames(styles.textInput, filled && styles.filled, accent, inputClass)}
          {...rest}
          placeholder={activeLabel ? '' : placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {activeLabel && <label className={classNames(isLabelActive && styles.labelActive)}>{placeholder}</label>}
        {iconRight}
      </div>
      <Message message={message} className={messageClass} />
    </>
  );
});