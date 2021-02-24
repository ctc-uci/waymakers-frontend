/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './editProfile.css';
import axios from 'axios';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import EditAbout from '../components/profile/editAbout/editAbout.js';
import EditContact from '../components/profile/editContact/editContact.js';
import Qualification from '../components/profile/qualifications/qualifications';

import profCircle from '../images/profCircle.png';

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
  const [qualificationsAll, setQualificationAll] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const history = useHistory();

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

    const qualificationResult = await axios.get(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/qualifications/user/${userID}`, {
        withCredentials: true,
      },
    );

    const qualificationData = qualificationResult.data;
    setQualificationAll(qualificationData);

    setLoading(false);
  }, []);

  // const qualifications = [
  //   {
  //     qualification: 'Valid drivers license',
  //     response: 'Yes',
  //     date: '11/16/2020',
  //     status: 'Qualified',
  //     notes: 'note',
  //   },
  //   {
  //     qualification: 'Completed live scan',
  //     response: 'Yes',
  //     date: '11/19/2020',
  //     status: 'Qualified',
  //     notes: 'note',
  //   },
  //   {
  //     qualification: 'Attended the new volunteer orientation?',
  //     response: 'Yes',
  //     date: '11/16/2020',
  //     status: 'Qualified',
  //     notes: 'note',
  //   },
  // ];

  // Use axios PUT request to send new info to backend api, but only after form is "submitted"
  const updateInfo = async () => {
    await axios.put(
      'http://localhost:3001/accounts/4jkl5llkjljkfs3fsdcs        ', {
        firstname,
        lastname,
        birthdate: birthday,
        locationstreet: street,
        locationcity: city,
        locationstate: state,
        locationzip: zip,
        tier,
        permission: status,
      }, { withCredentials: true },
    );
    history.push('/profile');
  };

  if (isLoading) {
    return (<div>Loading user profile...</div>);
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(qualificationsAll, null, 2) }</pre> */}
      <div className="pg-container">
        <div className="profPic">
          <img src={profCircle} alt="" width="150" height="150" />
        </div>
        <div className="name">
          <h1>{`${firstname} ${lastname}`}</h1>
          <ul className="edit-save">
            <button className="editButton" onClick={updateInfo} type="button">
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
          <div className="cntctCard">
            <EditContact
              email={email}
              setEmail={setEmail}
              firstname={firstname}
              setFirstname={setFirstname}
            />
          </div>
        </div>
        <div>
          <div className="qualCard">
            <Qualification qualifications={qualificationsAll} isEditing />
          </div>
        </div>
      </div>
    </div>
  );
};

editProfile.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(editProfile);
