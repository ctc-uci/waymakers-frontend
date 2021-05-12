import React from 'react';
import PropTypes from 'prop-types';
import './ValidatedField.css';

// Attaches a styled label and error message for an input tag
const ValidatedField = ({
  name,
  labelText,
  formik,
  labelClassName,
  errorMsgClassName,
  children,
  isRequired,
  inputHeaderClassName,
}) => (
  <label htmlFor={name} className={`formik-field ${inputHeaderClassName}`}>
    <p className={labelClassName}>
      {labelText}
      {isRequired && <span className="required-label"> *</span>}
    </p>
    {children}
    {formik.errors[name] && formik.touched[name] ? (
      <div className={errorMsgClassName}>{formik.errors[name]}</div>
    ) : null}
  </label>
);

ValidatedField.defaultProps = {
  labelClassName: 'formik-field-label',
  errorMsgClassName: 'formik-field-error-text',
  isRequired: false,
  inputHeaderClassName: '',
};

ValidatedField.propTypes = {
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  formik: PropTypes.object.isRequired,
  labelClassName: PropTypes.string,
  errorMsgClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  isRequired: PropTypes.bool,
  inputHeaderClassName: PropTypes.string,
};

export default ValidatedField;
