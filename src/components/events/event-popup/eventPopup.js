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

  // Renders add button if addEvent was passed in (so MyEvents will have no add button)
  const renderAddButton = () => {
    if (canAdd === true && event.extendedProps.eventAttendance < event.extendedProps.eventLimit) {
      const addEvent = () => {
        addEventToUserCalendar(cookies.cookies.userId, event.id)
          .then(() => {
            store.dispatch(fetchEvents());
          });
        onClose();
      };
      return (
        <button className="button confirm-button" type="button" aria-label="add event to my cal" onClick={addEvent}>Confirm</button>
      );
    }
    return null;
  };

  const prettifyDate = () => {
    const startTime = `${dayList[startDate.getDay()]} ${monthList[startDate.getMonth()]} ${startDate.getDate()} ${startDate.getFullYear()} ${startDate.toLocaleTimeString().slice(0, -6)} PM`;
    const endTime = `\n${dayList[endDate.getDay()]} ${monthList[endDate.getMonth()]} ${endDate.getDate()} ${endDate.getFullYear()}`;
    const differentDays = startDate.getFullYear() !== endDate.getFullYear()
                          || startDate.getMonth() !== endDate.getMonth()
                          || startDate.getDate() !== endDate.getDate();
    return `${startTime} - ${differentDays ? endTime : ''} ${endDate.toLocaleTimeString().slice(0, -6)} PM`;
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
          <p>Details</p>
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
        <div className="event-buttons">
          {renderAddButton()}
          <button className="button cancel-button" type="button" aria-label="close popup" onClick={onClose}>Cancel</button>
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
