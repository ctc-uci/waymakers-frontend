import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import NotesModal from './notesModal';

const RejectModal = ({
  qualificationID, userID, rejectModal, setRejectModal,
}) => {
  const [notesModal, setNotesModal] = useState(false);
  const onClickRejectBtn = () => {
    setRejectModal(false);
    setNotesModal(true);
  };

  return (
    <div>
      <Modal isOpen={rejectModal} onRequestClose={() => setRejectModal(false)}>
        <h6>Reject Qualification?</h6>
        <section>
          <button type="button" className="cancel-btn" onClick={() => setRejectModal(false)}>Cancel</button>
          <button type="button" className="yes-btn" onClick={onClickRejectBtn}>Yes</button>
        </section>
      </Modal>
      <NotesModal
        notesModal={notesModal}
        setNotesModal={setNotesModal}
        qualificationID={qualificationID}
        userID={userID}
      />
    </div>
  );
};

RejectModal.propTypes = {
  rejectModal: PropTypes.bool.isRequired,
  setRejectModal: PropTypes.bool.isRequired,
  qualificationID: PropTypes.number.isRequired,
  userID: PropTypes.string.isRequired,
};
export default RejectModal;
