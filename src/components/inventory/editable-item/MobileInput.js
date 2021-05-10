import React from 'react';
import PropTypes from 'prop-types';

import MobileDel from './MobileDel';

const MobileInput = ({
  className, name, type, value, form, onChange, deleted,
}) => (
  <>
    {deleted
      ? <MobileDel className="deleted-item">{value}</MobileDel>
      : (
        <input
          name={name}
          type={type}
          className={className}
          value={value}
          form={form}
          onChange={onChange}
        />
      )}
  </>
);

MobileInput.propTypes = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  deleted: PropTypes.bool.isRequired,
};

export default MobileInput;
