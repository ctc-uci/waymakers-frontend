import React, { useEffect, useState } from 'react';

import './qualificationLists.css';

const axios = require('axios');

const QualificationLists = () => {
  const [qualificationLists, setQualificationLists] = useState([]);

  // Fetching qualificationLists from the server
  const getQualificationLists = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/qualifications`,
        { withCredentials: true },
      );
      setQualificationLists(response.data);
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
    }
  };

  // Get qualificationsLists on page load
  useEffect(() => {
    getQualificationLists();
  }, []);

  return (
    <div>
      <h1>QualificationLists</h1>
      <pre>{JSON.stringify(qualificationLists, null, 2) }</pre>
    </div>
  );
};

export default QualificationLists;
