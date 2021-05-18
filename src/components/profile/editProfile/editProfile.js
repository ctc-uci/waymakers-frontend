/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-env browser */
import React, { useState } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import Datetime from 'react-datetime';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import useMobileWidth from '../../../common/useMobileWidth';
import { WMKBackend, normalizePhoneInput } from '../../../common/utils';

import DeleteAccountModal from '../deleteAccountModal/deleteAccountModal';
import ImageCropper from '../profilePictureCropper/imageCropper';
import VolunteerAvailability from '../../dashboard/availability-component/volunteerAvailability/volunteerAvailability';

import { createAlert } from '../../../common/AlertBanner/AlertBannerSlice';

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
import cameraIcon from '../../../assets/cameraIcon.svg';

import './editProfile.css';

const EditProfile = ({
  states,
  setStates,
  setIsViewProfile,
  cookies,
}) => {
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

  const {
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
  } = setStates;

  const dispatch = useDispatch();
  const reader = new FileReader();
  const [uploadedFile, setUploadedFile] = useState(null); // Base64 string of the file bing uploaded
  const [uploadedFilePreview, setUploadedFilePreview] = useState(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMobileWidth();

  // Uploads a user's profile picture and returns url
  const uploadPicture = async () => {
    // Gets Amazon upload URL
    // const { res: { data: uploadUrl } } = await WMKBackend.get('/accounts/s3Url');
    const { data: uploadUrl } = await WMKBackend.get('/accounts/s3Url');

    // Upload image to amazon s3
    await axios.put(uploadUrl, uploadedFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Get profile picture image
    const imageUrl = uploadUrl.split('?')[0];
    return imageUrl;
  };

  const handleImageInputChange = (e) => {
    reader.addEventListener('load', () => {
      setUploadedFile(reader.result);
      setIsCropperOpen(true);
    });
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
    }
    e.target.value = null;
  };

  // Use axios PUT request to send new info to backend api, but only after form is "submitted"
  const updateInfo = async () => {
    const userID = cookies.get('userId');

    try {
      const payload = {
        firstName,
        lastName,
        email,
        phone: number,
        birthDate: moment(birthday).format(),
        locationStreet: street,
        locationCity: city,
        locationState: state,
        locationZip: zip,
        division,
        gender,
        profilePicture: currentProfilePicture,
      };

      if (uploadedFile) {
        payload.profilePicture = await uploadPicture();
        setCurrentProfilePicture(payload.profilePicture);
      }
      await WMKBackend.put(`/accounts/${userID}`, payload);

      localStorage.setItem('profilePicture', payload.profilePicture);
      dispatch(createAlert({
        message: 'Successfully updated user profile information!',
        severity: 'success',
      }));
    } catch (e) {
      console.error(e);
      dispatch(createAlert({
        message: 'There was a problem updating user profile information!',
        severity: 'error',
      }));
    }
    setIsViewProfile(true);
  };

  const cancelEditInfo = async () => {
    const userID = cookies.get('userId');
    const result = await WMKBackend.get(`/accounts/${userID}`);

    const { account } = result.data;

    setFirstName(account.firstname);
    setLastName(account.lastname);
    setEmail(account.email);
    setNumber(account.phone);
    setStreet(account.locationstreet);
    setCity(account.locationcity);
    setState(account.locationstate);
    setZip(account.locationzip);
    setBirthday(moment(account.birthdate));
    setDivision(account.division);
    setGender(account.gender);
    setCurrentProfilePicture(account.profile_picture);

    setIsViewProfile(true);
  };

  return (
    <div className="profile-page-container">
      <DeleteAccountModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <ImageCropper
        imageSrc={uploadedFile}
        setCropped={setUploadedFile}
        setPreview={setUploadedFilePreview}
        isOpen={isCropperOpen}
        setIsOpen={setIsCropperOpen}
      />
      <div className="profile-picture-section">
        <label htmlFor="image-input">
          <img
            className="profile-picture"
            src={uploadedFilePreview || currentProfilePicture || profilePlaceholder}
            alt=""
          />
          <img src={cameraIcon} className="upload-button" alt="upload" />
        </label>
      </div>
      <input
        id="image-input"
        className="default-file-input"
        type="file"
        onChange={handleImageInputChange}
        accept="image/jpg, image/png, image/jpeg"
        hidden
      />
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
                      onChange={(e) => setBirthday(e)}
                      timeFormat={false}
                      displayTimeZone="utc"
                    />
                  </div>
                </div>
                <div className="tier-input">
                  <img className="about-icons" src={people} alt="" />
                  <span className="tier-box">{division}</span>
                </div>
                <div className="about-input gender-input contact-input">
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
                    <input className="profile-input-box" type="tel" value={number} name="number" onChange={(e) => setNumber(normalizePhoneInput(e.target.value, number))} />
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
                            <input className="profile-input-box" type="text" value={zip} name="zip" onChange={(e) => setZip(e.target.value)} maxLength="5" />
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
                          <input className="profile-input-box zip-input" type="text" value={zip} name="zip" onChange={(e) => setZip(e.target.value)} maxLength="5" />
                        </div>
                      </div>
                    )}
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="availability-third">
        <VolunteerAvailability />
      </div>
      <button type="button" className="profile-delete-button" onClick={() => setIsModalOpen(true)}>Delete Account</button>
    </div>
  );
};

EditProfile.propTypes = {
  states: PropTypes.objectOf(PropTypes.any).isRequired,
  setStates: PropTypes.objectOf(PropTypes.any).isRequired,
  setIsViewProfile: PropTypes.func.isRequired,
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(EditProfile);
