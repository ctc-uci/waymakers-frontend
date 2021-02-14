import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import '../components/profile/profile.js';
import axios from 'axios';
import { startOfWeek, add } from 'date-fns';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import About from '../components/profile/about/About';
import Contact from '../components/profile/contact/Contact';
import Availability from '../components/profile/availability/Availability';

import profCircle from '../images/profCircle.png';

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

  const [availability, setAvailability] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const startWeek = startOfWeek(new Date());

  const stringToDate = (dateString) => {
    const {
      dayofweek, starttime,
    } = dateString;

    const splitTime = String(starttime).split(':');
    const date = add(startWeek, {
      years: 0,
      months: 0,
      weeks: 0,
      days: dayofweek,
      hours: splitTime[0],
      minutes: 0,
      seconds: 0,
    });

    return date;
  };

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

    // get req for availability
    const availabilityResult = await axios.get(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/availability/${userID}`, {
        withCredentials: true,
      },
    );

    const { userAvailability } = availabilityResult.data;

    /* for each date string convert to date.
      destructure: get dayOfWeek and startTime from database
      split
      create date object using add
      dateList is a list dates
    */
    const dateList = userAvailability.map((dateString) => (stringToDate(dateString)));

    setAvailability(dateList);
    setLoading(false);
  }, []);

  if (isLoading) {
    return (<div>Loading user profile...</div>);
  }

  // Passing user info as props to About, Contact and (eventually) availability components
  // Also, remove the two buttons later
  return (
    <div>
      <div className="page-container">
        <div className="profilePic">
          <img src={profCircle} alt="" width="200" height="200" />
        </div>
        <div className="name">
          <h3>{`${firstName} ${lastName}`}</h3>
          <ul className="edit-save">
            <button type="button" onClick={() => { history.push('/editProfile'); }}>
              Edit
            </button>
          </ul>
        </div>
        <div className="abt-contact">
          <div className="abtCard">
            <About bday={birthday} tier={tier} status={status} />
          </div>
          <div className="contactCard">
            <Contact email={email} number={number} address={address} />
          </div>
        </div>
        <div>
          <Availability availabilities={availability} startWeek={startWeek} />
        </div>
      </div>
    </div>
  );
};

viewProfile.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(viewProfile);
