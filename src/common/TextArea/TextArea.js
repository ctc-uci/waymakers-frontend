/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import './TextArea.css';

const TextArea = ({
  id,
  name,
  onChange,
  value,
  maxLength,
  rows,
  cols,
  className,
  ...prop
}) => (
  <>
    <textarea
      id={id}
      name={name}
      onChange={onChange}
      value={value}
      maxLength={maxLength}
      rows={rows}
      cols={cols}
      className={`default-text-area ${className}`}
      {...prop}
    />
    <p className="char-limit-counter">
      {value.length}
      /
      {maxLength}
    </p>
  </>
);

TextArea.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  rows: PropTypes.number,
  cols: PropTypes.number,
  className: PropTypes.string,
};

TextArea.defaultProps = {
  maxLength: 250,
  rows: 8,
  cols: 25,
  className: '',
};

export default TextArea;
