/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-env browser */
import React, { useState, useEffect } from 'react';
import {
  startOfWeek, add, getHours, getDay,
} from 'date-fns';
import { useHistory } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';

import { WMKBackend } from '../common/utils';

import EditAbout from '../components/profile/editAbout/editAbout';
import EditContact from '../components/profile/editContact/editContact';
import EditAvailability from '../components/dashboard/availability-component/volunteerAvailability/editAvailability/editAvailability';
import ImageCropper from '../components/profile/profilePictureCropper/imageCropper';

import profCircle from '../assets/profCircle.png';
import cameraIcon from '../assets/cameraIcon.svg';

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
  const reader = new FileReader();

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

  // User's current profile picture in the database
  const [pfpLink, setpfpLink] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null); // Base64 string of the file bing uploaded
  const [uploadedFilePreview, setUploadedFilePreview] = useState(null);
  // const [croppedImage, setCroppedImage] = useState(null); // Cropped image FILE
  const [isCropperOpen, setIsCropperOpen] = useState(false);

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

  // Uploads a user's profile picture and returns url
  const uploadPicture = async () => {
    // Gets Amazon upload URL
    // const { res: { data: uploadUrl } } = await WMKBackend.get('/accounts/s3Url');
    const { data: uploadUrl } = await WMKBackend.get('/accounts/s3Url');
    // const uploadUrl = res.data;
    console.log(uploadUrl);

    // Upload image to amazon s3
    await axios.put(uploadUrl, uploadedFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Get profile picture image
    const imageUrl = uploadUrl.split('?')[0];
    console.log(imageUrl);
    return imageUrl;
  };

  useEffect(async () => {
    setLoading(true);
    const userID = cookies.get('userId');
    const result = await WMKBackend.get(`/accounts/${userID}`);
    const { account, permissions } = result.data;
    const {
      locationstreet, locationcity, locationstate, locationzip,
    } = account;
    console.log(account.profile_picture);
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
    setpfpLink(account.profile_picture);

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
    const dateList = availability.map((date) => (parseDate(date)));
    const seen = new Set();
    const filteredDates = dateList.filter((date) => {
      const duplicate = seen.has(date.toString());
      seen.add(date.toString());
      return !duplicate;
    });

    try {
      const payload = {
        firstname,
        lastname,
        birthdate: birthday,
        locationstreet: street,
        locationcity: city,
        locationstate: state,
        locationzip: zip,
        tier,
        permission: status,
        profilePicture: pfpLink,
      };

      if (uploadedFile) {
        payload.profilePicture = await uploadPicture();
      }
      console.log(payload);

      await WMKBackend.put(`/accounts/${userID}`, payload);

      await WMKBackend.post(`/availability/${userID}`, {
        dates: filteredDates,
      });

      history.push('/profile');
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) {
    return (<div>Loading user profile...</div>);
  }

  return (
    <div className="page-container">
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
            src={uploadedFilePreview || pfpLink || profCircle}
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
  );
};

editProfile.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(editProfile);
