import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Datetime from 'react-datetime';
import moment from 'moment';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import Card from '../../common/Card/Card';
import VolunteerAvailability from '../../components/dashboard/availability-component/volunteerAvailability/volunteerAvailability';
import AdminAvailability from '../../components/dashboard/availability-component/adminAvailability/adminAvailability';
import useMobileWidth from '../../common/useMobileWidth';

import profCircle from '../../assets/profCircle.png';
import cake from '../../assets/birthday.svg';
import people from '../../assets/volunteer-tier.svg';
import building from '../../assets/student.svg';
import emailPic from '../../assets/email.svg';
import phone from '../../assets/phone.svg';
import house from '../../assets/house.svg';
import genderIcon from '../../assets/gender.svg';
import stateIcon from '../../assets/stateIcon.svg';
import locationPin from '../../assets/blueLocationPin.svg';

import './profile.css';

const Profile = (props) => {
  const { cookies } = props;

  const [isViewProfile, setIsViewProfile] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState(0);
  const [birthday, setBirthday] = useState(new Date());

  const [tier, setTier] = useState(0);
  const [gender, setGender] = useState('');
  const [permissions, setPermissions] = useState('Volunteer');

  const [isLoading, setLoading] = useState(false);
  const isMobile = useMobileWidth();

  // Use axios GET request to retreive info to backend api
  useEffect(async () => {
    setLoading(true);
    const userID = cookies.get('userId');
    const result = await axios.get(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/accounts/${userID}`, {
        withCredentials: true,
      },
    );

    const { account } = result.data;
    const {
      locationstreet, locationcity, locationstate, locationzip,
    } = account;

    setPermissions(result.data.permissions.permissions);
    setFirstName(account.firstname);
    setLastName(account.lastname);
    setEmail(account.email);
    setNumber(account.phone);
    setStreet(locationstreet);
    setCity(locationcity);
    setState(locationstate);
    setZip(locationzip);
    setBirthday(new Date(account.birthdate));
    setTier(account.tier);
    setGender(account.gender);

    setLoading(false);
  }, []);

  // Use axios PUT request to send new info to backend api, but only after form is "submitted"
  const updateInfo = async () => {
    const userID = cookies.get('userId');
    const response = await axios.put(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/accounts/${userID}`, {
        firstName,
        lastName,
        email,
        phone: number,
        birthDate: moment(birthday).format(),
        locationStreet: street,
        locationCity: city,
        locationState: state,
        locationZip: zip,
        tier,
        gender,
      }, { withCredentials: true },
    );
    console.log(`status: ${response.status}`);

    setIsViewProfile(true);
  };

  const cancelEditInfo = async () => {
    const userID = cookies.get('userId');
    const result = await axios.get(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/accounts/${userID}`, {
        withCredentials: true,
      },
    );

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
    setBirthday(new Date(account.birthdate));
    setTier(account.tier);
    setGender(account.gender);

    setIsViewProfile(true);
  };

  if (isLoading) {
    return (<div>Loading user profile...</div>);
  }

  return (
    <>
      {isViewProfile
        ? (
          <div className="profile-page-container">
            <img src={profCircle} alt="" width="200" height="200" />
            <div className="name">
              <h3 className="profile-name">{`${firstName} ${lastName}`}</h3>
              <button type="button" className="profile-edit-save profile-edit-button" onClick={() => { setIsViewProfile(false); }}>
                <p className="large">Edit</p>
              </button>
            </div>
            <div className="profile-cards word-break">
              <div className="profile-card">
                <h4 className="card-title">About</h4>
                <div className="card-body">
                  <Card className="about-card">
                    <div className="info-section">
                      <img className="about-icons" src={cake} alt="" />
                      <p>{birthday !== '' && `${birthday.getMonth() + 1}/${birthday.getDate()}/${birthday.getFullYear()}`}</p>
                    </div>
                    <div className="info-section">
                      <img className="about-icons" src={people} alt="" />
                      <p>{tier}</p>
                    </div>
                    <div className="info-section">
                      <img className="about-icons" src={genderIcon} alt="" />
                      <p>{gender}</p>
                    </div>
                  </Card>
                </div>
              </div>
              <div className="profile-card">
                <div className="contact-card">
                  <h4 className="card-title">Contact Info</h4>
                  <div className="card-body">
                    <Card className="contact-card">
                      <div className="info-section">
                        <img className="contact-icons" src={emailPic} alt="" />
                        <p>{email}</p>
                      </div>
                      <div className="info-section">
                        <img className="contact-icons" src={phone} alt="" />
                        <p>{number}</p>
                      </div>
                      <div className="info-section">
                        <img className="contact-icons" src={house} alt="" />
                        <p>{street}</p>
                      </div>
                      {isMobile
                        ? (
                          <>
                            <div className="info-section">
                              <img className="contact-icons" src={building} alt="" />
                              <p>{city}</p>
                            </div>
                            <div className="location-section">
                              <div className="info-section contact-info-section">
                                <img className="contact-icons" src={stateIcon} alt="" />
                                <p>{state}</p>
                              </div>
                              <div className="info-section contact-info-section">
                                <img className="contact-icons" src={locationPin} alt="" />
                                <p>{zip}</p>
                              </div>
                            </div>
                          </>
                        )
                        : (
                          <div className="location-section">
                            <div className="info-section">
                              <img className="contact-icons" src={building} alt="" />
                              <p>{city}</p>
                            </div>
                            <div className="info-section">
                              <img className="contact-icons" src={stateIcon} alt="" />
                              <p>{state}</p>
                            </div>
                            <div className="info-section">
                              <img className="contact-icons" src={locationPin} alt="" />
                              <p>{zip}</p>
                            </div>
                          </div>
                        )}
                    </Card>
                  </div>
                </div>
              </div>
            </div>
            {(permissions === 'Volunteer') ? <VolunteerAvailability /> : <AdminAvailability />}
          </div>
        )
        : (
          <div className="profile-page-container">
            <div className="profilePic">
              <img src={profCircle} alt="" width="200" height="200" />
            </div>
            <div className="name">
              <h3 className="profile-name">{`${firstName} ${lastName}`}</h3>
              <div className="profile-edit-mode-buttons">
                <button className="profile-edit-save profile-save-button" onClick={updateInfo} type="button">
                  <p className="large profile-save-button-text">Save</p>
                </button>
                <button className="profile-edit-save" onClick={cancelEditInfo} type="button">
                  <p className="large">Cancel</p>
                </button>
              </div>
            </div>
            <div className="profile-cards">
              <div className="profile-card">
                <h4 className="card-title">About</h4>
                <div className="card-body">
                  <Card className="about-card">
                    <form>
                      <div className="about-input">
                        <img className="about-icons" src={cake} alt="" />
                        <div className="datetime-input-box">
                          <Datetime
                            initialValue={birthday}
                            onChange={(e) => setBirthday(new Date(e))}
                            timeFormat={false}
                          />
                        </div>
                      </div>
                      <div className="about-input tier-input">
                        <img className="about-icons" src={people} alt="" />
                        <span className="tier-box">{tier}</span>
                      </div>
                      <div className="about-input gender-input">
                        <img className="about-icons" src={genderIcon} alt="" />
                        <input className="profile-input-box" value={gender} name="gender" onChange={(e) => setGender(e.target.value)} />
                      </div>
                    </form>
                  </Card>
                </div>
              </div>
              <div className="profile-card">
                <div className="contact-card">
                  <h4 className="card-title">Contact Info</h4>
                  <div className="card-body">
                    <Card className="contact-card">
                      <form>
                        <div className="contact-input">
                          <img className="contact-icons" src={emailPic} alt="" />
                          <input className="profile-input-box" type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="contact-input">
                          <img className="contact-icons" src={phone} alt="" />
                          <input className="profile-input-box" type="tel" value={number} name="number" onChange={(e) => setNumber(e.target.value)} />
                        </div>
                        <div className="contact-input">
                          <img className="contact-icons" src={house} alt="" />
                          <input className="profile-input-box" type="text" value={street} name="street" onChange={(e) => setStreet(e.target.value)} />
                        </div>
                        {isMobile
                          ? (
                            <>
                              <div className="contact-input">
                                <img className="contact-icons" src={building} alt="" />
                                <input className="profile-input-box" type="city" value={city} name="city" onChange={(e) => setCity(e.target.value)} />
                              </div>
                              <div className="location-section">
                                <div className="contact-input info-section contact-info-section info-section location-input location-margin">
                                  <img className="contact-icons" src={stateIcon} alt="" />
                                  <input className="profile-input-box" type="text" value={state} name="state" onChange={(e) => setState(e.target.value)} maxLength="2" />
                                </div>
                                <div className="contact-input info-section contact-info-section">
                                  <img className="contact-icons" src={locationPin} alt="" />
                                  <input className="profile-input-box" type="text" value={zip} name="zip" onChange={(e) => setZip(e.target.value)} maxLength="2" />
                                </div>
                              </div>
                            </>
                          )
                          : (
                            <div className="location-section">
                              <div className="info-section location-input location-margin">
                                <img className="contact-icons" src={building} alt="" />
                                <input className="profile-input-box" type="text" value={city} name="city" onChange={(e) => setCity(e.target.value)} />
                              </div>
                              <div className="info-section location-input location-margin">
                                <img className="contact-icons" src={stateIcon} alt="" />
                                <input className="profile-input-box state-input" type="text" value={state} name="state" onChange={(e) => setState(e.target.value)} maxLength="2" />
                              </div>
                              <div className="info-section location-input location-margin">
                                <img className="contact-icons" src={locationPin} alt="" />
                                <input className="profile-input-box zip-input" type="text" value={zip} name="zip" onChange={(e) => setZip(e.target.value)} maxLength="2" />
                              </div>
                            </div>
                          )}
                      </form>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
            {(permissions === 'Volunteer') ? <VolunteerAvailability /> : <AdminAvailability />}
          </div>
        )}
    </>
  );
};

Profile.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Profile);
