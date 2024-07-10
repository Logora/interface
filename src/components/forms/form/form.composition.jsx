import React, { useEffect, useState, useCallback } from 'react';
import { Form } from './form';
import { useForm } from './use-form';
import { extractFormData } from './extract-form-data';

export function FormExample() {
  function submit(e, data) {
    
    alert(JSON.stringify(data));
  }
  function onChange(e, data) {
    console.log(data);
  }

  return (
    <Form data-testid='form' onSubmit={submit} onChange={onChange}>
      <EmailInput placeholder='email input' name='email-input' required />
      <NonFormElement />
      <Button />
    </Form>
  );
}

export function FormWithNativeOnSubmit() {
  function submit(e) {
    const extractedData = extractFormData(e)
    alert(JSON.stringify(extractedData));
  }

  return (
    <Form data-testid='form' onSubmit={submit}>
      <EmailInput placeholder='email input' name='email-input' required />
      <Button />
    </Form>
  );
}

function Button() {
  const { errors = {} } = useForm();
  const isDisabled = Object.keys(errors).length > 0;
  return (
    <button disabled={isDisabled} type='submit'>
      Submit
    </button>
  );
}

function NonFormElement() {
  const {onChange} = useForm();
  return <div onClick={() => onChange && onChange({name: "non-form-element", value: 'this value was added by clicking a regular div'})}>dsds</div>
}

const emailRegEx = /\S+@\S+\.\S+/;

function EmailInput(props) {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const { onChange, onValidate, values, errors } = useForm();
  
  const value = values?.['email-input'];

  useEffect(() => {
    if (!value || value === '') return;
    if (!emailRegEx.test(value)) {
      return setMessage('Email should have only valid chars');
    }
    setMessage(undefined);
  }, [value]);

  useEffect(() => {
    onValidate && onValidate('email-input', message);
  }, [message, onValidate]);

  const handleBlur = useCallback(
    ({ value }) => {
      if (!value || value === '') {
        setMessage('Required');
      }
    },
    [value]
  );
  return (
    <>
      <input
        {...props}
        onChange={(e) => {
          onChange && onChange({ name: e.target.name, value: e.target.value });
        }}
        onBlur={(e) => {
          handleBlur({ value: e.target.value });
        }}
      />
      <div>{errors && errors['email-input']}</div>
    </>
  );
}
