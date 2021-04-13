/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PropTypes } from 'prop-types';
import { useField } from 'formik';

import registrationError from '../../assets/registrationError.svg';

import './registrationTextField.css';

const RegistrationTextField = (props) => {
  const {
    name, label, labelClassName, inputClassName, placeholder, type, readOnly,
  } = props;
  const [field, meta] = useField(props);

  return (
    <>
      <label className={`registration-text-field-label ${labelClassName}`} htmlFor={name}>
        <input
          type={type}
          id={name}
          className={`registration-text-field ${meta.error ? `${inputClassName} error` : `${inputClassName}`}`}
          name={name}
          placeholder={placeholder}
          value=""
          readOnly={readOnly}
          {...field}
        />
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

RegistrationTextField.defaultProps = {
  labelClassName: '',
  inputClassName: '',
  placeholder: '',
  type: 'text',
  readOnly: false,
};

RegistrationTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default RegistrationTextField;
