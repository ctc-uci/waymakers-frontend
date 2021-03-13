import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const NotesModal = ({ notesModal, setNotesModal }) => (
  <Modal isOpen={notesModal} onRequestClose={() => setNotesModal(false)}>
    <h6>Please enter any additional notes for the volunteer</h6>
    <input type="text" />
    <button type="button" className="cancel-btn" onClick={() => setNotesModal(false)}>Cancel</button>
    {/* should update database with notes */}
    <button type="button" className="submit-btn" onClick={() => setNotesModal(false)}>Submit</button>
  </Modal>
);

NotesModal.propTypes = {
  notesModal: PropTypes.bool.isRequired,
  setNotesModal: PropTypes.bool.isRequired,
};

export default NotesModal;
