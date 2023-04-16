import React from 'react';
import { FormContext } from './form-context';
import { useFormContext } from './use-form-context';

export function Form({ children, onSubmit, onChange, ...rest }) {
  const context = useFormContext();

  return (
    <FormContext.Provider value={context}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit && onSubmit(e, context.values)
        }}
        onChange={(e) => {
          const target = e.target;
          const nextValue = {[target.name]: target.value}
          onChange && onChange(e, {...context.values, ...nextValue})
        }}
        {...rest}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}
