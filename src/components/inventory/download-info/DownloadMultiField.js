/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { useField } from 'formik';

import registrationError from '../../../assets/registrationError.svg';

// Handle delete from multi select, currently not handled;
const DownloadMultiField = (props) => {
  const {
    labelClassName, inputClassName, id, name, options, setFieldValue, onChange,
  } = props;

  const [field, meta] = useField(props);

  const handleChange = (e) => {
    setFieldValue(name, e);
  };

  return (
    <label className={`dinfo-check-field-label ${labelClassName}`} htmlFor={id}>
      <Select
        isMulti
        id={id}
        name={name}
        options={options}
        className={`basic-multi-select ${inputClassName}`}
        onChange={onChange || handleChange}
        onBlur={field.onBlur}
      />
      {meta.touched && meta.error ? (
        <p className="registration-error small">
          <img src={registrationError} alt=" " />
          {' '}
          {meta.error}
        </p>
      ) : <br />}
    </label>
  );
};

DownloadMultiField.defaultProps = {
  labelClassName: '',
  inputClassName: '',
  onChange: null,
};

DownloadMultiField.propTypes = {
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
  })).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};

export default DownloadMultiField;
