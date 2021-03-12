import React, { useState, useEffect } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import axios from 'axios';

import QualificationsList from './QualificationsList';
import './QualificationInfo.css';

const QualificationInfo = (props) => {
  console.log('hi');
  const [volunteers, setVolunteers] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const { cookies } = props;

  const getVolunteers = async () => {
    const pendingVolunteers = await axios.get(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/qualifications/incomplete`,
      { withCredentials: true },
    );
    setVolunteers(pendingVolunteers.data);
  };

  const getQualifications = async () => {
    const userID = cookies.get('userId');
    const pendingQualifications = await axios.get(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/qualifications/user/${userID}`,
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
      {/* <pre>{JSON.stringify(qualifications, null, 2) }</pre>
      <br />
      <br />
      <pre>{JSON.stringify(volunteers, null, 2) }</pre> */}
      <h3 className="heading">Qualification/Hour Information</h3>
      <QualificationsList volunteers={volunteers} qualifications={qualifications} title="List of Volunteers Who Need Qualifications Reviewed" buttonText="Review Qualifications" />
    </div>
  );
};

QualificationInfo.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(QualificationInfo);
