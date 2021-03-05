import React from 'react';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import {
  addUserEvent,
  removeUserEvent,
  fetchEvents,
  setShowPopup,
  changePopupType,
} from '../redux/actions';
import { getPopupType } from '../redux/selectors';
import store from '../redux/store';

import './eventPopup.css';

import locationPinIcon from '../../../images/locationPin.svg';
import folderIcon from '../../../images/folder.svg';
import peopleIcon from '../../../images/peopleIcon.svg';
import cross from '../../../images/cross.svg';

const dayList = [
  'SUN', 'MON', 'TUE', 'WED',
  'THU', 'FRI', 'SAT',
];

const monthList = [
  'JAN', 'FEB', 'MAR', 'APR',
  'MAY', 'JUN', 'JUL', 'AUG',
  'SEPT', 'OCT', 'NOV', 'DEC',
];

// TODO: Scale eventPopup based on viewport height
const EventPopup = ({
  event, addEventToUserCalendar, removeEventFromUserCalendar, cookies, popupType,
}) => {
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);

  const cancelButton = (
    <button
      className="button cancel-button"
      type="button"
      aria-label="close popup"
      onClick={() => {
        store.dispatch(setShowPopup(false));
      }}
    >
      Cancel
    </button>
  );

  const prettifyDate = () => {
    const startMeridiem = startDate.getHours() < 12 ? 'AM' : 'PM';
    const endMeridiem = endDate.getHours() < 12 ? 'AM' : 'PM';
    const startTime = `${dayList[startDate.getDay()]} ${monthList[startDate.getMonth()]} ${startDate.getDate()} ${startDate.getFullYear()} ${startDate.toLocaleTimeString().slice(0, -6)} ${startMeridiem}`;
    const endTime = `\n${dayList[endDate.getDay()]} ${monthList[endDate.getMonth()]} ${endDate.getDate()} ${endDate.getFullYear()}`;
    const differentDays = startDate.getFullYear() !== endDate.getFullYear()
                          || startDate.getMonth() !== endDate.getMonth()
                          || startDate.getDate() !== endDate.getDate();
    return `${startTime} - ${differentDays ? endTime : ''} ${endDate.toLocaleTimeString().slice(0, -6)} ${endMeridiem}`;
  };

  const addEvent = () => {
    addEventToUserCalendar(cookies.cookies.userId, event.id)
      .then(() => {
        store.dispatch(fetchEvents());
      });
    store.dispatch(setShowPopup(false));
  };

  const removeEvent = () => {
    removeEventFromUserCalendar(cookies.cookies.userId, event.id)
      .then(() => {
        store.dispatch(fetchEvents());
      });
    store.dispatch(setShowPopup(false));
  };

  // Rendered when + button clicked
  const renderConfirmCancelButtons = () => (
    <div className="multi-event-option">
      <button
        className="button confirm-button"
        type="button"
        aria-label="confirm add event"
        onClick={() => {
          addEvent();
        }}
      >
        Confirm
      </button>
      {cancelButton}
    </div>
  );

  const renderAddEventButton = () => (
    <div className="single-event-option">
      <button
        className="add-intent-button"
        type="button"
        aria-label="Add To My Events"
        onClick={() => {
          store.dispatch(changePopupType('ConfirmCancelPopup'));
        }}
      >
        Add to My Events
      </button>
    </div>
  );

  const renderAddMyHoursButton = () => (
    <div className="single-event-option">
      <button
        className="add-intent-button"
        type="button"
        aria-label="Add to My Hours"
        onClick={() => store.dispatch(changePopupType('LogHoursForm'))}
      >
        Add to My Hours
      </button>
    </div>
  );

  const renderRemoveFromMyEvent = () => (
    <div className="single-event-option">
      <button
        className="remove-intent-button"
        type="button"
        aria-label="Remove From My events"
        onClick={() => {
          removeEvent();
        }}
      >
        Remove From My Events
      </button>
    </div>
  );

  const renderEventFullButton = () => (
    <div className="single-event-option">
      <button
        className="event-full-button"
        type="button"
        aria-label="Event is full"
        onClick={() => {
          store.dispatch(setShowPopup(false));
        }}
      >
        Event is Full
      </button>
    </div>
  );

  const renderButtons = () => {
    switch (popupType) {
      case 'ConfirmCancelPopup':
        if (event.extendedProps.eventAttendance < event.extendedProps.eventLimit) {
          return renderConfirmCancelButtons();
        }
        return renderEventFullButton();
      case 'AddEventPopup':
        if (event.extendedProps.eventAttendance < event.extendedProps.eventLimit) {
          return renderAddEventButton();
        }
        return renderEventFullButton();
      case 'AddMyHoursPopup':
        return renderAddMyHoursButton();
      // case 'ViewEventInfoPopup':
      //   return '';
      case 'RemoveFromMyEventPopup':
        return renderRemoveFromMyEvent();
      // case 'CreateEventForm':
      //   return '';
      // case 'ModifyEventInfoForm':
      //   return '';
      default:
        return renderConfirmCancelButtons();
    }
  };

  return (
    <div className="popup">
      <button
        className="exit-button"
        type="button"
        aria-label="close"
        onClick={() => { store.dispatch(setShowPopup(false)); }}
      >
        <img className="x-icon" src={cross} alt="close" />
      </button>
      <div className="event-image">
        <p>Image</p>
      </div>
      <div className="event-info">
        <div className="popup-header">
          <p className="event-time">
            {prettifyDate()}
          </p>
          <p className="event-name">{event.title}</p>
        </div>
        <div className="details-section">
          <p className="details-title">Details</p>
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
              {parseInt(event.extendedProps.eventLimit, 10)
               - parseInt(event.extendedProps.eventAttendance, 10)}
              /
              {event.extendedProps.eventLimit}
              {' '}
              Spots Remaining
            </span>
          </div>
        </div>
        <div className="event-description">
          <p>{event.extendedProps.description}</p>
        </div>
        {renderButtons()}
      </div>
    </div>
  );
};

EventPopup.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  addEventToUserCalendar: PropTypes.func.isRequired,
  removeEventFromUserCalendar: PropTypes.func.isRequired,
  popupType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  popupType: getPopupType(state),
});

export default withCookies(connect(mapStateToProps, {
  addEventToUserCalendar: addUserEvent,
  removeEventFromUserCalendar: removeUserEvent,
})(EventPopup));
