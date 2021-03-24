import React from 'react';
import PropTypes from 'prop-types';
import './LightModalHeader.css';

const LightModalHeader = ({ title, onClose }) => (
  <div className="light-modal-header">
    <button
      className="light-modal-header-close-button"
      type="button"
      onClick={onClose}
    >
      X
    </button>
    <p className="light-modal-header-title">{title}</p>
  </div>
);

LightModalHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LightModalHeader;
