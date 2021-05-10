import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { withCookies, Cookies } from 'react-cookie';
import { connect, useDispatch, useSelector } from 'react-redux';

import {
  addUserEvent,
  removeUserEvent,
  fetchEvents,
  setShowPopup,
  changePopupType,
} from '../redux/actions';
import { getPopupType, getUnsubmittedEvents } from '../redux/selectors';
import { createAlert } from '../../../common/AlertBanner/AlertBannerSlice';

import './eventPopup.css';

import locationPinIcon from '../../../assets/locationPin.svg';
import folderIcon from '../../../assets/folder.svg';
import peopleIcon from '../../../assets/peopleIcon.svg';
import cross from '../../../assets/cross.svg';

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
  event,
  addEventToUserCalendar,
  removeEventFromUserCalendar,
  cookies,
  popupType,
  isOpen,
}) => {
  const dispatch = useDispatch();
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const userId = cookies.get('userId');
  const [canSubmitHours, setCanSubmitHours] = useState([]);
  const unsubmittedEvents = useSelector(getUnsubmittedEvents);

  useEffect(() => {
    setCanSubmitHours(unsubmittedEvents
      .filter((e) => e.id.toString() === event.id.toString()).length > 0);
  }, [event]);

  const cancelButton = (
    <button
      className="button cancel-button"
      type="button"
      aria-label="close popup"
      onClick={() => {
        dispatch(setShowPopup(false));
      }}
    >
      <p className="large">Cancel</p>
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
    addEventToUserCalendar(userId, event.id)
      .then(() => {
        dispatch(fetchEvents());
      });
    dispatch(setShowPopup(false));
  };

  const removeEvent = () => {
    removeEventFromUserCalendar(userId, event.id)
      .then(() => {
        dispatch(fetchEvents());
      });
    dispatch(setShowPopup(false));
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
          dispatch(createAlert({
            message: `Successfully added '${event.title}' to your events!`,
            severity: 'success',
          }));
        }}
      >
        <p className="large">Confirm</p>
      </button>
      {cancelButton}
    </div>
  );

  const renderAddEventButton = () => (
    <div className="single-event-option">
      <button
        className="add-intent-button button"
        type="button"
        aria-label="Add To My Events"
        onClick={() => {
          dispatch(changePopupType('ConfirmCancelPopup'));
        }}
      >
        <p className="large">Add To My Events</p>
      </button>
    </div>
  );

  const renderAddMyHoursButton = () => (
    <div className="single-event-option">
      <button
        className="add-intent-button button"
        type="button"
        aria-label="Add to My Hours"
        onClick={() => {
          dispatch(changePopupType('LogHoursForm'));
        }}
      >
        <p className="large">Add To My Hours</p>
      </button>
    </div>
  );

  const renderAlreadySubmittedHoursButton = () => (
    <div className="single-event-option">
      <button
        className="already-submitted-hours-button button"
        type="button"
        aria-label="Already Submitted Hours"
        onClick={() => {
          dispatch(setShowPopup(false));
        }}
      >
        <p className="large">Already Submitted Hours</p>
      </button>
    </div>
  );

  const renderRemoveFromMyEvent = () => (
    <div className="single-event-option">
      <button
        className="remove-intent-button button"
        type="button"
        aria-label="Remove From My events"
        onClick={() => {
          removeEvent();
          console.log('hello?');
          dispatch(createAlert({
            message: `Successfully removed '${event.title}' from your events!`,
            severity: 'success',
          }));
        }}
      >
        <p className="large">Remove From My Events</p>
      </button>
    </div>
  );

  const renderEventFullButton = () => (
    <div className="single-event-option">
      <button
        className="event-full-button button"
        type="button"
        aria-label="Event is full"
        onClick={() => {
          dispatch(setShowPopup(false));
        }}
      >
        <p className="large">Event is Full</p>
      </button>
    </div>
  );

  const renderButtons = () => {
    switch (popupType) {
      case 'ConfirmCancelPopup':
        if (event.eventAttendance < event.eventLimit) {
          return renderConfirmCancelButtons();
        }
        return renderEventFullButton();
      case 'AddEventPopup':
        if (event.eventAttendance < event.eventLimit) {
          return renderAddEventButton();
        }
        return renderEventFullButton();
      case 'AddMyHoursPopup':
        if (canSubmitHours) {
          return renderAddMyHoursButton();
        }
        return renderAlreadySubmittedHoursButton();
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
    <Modal
      className="volunteer-event-popup"
      isOpen={isOpen}
      onRequestClose={() => {
        dispatch(setShowPopup(false));
      }}
    >
      <div className="popup">
        <button
          className="exit-button"
          type="button"
          aria-label="close"
          onClick={() => { dispatch(setShowPopup(false)); }}
        >
          <img className="x-icon" src={cross} alt="close" />
        </button>
        <div className={`event-type-${event.eventType.toLowerCase()}`} />
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
              <span className="event-detail-label">{event.location}</span>
            </div>
            <div className="event-detail">
              <img className="event-detail-icon" src={folderIcon} alt="folder" />
              <span className="event-detail-label">{event.division}</span>
            </div>
            <div className="event-detail">
              <img className="event-detail-icon" src={peopleIcon} alt="people" />
              <span className="event-detail-label">
                {parseInt(event.eventLimit, 10)
                - parseInt(event.eventAttendance, 10)}
                /
                {event.eventLimit}
                {' '}
                Spots Remaining
              </span>
            </div>
          </div>
          <div className="event-description">
            <p>{event.description}</p>
          </div>
          {renderButtons()}
        </div>
      </div>
    </Modal>
  );
};

EventPopup.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  addEventToUserCalendar: PropTypes.func.isRequired,
  removeEventFromUserCalendar: PropTypes.func.isRequired,
  popupType: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  popupType: getPopupType(state),
});

export default withCookies(connect(mapStateToProps, {
  addEventToUserCalendar: addUserEvent,
  removeEventFromUserCalendar: removeUserEvent,
})(EventPopup));
