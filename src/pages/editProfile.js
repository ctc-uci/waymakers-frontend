/* eslint-env browser */
import React, { useState, useEffect } from 'react';
import {
  startOfWeek, add, getHours, getDay,
} from 'date-fns';
import { useHistory } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';
import ReactCrop from 'react-image-crop';

import { WMKBackend } from '../common/utils';

import EditAbout from '../components/profile/editAbout/editAbout';
import EditContact from '../components/profile/editContact/editContact';
import EditAvailability from '../components/dashboard/availability-component/volunteerAvailability/editAvailability/editAvailability';

import profCircle from '../assets/profCircle.png';

import 'react-image-crop/dist/ReactCrop.css';
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

  // User's current profile picture in the database
  const [currentProfilePicture, setCurrentProfilePicture] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null); // File bing uploaded

  // Used for cropping profile pictures
  const imagePreviewCanvasRef = React.createRef();
  const [crop, setCrop] = useState({
    aspect: 1,
    width: 400,
    height: 400,
  });

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
    const res = await WMKBackend.get('/accounts/s3Url');
    const uploadUrl = res.data;

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
    setCurrentProfilePicture(account.profile_picture);

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
  const updateInfo = async (event) => {
    event.persist();
    const userID = cookies.get('userId');
    const dateList = availability.map((date) => (parseDate(date)));
    const seen = new Set();
    const filteredDates = dateList.filter((date) => {
      const duplicate = seen.has(date.toString());
      seen.add(date.toString());
      return !duplicate;
    });

    try {
      let newProfilePictureURL = currentProfilePicture;
      if (uploadedFile) {
        newProfilePictureURL = await uploadPicture();
      }

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
        profilePicture: newProfilePictureURL,
      });

      await WMKBackend.post(`/availability/${userID}`, {
        dates: filteredDates,
      });

      history.push('/profile');
    } catch (e) {
      console.error(e);
    }
  };

  // Converts a base 64 string (a sort of encoding) to a file
  const base64StringtoFile = (base64String, filename) => {
    console.log(updateInfo);
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n >= 0) {
      u8arr[n] = bstr.charCodeAt(n);
      n -= 1;
    }
    return new File([u8arr], filename, { type: mime });
  };

  // Gets the original file extension from a base 64 string
  const extractImageFileExtensionFromBase64 = (base64Data) => (
    base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'))
  );

  // Converts an image to a canvas reference
  const image64toCanvasRef = (canvasRef, image64, pixelCrop) => {
    const canvas = canvasRef;
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = image64;
    image.onload = () => {
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
      );
    };
  };

  const handleOnCrop = (c) => {
    if (c.width <= 400 && c.height <= 400) setCrop(c);
  };

  const handleCropComplete = (c) => {
    const canvasRef = imagePreviewCanvasRef.current;
    console.log(imagePreviewCanvasRef);
    image64toCanvasRef(canvasRef, currentProfilePicture, c);
  };

  const handlePreviewCroppedClick = (e) => {
    e.preventDefault();
    const canvasRef = imagePreviewCanvasRef.current;
    const fileExtension = extractImageFileExtensionFromBase64(currentProfilePicture);
    const fileName = `joe.${fileExtension}`;
    const newFile = canvasRef.toDataURL(`image/${fileExtension}`);
    setUploadedFile(base64StringtoFile(newFile, fileName));
  };

  const imageCropper = () => (
    <ReactCrop
      src={currentProfilePicture}
      crop={crop}
      onChange={handleOnCrop}
      onComplete={handleCropComplete}
    />
  );

  if (isLoading) {
    return (<div>Loading user profile...</div>);
  }

  return (
    <div>
      <div className="page-container">
        <div className="profilePic">
          <img src={currentProfilePicture || profCircle} alt="" width="200" height="200" />
          {uploadedFile ? imageCropper() : null}
          <canvas ref={imagePreviewCanvasRef} />
          <img src={uploadedFile ? URL.createObjectURL(uploadedFile) : null} alt="uploaded" crossOrigin="anonymous" />
        </div>
        <input
          id="imageInput"
          type="file"
          onChange={(e) => {
            e.persist();
            const profilePic = e.target.files[0];
            const reader = new window.FileReader();
            reader.addEventListener('load', () => {
              setCurrentProfilePicture(reader.result);
            });
            if (profilePic) {
              reader.readAsDataURL(profilePic);
              setUploadedFile(profilePic);
            }
          }}
        />
        <div className="name">
          <h3>{`${firstname} ${lastname}`}</h3>
          <ul className="edit-save">
            <button onClick={handlePreviewCroppedClick} type="button">
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
