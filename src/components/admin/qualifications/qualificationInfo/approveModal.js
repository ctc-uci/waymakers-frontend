import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import axios from 'axios';

const ApproveModal = ({
  qualificationID, userID, open, setOpen,
}) => {
  // Send PUT request to accept qualification
  const acceptQualification = async () => {
    await axios.put(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/qualifications/status`,
      {
        userID,
        qualificationID,
        completionStatus: 'Qualified',
      },
      { withCredentials: true },
    );
    console.log('approved qual');
    setOpen(false);
  };

  return (
    <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
      <h6>Approve Qualification?</h6>
      <section>
        <button type="button" className="cancel-btn" onClick={() => setOpen(false)}>Cancel</button>
        <button type="button" className="yes-btn" onClick={() => acceptQualification()}>Yes</button>
      </section>
    </Modal>
  );
};

ApproveModal.propTypes = {
  qualificationID: PropTypes.number.isRequired,
  userID: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.bool.isRequired,
};

export default ApproveModal;
