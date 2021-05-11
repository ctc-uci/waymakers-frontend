import React from 'react';
import PropTypes from 'prop-types';

import useMobileWidth from '../../../common/useMobileWidth';
import VolunteerAvailability from '../../dashboard/availability-component/volunteerAvailability/volunteerAvailability';

import Card from '../../../common/Card/Card';
import profilePlaceholder from '../../../assets/profileplaceholder.jpg';
import cake from '../../../assets/birthday.svg';
import people from '../../../assets/volunteer-tier.svg';
import building from '../../../assets/student.svg';
import emailPic from '../../../assets/email.svg';
import phone from '../../../assets/phone.svg';
import house from '../../../assets/house.svg';
import genderIcon from '../../../assets/gender.svg';
import stateIcon from '../../../assets/stateIcon.svg';
import locationPin from '../../../assets/blueLocationPin.svg';

import './viewProfile.css';

const ViewProfile = ({ states, setIsViewProfile }) => {
  const {
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
  } = states;

  const isMobile = useMobileWidth();

  return (
    <div className="profile-page-container">
      <div className="profile-pic">
        <img className="pfp" src={currentProfilePicture || profilePlaceholder} alt="" width="200" height="200" />
      </div>
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
                <p>{division}</p>
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
      <div className="availability-third">
        <VolunteerAvailability />
      </div>
    </div>
  );
};

ViewProfile.propTypes = {
  states: PropTypes.objectOf(PropTypes.any).isRequired,
  setIsViewProfile: PropTypes.bool.isRequired,
};

export default ViewProfile;
