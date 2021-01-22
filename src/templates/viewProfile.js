import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import '../components/profile/profile.js';
import axios from 'axios';

import About from '../components/profile/about/About';
import Contact from '../components/profile/contact/Contact';
import Availability from '../components/profile/availability/Availability';

import profCircle from '../images/profCircle.png';

function viewProfile(props) {
  // Notes for Preston:
  //  - explain async better?
  //  - explain componentDidMount concept
  //  - explain extra parameter in useEffect
  //  - explain passing props
  //  - explain isLoading
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState('');

  const [tier, setTier] = useState(0);
  const [status, setStatus] = useState('Volunteer');

  const [availabilities, setAvailabilities] = useState([]);

  const [isLoading, setLoading] = useState(false);

  // Use axios GET request to retreive info to backend api
  useEffect(async () => {
    setLoading(true);

    console.log(props);

    const result = await axios.get(
      'http://localhost:3001/accounts/4jkl5llkjljkfs3fsdcs        ', {
        params: {
          accessToken: props.cookies.cookies.accessToken,
        },
      },
    );

    const { account, permissions, availability } = result.data;
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
    setAvailabilities(availability);
    setLoading(false);
  }, []);

  if (isLoading) {
    return (<div>Loading user profile...</div>);
  }
  console.log('render'); // Remove this later

  // Passing user info as props to About, Contact and (eventually) availability components
  // Also, remove the two buttons later
  return (
    <div>
      <div className="page-container">
        <div className="profilePic">
          <img src={profCircle} alt="" width="200" height="200" />
        </div>
        <div className="name">
          <button type="button" onClick={() => { setStatus('Volunteer'); }}>Change to volunteer</button>
          <h3>{`${firstName} ${lastName}`}</h3>
          <button type="button" onClick={() => { setStatus('Admin'); }}>Change to admin</button>
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
          <div className="availCard">
            <Availability availabilities={availabilities} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default viewProfile;
