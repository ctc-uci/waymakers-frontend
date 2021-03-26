import React, { useEffect, useState } from 'react';

import EditQualificationsRow from '../../components/admin/qualifications/editQualificationsRow';
import AddQualificationModal from '../../components/admin/qualifications/addQualificationModal';
import UpdateQualificationModal from '../../components/admin/qualifications/updateQualificationModal';

import './editQualificationsPage.css';

const axios = require('axios');

const EditQualifications = () => {
  const [qualifications, setQualifications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [qual, setQual] = useState();

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

  const openUpdateModal = (q) => {
    setUpdateOpen(true);
    setQual(q);
  };

  // Get qualificationsLists on page load
  useEffect(() => {
    getQualifications();
  }, []);

  const getUpdateModal = () => {
    if (!qual) {
      return null;
    }
    return (
      <UpdateQualificationModal
        isModalOpen={updateOpen}
        setIsModalOpen={setUpdateOpen}
        qualificationID={qual.id}
      />
    );
  };

  return (
    <div id="edit-qualifications">
      <div id="table-header">
        <h3><b>List of Qualifications</b></h3>
        <button type="button" className="green-button" onClick={() => setModalOpen(true)}>Add Qualification</button>
      </div>
      <AddQualificationModal
        isModalOpen={modalOpen}
        setIsModalOpen={setModalOpen}
      />
      {getUpdateModal()}
      <div id="table-wrapper">
        <table className="qualifications-table">
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
                  openUpdateModal={openUpdateModal}
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
