/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useField } from 'formik';

import registrationError from '../../assets/registrationError.svg';
import registrationShowPassword from '../../assets/registrationShowPassword.svg';
import registrationHidePassword from '../../assets/registrationHidePassword.svg';

import './registrationPasswordField.css';

const RegistrationPasswordField = (props) => {
  const {
    name, label, labelClassName, inputClassName, placeholder, readOnly,
  } = props;
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <label className={`registration-password-field-label ${labelClassName}`} htmlFor={name}>
        <input
          type={showPassword ? 'text' : 'password'}
          id={name}
          className={`registration-password-field ${meta.error ? `${inputClassName} error` : `${inputClassName}`}`}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          {...field}
        />
        <button
          type="button"
          className="password-showhide-button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword
            ? <img src={registrationHidePassword} alt="Hide" />
            : <img src={registrationShowPassword} alt="Show" />}
        </button>
        <p className="small">{label}</p>
        {meta.touched && meta.error ? (
          <p className="registration-error">
            <img src={registrationError} alt=" " />
            {' '}
            {meta.error}
          </p>
        ) : <br />}
      </label>
    </>
  );
};

RegistrationPasswordField.defaultProps = {
  labelClassName: '',
  inputClassName: '',
  placeholder: '',
  readOnly: false,
};

RegistrationPasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default RegistrationPasswordField;
