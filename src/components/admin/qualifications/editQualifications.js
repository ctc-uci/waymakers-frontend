import React, { useEffect, useState } from 'react';
import EditQualificationsRow from './editQualificationsRow';

import './editQualifications.css';

const axios = require('axios');

const EditQualifications = () => {
  const [qualifications, setQualifications] = useState([]);

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
    <div>
      <h1>List of Qualifications</h1>
      <table>
        <thead>
          <tr>
            <th>Qualification</th>
            <th>About/Description</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {Object.values(qualifications)
            .sort((a, b) => (a.id > b.id ? 1 : -1))
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
