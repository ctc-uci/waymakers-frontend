import React from 'react';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { addUserEvent, fetchEvents } from '../redux/actions';
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

// Additional props for edit event popup: showEditButton, onEditButtonClick,

const EventPopup = ({
  event, onClose, canAdd, addEventToUserCalendar, cookies, confirmAddEvent, setConfirmAddEvent,
}) => {
  console.log(event);
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);

  const cancelButton = (
    <button
      className="button cancel-button"
      type="button"
      aria-label="close popup"
      onClick={() => {
        onClose();
        setConfirmAddEvent(false);
      }}
    >
      Cancel
    </button>
  );

  const prettifyDate = () => {
    const startTime = `${dayList[startDate.getDay()]} ${monthList[startDate.getMonth()]} ${startDate.getDate()} ${startDate.getFullYear()} ${startDate.toLocaleTimeString().slice(0, -6)} PM`;
    const endTime = `\n${dayList[endDate.getDay()]} ${monthList[endDate.getMonth()]} ${endDate.getDate()} ${endDate.getFullYear()}`;
    const differentDays = startDate.getFullYear() !== endDate.getFullYear()
                          || startDate.getMonth() !== endDate.getMonth()
                          || startDate.getDate() !== endDate.getDate();
    return `${startTime} - ${differentDays ? endTime : ''} ${endDate.toLocaleTimeString().slice(0, -6)} PM`;
  };

  const addEvent = () => {
    addEventToUserCalendar(cookies.cookies.userId, event.id)
      .then(() => {
        store.dispatch(fetchEvents());
      });
    onClose();
  };

  // Rendered when + button clicked
  const renderConfirmCancelButtons = () => (
    <div className="multi-event-option">
      {cancelButton}
      <button
        className="button confirm-button"
        type="button"
        aria-label="confirm add event"
        onClick={() => {
          addEvent();
          setConfirmAddEvent(false);
        }}
      >
        Confirm
      </button>
    </div>
  );

  const renderAddEventButton = () => (
    <div className="single-event-option">
      <button
        className="add-intent-button"
        type="button"
        aria-label="Add To My Events"
        onClick={() => setConfirmAddEvent(true)}
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
        onClick={() => { console.log(`adding hours to ${event.id}`); }}
      >
        Add to My Hours
      </button>
    </div>
  );

  const renderRemoveFromMyEvent = () => (
    <div className="single-event-option">
      <button
        className="add-intent-button"
        type="button"
        aria-label="Add to My Hours"
        onClick={() => console.log(`removed event with id ${event.id}`)}
      >
        Remove From My Events
      </button>
    </div>
  );

  const renderButtons = () => {
    if (canAdd === true) { // NOT a user event
      if (event.extendedProps.eventAttendance < event.extendedProps.eventLimit && confirmAddEvent) {
        // Confirm + Cancel button
        return renderConfirmCancelButtons();
      } // This is for a NON user event (MORE EVENT) when we click the reg block
      return renderAddEventButton();
    }
    const currentDate = new Date();
    if (endDate < currentDate) {
      return renderAddMyHoursButton();
    }
    // Future/Current Event
    return renderRemoveFromMyEvent();
  };

  return (
    <div className="popup">
      <button
        className="exit-button"
        type="button"
        aria-label="close"
        onClick={onClose}
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
        {/* <div className="event-description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed faucibus iaculis risus a fermentum. Praesent tristique mollis facilisis.
            Curabitur dapibus nisl eget lacinia tincidunt. Etiam laoreet ultricies risus.
            Suspendisse turpis risus, vulputate eget tristique vitae, lobortis ac eros.
            Mauris id turpis ullamcorper, maximus nisl luctus, volutpat orci. Sed pharetra,
            eros vitae posuere fringilla, arcu nibh tempor eros, id sodales orci turpis sed libero.
            Aliquam ultrices sollicitudin risus, vitae maximus ante accumsan nec.
            Curabitur molestie diam ut nulla ullamcorper suscipit id eu mauris.
            Proin id pulvinar neque. Phasellus sollicitudin consequat ornare.
          </p>
        </div> */}
        {renderButtons()}
      </div>
    </div>
  );
};

EventPopup.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired,
  onClose: PropTypes.func.isRequired,
  canAdd: PropTypes.bool.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  addEventToUserCalendar: PropTypes.func.isRequired,
  confirmAddEvent: PropTypes.bool.isRequired,
  setConfirmAddEvent: PropTypes.func.isRequired,
  // showEditButton: PropTypes.bool,
  // onEditButtonClick: PropTypes.func,
};

// EventPopup.defaultProps = {
//   showEditButton: false,
//   onEditButtonClick: null,
// };

export default withCookies(connect(null, {
  addEventToUserCalendar: addUserEvent,
})(EventPopup));
