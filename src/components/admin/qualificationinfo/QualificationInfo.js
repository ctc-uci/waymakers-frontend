import React, { useState, useEffect } from 'react';
import axios from 'axios';

import QualificationsList from './QualificationsList';
import './QualificationInfo.css';

const QualificationInfo = () => {
  console.log('hi');
  const [volunteers, setVolunteers] = useState([]);
  const [qualifications, setQualifications] = useState([]);

  const getVolunteers = async () => {
    const pendingVolunteers = await axios.get(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/qualifications/incomplete`,
      { withCredentials: true },
    );
    setVolunteers(pendingVolunteers.data);
  };

  // the route below should be same as that from viewProfile
  // right now the qualifications modal will show ALL qualifications,
  // not just those that are pending
  const getQualifications = async () => {
    const pendingQualifications = await axios.get(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/qualifications`,
      { withCredentials: true },
    );
    setQualifications(pendingQualifications.data);
  };

  // Populate volunteers list on page load
  useEffect(async () => {
    getVolunteers();
    getQualifications();
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(qualifications, null, 2) }</pre>
      <h3 className="heading">Qualification/Hour Information</h3>
      <QualificationsList volunteers={volunteers} qualifications={qualifications} title="List of Volunteers Who Need Qualifications Reviewed" buttonText="Review Qualifications" />
    </div>
  );
};

export default QualificationInfo;
