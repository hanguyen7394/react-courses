import React, { useState } from 'react'
import { validate } from '../utils/validate';

const useForm = (initialValue = {}, rules) => {
  const [form, setForm] = useState(initialValue);
  const [error, setError] = useState({});

  const register = (registerField) => {
    return {
      error: error[registerField],
      value: form[registerField] || '',
      onChange: (ev) => setForm({ ...form, [registerField]: ev.target.value }),
    };
  };

  const _validate = () => {
    const errorObject = validate(rules, form);
    setError(errorObject);
    return errorObject;
  }

  return {
    register,
    form,
    error,
    validate: _validate,
    setForm
  }
}

export default useForm