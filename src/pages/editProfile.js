/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import {
  startOfWeek, add, getHours, getDay,
} from 'date-fns';
import { useHistory } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import { WMKBackend } from '../common/utils';

import EditAbout from '../components/profile/editAbout/editAbout.js';
import EditContact from '../components/profile/editContact/editContact.js';
import EditAvailability from '../components/dashboard/availability-component/volunteerAvailability/editAvailability/editAvailability';

import profCircle from '../assets/profCircle.png';

import './editProfile.css';

const editProfile = (props) => {
  // Idea: we have states for each of the information fields we're allowed to change
  // Then, we have a handle function for each of those states that we pass down as props to
  // the edit components.

  // Things to address:
  // - Updating issue with edit profile
  // - How are we dealing with availability?
  // - Might need to update DB to include a field for phone number
  // - Email will come from auth in front end
  // - Is this the best way to do a put? Ideally we only wanna update what we actually changed.
  //    - Also make sure to figure out async for loop in backend
  // - Given the way we chose to represent address, how do we wanna edit it?
  //    - (have multiple fields to parse?)
  //    - Keep as free form text?
  // - How do we deal with bday since date format for PSQL is wack?
  //    - use JS date object?
  const { cookies } = props;

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const [email, setEmail] = useState('');
  // const [number, setNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState(0);
  const [birthday, setBirthday] = useState('');

  const [tier, setTier] = useState(3);
  const [status, setStatus] = useState('Volunteer');

  const [isLoading, setLoading] = useState(false);

  const history = useHistory();
  const [availability, setAvailability] = useState([]);

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

  // for post/put list of dates -> list of tuples [(dayOfWeek, startTime)]

  const parseDate = (date) => {
    const hours = getHours(date);
    return [getDay(date), `${hours}:00:00`];
  };

  useEffect(async () => {
    setLoading(true);
    const userID = cookies.get('userId');
    const result = await WMKBackend.get(`/accounts/${userID}`);
    const { account, permissions } = result.data;
    const {
      locationstreet, locationcity, locationstate, locationzip,
    } = account;

    setFirstname(account.firstname);
    setLastname(account.lastname);
    setEmail('p@uci.edu');
    // setNumber('(555) 555-5555');
    setStreet(locationstreet);
    setCity(locationcity);
    setState(locationstate);
    setZip(locationzip);
    setBirthday(account.birthdate);
    setTier(account.tier);
    setStatus(permissions.permissions);

    // get req for availability
    const availabilityResult = await WMKBackend.get(`/availability/${userID}`);

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

  // Use axios PUT request to send new info to backend api, but only after form is "submitted"
  const updateInfo = async () => {
    const dateList = availability.map((date) => (parseDate(date)));

    const seen = new Set();

    const filteredDates = dateList.filter((date) => {
      const duplicate = seen.has(date.toString());
      seen.add(date.toString());
      return !duplicate;
    });

    const userID = cookies.get('userId');
    await WMKBackend.put(`/accounts/${userID}`, {
      firstname,
      lastname,
      birthdate: birthday,
      locationstreet: street,
      locationcity: city,
      locationstate: state,
      locationzip: zip,
      tier,
      permission: status,
    });

    await WMKBackend.post(`/availability/${userID}`, {
      dates: filteredDates,
    });

    history.push('/profile');
  };

  if (isLoading) {
    return (<div>Loading user profile...</div>);
  }

  return (
    <div>
      <div className="page-container">
        <div className="profilePic">
          <img src={profCircle} alt="" width="200" height="200" />
        </div>
        <div className="name">
          <h3>{`${firstname} ${lastname}`}</h3>
          <ul className="edit-save">
            <button onClick={updateInfo} type="button">
              Save
            </button>
          </ul>
        </div>
        <div className="abt-contact">
          <div className="abtCard">
            <EditAbout
              tier={tier}
              setTier={setTier}
              status={status}
              setStatus={setStatus}
            />
          </div>
          <div className="contactCard">
            <EditContact
              email={email}
              setEmail={setEmail}
              firstname={firstname}
              setFirstname={setFirstname}
            />
          </div>
        </div>
        <div>
          <EditAvailability
            availabilityTimes={availability}
            setAvailabilityTimes={setAvailability}
            startWeek={startWeek}
          />
        </div>
      </div>
    </div>
  );
};

editProfile.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(editProfile);
