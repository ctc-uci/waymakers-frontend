import React, { useState, useEffect } from 'react';
import axios from 'axios';

import QualificationsList from '../../components/admin/qualifications/qualificationInfo/QualificationsList';
import './QualificationInfoPage.css';

const QualificationInfo = () => {
  // console.log('hi');
  const [volunteers, setVolunteers] = useState([]);

  const getVolunteers = async () => {
    const pendingVolunteers = await axios.get(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/qualifications/incomplete`,
      { withCredentials: true },
    );
    setVolunteers(pendingVolunteers.data);
  };

  // Populate volunteers list on page load
  useEffect(async () => {
    getVolunteers();
    // getQualifications();
  }, []);

  return (
    <div>
      {/* <pre>{JSON.stringify(qualifications, null, 2) }</pre> */}
      <br />
      <br />
      <pre>{JSON.stringify(volunteers, null, 2) }</pre>
      <h3 className="heading">Qualification/Hour Information</h3>
      <QualificationsList volunteers={volunteers} title="List of Volunteers Who Need Qualifications Reviewed" buttonText="Review Qualifications" />
    </div>
  );
};

export default QualificationInfo;
