import React, { useState, useEffect } from 'react';
import { instanceOf } from 'prop-types';
import { Helmet } from 'react-helmet';
import { withCookies, Cookies } from 'react-cookie';
import moment from 'moment-timezone';

import { WMKBackend } from '../../common/utils';
import ViewProfile from '../../components/profile/viewProfile/viewProfile';
import EditProfile from '../../components/profile/editProfile/editProfile';

const Profile = ({ cookies }) => {
  const [isLoading, setLoading] = useState(false);
  const [isViewProfile, setIsViewProfile] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState(0);
  const [birthday, setBirthday] = useState(moment());
  const [division, setDivision] = useState(0);
  const [gender, setGender] = useState('');
  const [currentProfilePicture, setCurrentProfilePicture] = useState(null);

  const states = {
    isViewProfile,
    firstName,
    lastName,
    email,
    number,
    street,
    city,
    state,
    zip,
    birthday,
    division,
    gender,
    currentProfilePicture,
  };

  const setStates = {
    setFirstName,
    setLastName,
    setEmail,
    setNumber,
    setStreet,
    setCity,
    setState,
    setZip,
    setBirthday,
    setDivision,
    setGender,
    setCurrentProfilePicture,
  };

  // Use axios GET request to retreive info to backend api
  useEffect(async () => {
    setLoading(true);
    const userID = cookies.get('userId');
    const result = await WMKBackend.get(`/accounts/${userID}`);
    const { data } = await WMKBackend.get('/divisions');

    const { account } = result.data;
    const {
      locationstreet, locationcity, locationstate, locationzip,
    } = account;

    setFirstName(account.firstname);
    setLastName(account.lastname);
    setEmail(account.email);
    setNumber(account.phone);
    setStreet(locationstreet);
    setCity(locationcity);
    setState(locationstate);
    setZip(locationzip);
    setBirthday(moment(account.birthdate));
    setDivision(data.filter((div) => div.id === account.division)[0].div_name);
    setGender(account.gender);
    setCurrentProfilePicture(account.profile_picture);

    const guessTZ = moment.tz.guess();
    console.log(`Guessed timezone: ${guessTZ}`);
    const m = moment(account.birthdate);
    console.log('moment object:');
    console.log(m);
    console.log(`Local time: ${m.format('MM/DD/YYYY, h:mm:ss a')}`);
    console.log(`UTC time: ${m.tz('UTC').format('MM/DD/YYYY, h:mm:ss a')}`);

    setLoading(false);
  }, []);

  if (isLoading) {
    return (<div>Loading user profile...</div>);
  }

  return (
    <div>
      <Helmet>
        <title>Waymakers | Profile</title>
      </Helmet>
      {isViewProfile
        ? <ViewProfile states={states} setIsViewProfile={setIsViewProfile} />
        : <EditProfile states={states} setStates={setStates} setIsViewProfile={setIsViewProfile} />}
    </div>
  );
};

Profile.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Profile);
