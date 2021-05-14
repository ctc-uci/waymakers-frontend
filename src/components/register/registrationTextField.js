/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PropTypes } from 'prop-types';
import { useField } from 'formik';

import { normalizePhoneInput } from '../../common/utils';

import registrationError from '../../assets/registrationError.svg';

import './registrationTextField.css';

const RegistrationTextField = (props) => {
  const {
    name, label, labelClassName, inputClassName, placeholder, type, readOnly, phoneNumber,
  } = props;
  const [field, meta] = useField(props);

  const handleChange = (e) => {
    if (phoneNumber) {
      e.target.value = normalizePhoneInput(e.target.value, field.value);
    }
    field.onChange(e);
  };

  return (
    <>
      <label className={`registration-text-field-label ${labelClassName}`} htmlFor={name}>
        <input
          {...props}
          type={type}
          id={name}
          className={`registration-text-field ${meta.error ? `${inputClassName} error` : `${inputClassName}`}`}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          value={field.value}
          onChange={handleChange}
          onBlur={field.onBlur}
        />
        <p className="small">{label}</p>
        {meta.touched && meta.error ? (
          <p className="registration-error small">
            <img src={registrationError} alt=" " />
            {' '}
            {meta.error}
          </p>
        ) : <br />}
      </label>
    </>
  );
};

RegistrationTextField.defaultProps = {
  label: '',
  labelClassName: '',
  inputClassName: '',
  placeholder: '',
  type: 'text',
  readOnly: false,
  phoneNumber: false,
};

RegistrationTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  readOnly: PropTypes.bool,
  phoneNumber: PropTypes.bool,
};

export default RegistrationTextField;
