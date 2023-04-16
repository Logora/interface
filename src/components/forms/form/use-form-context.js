import { useCallback, useState } from 'react';

export function useFormContext() {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});

  const handleValidate = useCallback(
    (name, message) =>
      setErrors((prevErrors) => {
        const nextMessage = { ...prevErrors, [name]: message };
        if (message === undefined) delete nextMessage[name];
        return nextMessage;
      }),
    []
  );

  const handleBlur = useCallback(
    (event) =>
      setErrors((prevErrors) => {
        const target = event.target || event;
        if (!target.required || !!prevErrors[target.name]) return prevErrors;

        const nextMessage = { ...prevErrors, [target.name]: null };
        return nextMessage;
      }),
    []
  );

  const handleChange = (event) =>
    setValues((prevValues) => {
      const target = event.target || event;
      const nextValues = { ...prevValues, [target.name]: target.value };
      return nextValues;
    });

  return {
    errors: errors,
    onBlur: handleBlur,
    onValidate: handleValidate,
    onChange: handleChange,
    values: values,
  };
}
