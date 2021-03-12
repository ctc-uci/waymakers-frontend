import React, { useState, useEffect } from 'react';

import './overview.css';

const axios = require('axios');

const EventDetails = (prop) => {
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
    withCredentials: true,
  });

  const monthDict = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };

  const suffixDict = {
    1: 'st',
    2: 'nd',
    3: 'rd',
  };

  const [eventInfo, setEventInfo] = useState([]);

  const getEventInfo = async () => {
    const currentEvent = await instance.get(`events/${prop.event.id}`);
    setEventInfo(currentEvent.data);
  };

  useEffect(() => {
    getEventInfo();
  }, []);

  const OverviewItem = (event) => {
    const startTimeSplit = event.st.split(':');
    const startTimeSplitHour = parseInt(startTimeSplit[0], 10);
    const startTimeSuffix = startTimeSplitHour >= 12 ? 'PM' : 'AM';
    const startHourTemp = startTimeSplitHour > 12 ? startTimeSplitHour - 12 : startTimeSplitHour;
    const startHour = startHourTemp === 0 ? 12 : startHourTemp;
    const startMinute = startTimeSplit[1];
    const startMonth = monthDict[event.startMonth];

    const endTimeSplit = event.et.split(':');
    const endTimeSplitHour = parseInt(endTimeSplit[0], 10);
    const endTimeSuffix = endTimeSplitHour >= 12 ? 'PM' : 'AM';
    const endHourTemp = endTimeSplitHour > 12 ? endTimeSplitHour - 12 : endTimeSplitHour;
    const endHour = endHourTemp === 0 ? 12 : endHourTemp;
    const endMinute = endTimeSplit[1];
    const endMonth = monthDict[event.endMonth];

    const startDate = `${startMonth} ${event.startDay}${suffixDict[event.startDay % 10] === undefined ? 'th' : suffixDict[event.startDay % 10]}`;
    const endDate = `${endMonth} ${event.endDay}${suffixDict[event.endDay % 10] === undefined ? 'th' : suffixDict[event.endDay % 10]}`;
    return (
      <>
        <h3 className="card-title">
          {startDate}
          {startDate !== endDate ? ` - ${endDate}` : ''}
        </h3>
        <h4 className="card-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
          </svg>
          {' '}
          {startHour}
          :
          {startMinute}
          {startTimeSuffix}
          {' '}
          -
          {' '}
          {endHour}
          :
          {endMinute}
          {endTimeSuffix}
        </h4>
        <h4>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
          {' '}
          {event.location}
        </h4>
        <br />
        <h4>{event.description}</h4>
      </>
    );
  };

  return (
    <>
      {eventInfo.map((event) => (
        <h1>{event.title}</h1>
      ))}
      <h1>Event Details</h1>
      <div className="card" style={{ width: '25rem', backgroundColor: '#E4E4E4' }}>
        <div className="overview-content">
          {eventInfo.map((event) => (
            OverviewItem(event)
          ))}
        </div>
      </div>
    </>
  );
};

export default EventDetails;
