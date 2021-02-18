import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { addUserEvent, fetchEvents } from '../redux/actions';
import store from '../redux/store';

import './eventPopup.css';
import locationPinIcon from '../../../images/locationPin.svg';
import folderIcon from '../../../images/folder.svg';
import peopleIcon from '../../../images/peopleIcon.svg';

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
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);

  const [wantToAdd, setWantToAdd] = useState(false);

  const cancelButton = (
    <button
      className="button cancel-button"
      type="button"
      aria-label="close popup"
      onClick={() => {
        onClose();
        setWantToAdd(false);
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

  const renderButtons = () => {
    if (canAdd === true && event.extendedProps.eventAttendance < event.extendedProps.eventLimit) {
      if (wantToAdd) {
        return (
          <div className="multi-event-option">
            {cancelButton}
            <button
              className="button confirm-button"
              type="button"
              aria-label="confirm add event"
              onClick={() => {
                addEvent();
                setWantToAdd(false);
              }}
            >
              Confirm
            </button>
          </div>
        );
      }
      return (
        <div className="single-event-option">
          <button
            className="add-intent-button"
            type="button"
            aria-label="add to my events"
            onClick={() => setWantToAdd(true)}
          >
            Add to My Events
          </button>
        </div>
      );
    }
    return (
      <div className="single-event-option">
        {cancelButton}
      </div>
    );
  };

  return (
    <div className="popup">
      <div className="event-image">
        <p>Image</p>
      </div>
      <div className="event-info">
        <div className="popup-header">
          <p className="event-time">
            {prettifyDate()}
          </p>
          {/* <br /> */}
          <p className="event-name">{event.title}</p>
          {/* <p className="event-name">Wan Outrageously Long Title AAAAAAAAAAAAAAAAAA</p> */}
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
        {/* <div className="event-buttons"> */}
        {/* {renderAddButton()} */}
        {renderButtons()}
        {/* </div> */}
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
