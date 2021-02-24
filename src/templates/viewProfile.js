/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import './viewProfile.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import '../components/profile/profile.js';
import axios from 'axios';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import About from '../components/profile/about/About';
import Contact from '../components/profile/contact/Contact';

import profCircle from '../images/profCircle.png';
import Qualification from '../components/profile/qualifications/qualifications';

require('dotenv').config();

const viewProfile = (props) => {
  // Notes for Preston:
  //  - explain async better?
  //  - explain componentDidMount concept
  //  - explain extra parameter in useEffect
  //  - explain passing props
  //  - explain isLoading

  const { cookies } = props;
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState('');

  const [tier, setTier] = useState(0);
  const [status, setStatus] = useState('Volunteer');

  const [qualificationAll, setQualificationAll] = useState([]);

  const [isLoading, setLoading] = useState(false);

  // Use axios GET request to retreive info to backend api
  useEffect(async () => {
    setLoading(true);
    const userID = cookies.get('userId');
    const result = await axios.get(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/accounts/${userID}`, {
        withCredentials: true,
      },
    );

    const { account, permissions } = result.data;
    const {
      locationstreet, locationcity, locationstate, locationzip,
    } = account;

    setFirstName(account.firstname);
    setLastName(account.lastname);
    setEmail('p@uci.edu');
    setNumber('(555) 555-5555');
    setAddress(`${locationstreet} ${locationcity}, ${locationstate} ${locationzip}`);
    setBirthday(account.birthdate);
    setTier(account.tier);
    setStatus(permissions.permissions);

    // get req for qualifications
    const qualificationResult = await axios.get(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/qualifications/user/${userID}`, {
        withCredentials: true,
      },
    );

    const qualificationData = qualificationResult.data;
    setQualificationAll(qualificationData);

    setLoading(false);
  }, []);

  if (isLoading) {
    return (<div>Loading user profile...</div>);
  }
  console.log('render'); // Remove this later

  return (
    <div>
      {/* <pre>{JSON.stringify(qualificationAll, null, 2) }</pre> */}
      <div className="page-container">
        <div className="profilePic">
          <img src={profCircle} alt="" width="150" height="150" />
        </div>
        <div className="name">
          {/* <button type="button" onClick={() => { setStatus('Volunteer'); }}>Change to volunteer</button> */}
          <h1 className="userName">{`${firstName} ${lastName}`}</h1>
          {/* <button type="button" onClick={() => { setStatus('Admin'); }}>Change to admin</button> */}
          <ul className="edit-save">
            <button className="editButton" type="button" onClick={() => { history.push('/editProfile'); }}>
              Edit
            </button>
          </ul>
        </div>
        <div className="abt-contact">
          <div className="abtCard">
            <About bday={birthday} tier={tier} status={status} />
          </div>
          <div className="contact">
            <Contact email={email} number={number} address={address} />
          </div>
        </div>
        <div>
          <div className="qualCard">
            <Qualification qualifications={qualificationAll} isEditing={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

viewProfile.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(viewProfile);
