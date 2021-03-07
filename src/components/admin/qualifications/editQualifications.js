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
      <div id="table-header">
        <h3><b>List of Qualifications</b></h3>
        <button type="button" className="green-button" onClick={() => setModalOpen(true)}>Add Qualification</button>
      </div>
      <AddQualificationModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <div id="table-wrapper">
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
                  key={qualification.id}
                  qualification={qualification}
                />
              ))}
          </tbody>
        </table>
        <b>
          Total Qualifications:
          {' '}
          {Object.keys(qualifications).length}
        </b>
        {/* <pre>{JSON.stringify(qualifications, null, 2) }</pre> */}
      </div>
    </div>
  );
};

export default EditQualifications;
