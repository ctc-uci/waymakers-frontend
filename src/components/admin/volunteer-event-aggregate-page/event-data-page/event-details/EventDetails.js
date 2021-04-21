import React from 'react';
import useEvent from './useEvent';

import clockIcon from '../../../../../assets/clock.svg';
import locationPinIcon from '../../../../../assets/blueLocationPin.svg';

import './EventDetails.css';

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
  const [event, eventMeta] = useEvent(prop.event.id);
  console.log(eventMeta);

  const suffixDict = {
    1: 'st',
    2: 'nd',
    3: 'rd',
  };

  const prettifyDate = () => {
    const startTime = new Date(event.startTime);
    const endTime = new Date(event.endTime);

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
    const startTime = new Date(event.startTime);
    const endTime = new Date(event.endTime);
    const startMeridiem = startTime.getHours() < 12 ? 'AM' : 'PM';
    const endMeridiem = endTime.getHours() < 12 ? 'AM' : 'PM';

    return `${startTime.toLocaleTimeString().slice(0, -6)}${startMeridiem} to ${endTime.toLocaleTimeString().slice(0, -6)}${endMeridiem}`;
  };

  if (eventMeta.isInitializing) {
    return <div>isInitializing</div>;
  }

  if (eventMeta.isLoading) {
    return <div>isLoading</div>;
  }

  if (eventMeta.error) {
    return <div>errored</div>;
  }

  if (event.length === 0) {
    return <div>no data</div>;
  }

  return (
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
          <span className="event-info-detail">{event.location}</span>
        </div>
        <p className="event-description">{event.description}</p>
      </div>
    </div>
  );
};

export default Overview;
