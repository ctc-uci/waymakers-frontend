import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import EditQualificationsRow from './editQualificationsRow';

import './editQualifications.css';

const axios = require('axios');

const AddQualificationModal = ({ modalOpen, setModalOpen }) => (
  <div>
    <Modal
      className="add-item-modal-content"
      overlayClassName="add-item-modal-overlay"
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
    >
      <button type="button" onClick={() => setModalOpen(false)}>X</button>
      <div>
        Text Here
      </div>
    </Modal>
  </div>
);

AddQualificationModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

const EditQualifications = () => {
  const [qualifications, setQualifications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetching qualifications from the server
  const getQualifications = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/qualifications`,
        { withCredentials: true },
      );
      setQualifications(response.data);
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
    }
  };

  // Get qualificationsLists on page load
  useEffect(() => {
    getQualifications();
  }, []);

  return (
    <div id="edit-qualifications">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <h3 className="p-2">List of Qualifications</h3>
        <button type="button" className="btn btn-success rounded-pill" onClick={() => setModalOpen(true)}>Add Qualification</button>
      </div>
      <AddQualificationModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Tier</th>
            <th>Qualification</th>
            <th>About/Description</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {Object.values(qualifications)
            .map((qualification) => (
              <EditQualificationsRow
                qualification={qualification}
              />
            ))}
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(qualifications, null, 2) }</pre> */}
    </div>
  );
};

export default EditQualifications;
