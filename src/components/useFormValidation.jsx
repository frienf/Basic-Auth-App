import { useState } from 'react';

const validators = {
  username: (value) => /^[a-zA-Z0-9_]{3,}$/.test(value)
    ? ''
    : 'Username must be at least 3 characters and contain only letters, numbers, or underscores',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ? ''
    : 'Please enter a valid email address',
  password: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
    ? ''
    : 'Password must be at least 8 characters, including uppercase, lowercase, number, and special character',
};

export function useFormValidation(initialData) {
  const [formData, setFormData] = useState(initialData);
  const [formErrors, setFormErrors] = useState(
    Object.fromEntries(Object.keys(initialData).map((key) => [key, '']))
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: validators[name]?.(value) || '' }));
  };

  const validateForm = () => {
    const errors = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, validators[key]?.(value) || ''])
    );
    setFormErrors(errors);
    return Object.values(errors).every((err) => err === '') &&
           Object.values(formData).every((val) => val !== '');
  };

  const isFormValid = () => {
    const errors = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, validators[key]?.(value) || ''])
    );
    return Object.values(errors).every((err) => err === '') &&
           Object.values(formData).every((val) => val !== '');
  };

  return { formData, formErrors, handleChange, validateForm, isFormValid };
}