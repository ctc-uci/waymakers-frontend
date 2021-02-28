import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const AddQualificationModal = ({ modalOpen, setModalOpen }) => {
  // State variable for all editable fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    console.log('Submitting');
  };

  return (
    <div>
      <Modal
        className="add-item-modal-content"
        overlayClassName="add-item-modal-overlay"
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <button type="button" onClick={() => setModalOpen(false)}>X</button>
        <div>
          <h3>
            Add Qualification Information
          </h3>
          <form onSubmit={handleSubmit} id="add-qualification-form">
            <label htmlFor="name" className="form-label">
              Name:
              <input
                id="name"
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label htmlFor="description">
              Description:
              <textarea
                id="description"
                type="textarea"
                className="form-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <input type="submit" value="Submit" />
            <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

AddQualificationModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

export default AddQualificationModal;
