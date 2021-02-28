import React, { useEffect, useState } from 'react';
import EditQualificationsRow from './editQualificationsRow';
import AddQualificationModal from './addQualificationModal';

import './editQualifications.css';

const axios = require('axios');

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
