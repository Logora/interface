import React from 'react';
import { HiddenCheckbox } from '@logora/debate.input.checkbox.hidden';
import { CheckboxIndicator, classes } from '@logora/debate.input.checkbox.indicator';

export { HiddenCheckbox as Input };

/** Custom checkbox with text. */
export function CheckboxLabel({
  checked,
  defaultChecked,
  onInputChanged,
  type,
  disabled,
  name,
  required,
  value,
  input = (
    <HiddenCheckbox
      defaultChecked={defaultChecked}
      onChange={onInputChanged}
      checked={checked}
      disabled={disabled}
      type={type}
      name={name}
      value={value}
      required={required}
    />
  ),
  indicator = <CheckboxIndicator className={classes.defaultCheckbox} />,
  children,
  ...rest
}) {
  return (
    <label {...rest}>
      {input}
      {indicator}
      {children}
    </label>
  );
}
