import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { addUserEvent } from '../redux/actions';

import './eventPopup.css';
import locationPinIcon from '../../../images/locationPin.svg';
import folderIcon from '../../../images/folder.svg';
import peopleIcon from '../../../images/peopleIcon.svg';

const axios = require('axios');

const dayList = [
  'SUN', 'MON', 'TUE', 'WED',
  'THU', 'FRI', 'SAT',
];

const monthList = [
  'JAN', 'FEB', 'MAR', 'APR',
  'MAY', 'JUN', 'JUL', 'AUG',
  'SEPT', 'OCT', 'NOV', 'DEC',
];

const EventPopup = ({
  event, onClose, canAdd, addEventToUserCalendar, cookies,
}) => {
  console.log(event.extendedProps.eventLimit);
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);

  // Current event attendance
  const [capacity, setCapacity] = useState(event.extendedProps.eventLimit);

  const getAttendance = async () => {
    const instance = axios.create({
      baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
      withCredentials: true,
    });
    const eventInfo = await instance.get(`userEvent/attendance/${event.id}`);
    if (eventInfo.data.length >= 1) {
      const space = parseInt(event.extendedProps.eventLimit, 10)
                    - parseInt(eventInfo.data[0].attendance, 10);
      setCapacity(space >= 0 ? space : 0);
    }
  };

  // Get event attendance on page load
  useEffect(() => {
    getAttendance();
  }, []);

  // Renders add button if addEvent was passed in (so MyEvents will have no add button)
  const renderAddButton = () => {
    if (canAdd === true && capacity > 0) {
      const addEvent = () => {
        if (capacity > 0) {
          addEventToUserCalendar(cookies.cookies.userId, event.id);
          onClose();
        }
      };
      return (
        <button className="button confirm-button" type="button" aria-label="add event to my cal" onClick={addEvent}>Confirm</button>
      );
    }
    return null;
  };

  const prettifyDate = () => {
    const startTime = `${dayList[startDate.getDay()]} ${monthList[startDate.getMonth()]} ${startDate.getDate()} ${startDate.getFullYear()} ${startDate.toLocaleTimeString()}`;
    const endTime = `\n${dayList[endDate.getDay()]} ${monthList[endDate.getMonth()]} ${endDate.getDate()} ${endDate.getFullYear()}`;
    const differentDays = startDate.getFullYear() !== endDate.getFullYear()
                          || startDate.getMonth() !== endDate.getMonth()
                          || startDate.getDate() !== endDate.getDate();
    return `${startTime} - ${differentDays ? endTime : ''} ${endDate.toLocaleTimeString()}`;
  };

  return (
    <div className="popup">
      <div className="event-image">
        Image
      </div>
      <div className="event-info">
        <div className="popup-header">
          <span className="event-time">
            {prettifyDate()}
          </span>
          <br />
          <span className="event-name">{event.title}</span>
        </div>
        <div className="details-section">
          <h3>Details</h3>
          <div className="event-detail">
            <img className="event-detail-icon" src={locationPinIcon} alt="location" />
            <span className="event-detail-label">{event.extendedProps.location}</span>
          </div>
          <div className="event-detail">
            <img className="event-detail-icon" src={folderIcon} alt="folder" />
            <span className="event-detail-label">{event.extendedProps.division}</span>
          </div>
          <div className="event-detail">
            <img className="event-detail-icon" src={peopleIcon} alt="people" />
            <span className="event-detail-label">
              {capacity}
              /
              {event.extendedProps.eventLimit}
              {' '}
              Spots Remaining
            </span>
          </div>
        </div>
        <div className="event-description">
          {event.extendedProps.description}
        </div>
        <div className="event-buttons">
          {renderAddButton()}
          <button className="button cancel-button" type="button" aria-label="close popup" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

EventPopup.propTypes = {
  event: PropTypes.objectOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
  canAdd: PropTypes.bool.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  addEventToUserCalendar: PropTypes.func.isRequired,
};

export default withCookies(connect(null, {
  addEventToUserCalendar: addUserEvent,
})(EventPopup));
