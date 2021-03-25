import React, { useState, useEffect } from 'react';

import clockIcon from '../../../../../assets/clock.svg';
import locationPinIcon from '../../../../../assets/blueLocationPin.svg';
import './EventDetails.css';

const axios = require('axios');

// const dayList = [
//   'SUN', 'MON', 'TUE', 'WED',
//   'THU', 'FRI', 'SAT',
// ];

const monthList = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];

const Overview = (prop) => {
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
    withCredentials: true,
  });

  const suffixDict = {
    1: 'st',
    2: 'nd',
    3: 'rd',
  };

  const [eventInfo, setEventInfo] = useState([]);

  const getEventInfo = async () => {
    const currentEvent = await instance.get(`events/${prop.event.id}`);
    setEventInfo(currentEvent.data[0]);
  };

  useEffect(() => {
    getEventInfo();
  }, []);

  const prettifyDate = () => {
    const startTime = new Date(eventInfo.startTime);
    const endTime = new Date(eventInfo.endTime);

    const differentDays = startTime.getFullYear() !== endTime.getFullYear()
                          || startTime.getMonth() !== endTime.getMonth()
                          || startTime.getDate() !== endTime.getDate();

    if (differentDays) {
      if (startTime.getFullYear() !== endTime.getFullYear()) {
        return `${monthList[startTime.getMonth()]}, ${startTime.getDate()} ${startTime.getFullYear()} - ${monthList[endTime.getMonth()]}, ${endTime.getDate()} ${endTime.getFullYear()}`;
      } if (startTime.getMonth() !== endTime.getMonth()) {
        return `${monthList[startTime.getMonth()]} ${startTime.getDate()} - ${monthList[endTime.getMonth()]} ${endTime.getDate()}`;
      }
      return `${monthList[startTime.getMonth()]} ${startTime.getDate()} - ${endTime.getDate()}`;
    }
    return `${monthList[startTime.getMonth()]} ${startTime.getDate()}${suffixDict[startTime.getDate() % 10] === undefined ? 'th' : suffixDict[startTime.getDate() % 10]}`;
  };

  const prettifyTime = () => {
    const startTime = new Date(eventInfo.startTime);
    const endTime = new Date(eventInfo.endTime);
    const startMeridiem = startTime.getHours() < 12 ? 'AM' : 'PM';
    const endMeridiem = endTime.getHours() < 12 ? 'AM' : 'PM';

    return `${startTime.toLocaleTimeString().slice(0, -6)}${startMeridiem} to ${endTime.toLocaleTimeString().slice(0, -6)}${endMeridiem}`;
  };

  return (
    <>
      {eventInfo.length !== 0 && (
        <div className="event-details-aggregate">
          <h2 className="event-details-title">Event Details</h2>
          <div className="overview-container">
            <p className="event-date">{prettifyDate()}</p>
            <div className="event-info">
              <img className="event-info-icon" src={clockIcon} alt="time" />
              <span className="event-info-detail">{prettifyTime()}</span>
            </div>
            <div className="event-info">
              <img className="event-info-icon" src={locationPinIcon} alt="location" />
              <span className="event-info-detail">{eventInfo.location}</span>
            </div>
            <p className="event-description">{eventInfo.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;
