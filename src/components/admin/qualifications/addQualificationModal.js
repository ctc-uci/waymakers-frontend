import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const axios = require('axios');

const AddQualificationModal = ({ modalOpen, setModalOpen }) => {
  // State variable for all editable fields
  const [name, setName] = useState('');
  const [volunteerTier, setVolunteerTier] = useState();
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/qualifications`,
        {
          name,
          description,
          volunteer_tier: volunteerTier,
        },
        { withCredentials: true },
      );
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
    }
    setModalOpen(false);
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
            <label htmlFor="tier" className="form-label">
              Tier:
              <input
                id="tier"
                type="number"
                className="form-input"
                value={volunteerTier}
                onChange={(e) => setVolunteerTier(e.target.value)}
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
