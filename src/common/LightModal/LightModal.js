/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import './LightModal.css';

const LightModal = ({
  isOpen, setIsOpen, children, ...prop
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={() => setIsOpen(false)}
    className="light-modal"
    overlayClassName="light-modal-overlay"
    {...prop}
  >
    <div className="light-modal-container">
      {children}
    </div>
  </Modal>
);

LightModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default LightModal;
