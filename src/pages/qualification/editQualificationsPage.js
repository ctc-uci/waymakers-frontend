import React, { useEffect, useState } from 'react';

import EditQualificationsRow from '../../components/admin/qualifications/editQualificationsRow';
import AddQualificationModal from '../../components/admin/qualifications/addQualificationModal';

import './editQualificationsPage.css';

const axios = require('axios');

// TODO: add loading spinner or something similar
const EditQualifications = () => {
  const [qualifications, setQualifications] = useState([]);
  const [addQualModalOpen, setAddQualModalOpen] = useState(false);

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
        <button type="button" className="green-button" onClick={() => setAddQualModalOpen(true)}>Add Qualification</button>
      </div>
      <AddQualificationModal
        isModalOpen={addQualModalOpen}
        setIsModalOpen={setAddQualModalOpen}
      />
      {/* {getUpdateModal()} */}
      <div id="table-wrapper">
        <table className="qualifications-table">
          <thead>
            <tr>
              <th>Qualification</th>
              <th>Tier</th>
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
        <b>
          Total Qualifications:
          {' '}
          {Object.keys(qualifications).length}
        </b>
      </div>
    </div>
  );
};

export default EditQualifications;
