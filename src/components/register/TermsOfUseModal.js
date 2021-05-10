/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import './TermsOfUseModal.css';

const TermsOfUseModal = ({ isOpen, setIsOpen }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={() => setIsOpen(false)}
    className="tou-modal"
    overlayClassName="tou-modal-overlay"
  >
    <div className="tou-header">
      <br />
      <p className="medium tou-header-text">Data Privacy Consent Statement</p>
      <button type="button" className="close-tou-button" onClick={() => setIsOpen(false)}>
        <p className="large">X</p>
      </button>
    </div>
    <div className="tou-body">
      <p className="medium tou-body-title">
        Waymakers Southern California Data Privacy Statement
      </p>
      <p className="medium tou-body-content">
        Contrary to popular belief, Lorem Ipsum is not simply random text.
        It has roots in a piece of classical Latin literature from 45 BC, making it over
        2000 years old.
        Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
        looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
        and going through the cites of the word in classical literature, discovered the undoubtable
        source.
        Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
        (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on
        the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
        "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        Contrary to popular belief, Lorem Ipsum is not simply random text.
        It has roots in a piece of classical Latin literature from 45 BC, making it over
        2000 years old.
        Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
        looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
        and going through the cites of the word in classical literature, discovered the undoubtable
        source.
        Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
        (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on
        the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
        "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        Contrary to popular belief, Lorem Ipsum is not simply random text.
        It has roots in a piece of classical Latin literature from 45 BC, making it over
        2000 years old.
        Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
        looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
        and going through the cites of the word in classical literature, discovered the undoubtable
        source.
        Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
        (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on
        the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
        "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
      </p>
    </div>
    <div className="tou-footer" />
  </Modal>
);

TermsOfUseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default TermsOfUseModal;
