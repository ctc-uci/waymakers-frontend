import React from 'react';
import useEvent from './useEvent';

import { TitledCard } from '../../../../../common/Card';

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
    return <TitledCard title="Event Details">isInitializing</TitledCard>;
  }

  if (eventMeta.isLoading) {
    return <TitledCard title="Event Details">isLoading</TitledCard>;
  }

  if (eventMeta.error) {
    return <TitledCard title="Event Details">errored</TitledCard>;
  }

  if (event.length === 0) {
    return <TitledCard title="Event Details">no data</TitledCard>;
  }

  return (
    <TitledCard title="Event Details">
      <div className="event-details-container">
        <p className="large">{prettifyDate()}</p>
        <div className="event-info-container">
          <img className="event-info-icon" src={clockIcon} alt="time" />
          <p>{prettifyTime()}</p>
        </div>
        <div className="event-info-container">
          <img className="event-info-icon" src={locationPinIcon} alt="location" />
          <p>{event.location}</p>
        </div>
        <p>{event.description}</p>
      </div>
    </TitledCard>
  );
};

export default Overview;
