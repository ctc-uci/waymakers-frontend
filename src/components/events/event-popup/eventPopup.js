import React from 'react';
import PropTypes from 'prop-types';
// import { formatDate } from '@fullcalendar/core';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { addUserEvent } from '../redux/actions';

import './eventPopup.css';
import locationPinIcon from '../../../images/locationPin.svg';
import folderIcon from '../../../images/folder.svg';
import peopleIcon from '../../../images/peopleIcon.svg';

const EventPopup = ({
  event, onClose, canAdd, addEventToUserCalendar, cookies,
}) => {
  console.log(event, onClose, canAdd, addEventToUserCalendar, cookies);
  // const formatConfig = {
  //   month: 'long',
  //   year: 'numeric',
  //   day: 'numeric',
  //   timeZoneName: 'short',
  //   timeZone: 'PST',
  //   locale: 'en',
  // };

  // const startDate = formatDate(event.start, formatConfig);
  // const endDate = formatDate(event.end, formatConfig);

  // const addEvent = () => {
  //   addEventToUserCalendar(cookies.cookies.userId, event.id);
  //   onClose();
  // };

  // Renders add button if addEvent was passed in (so MyEvents will have no add button)
  // const renderAddButton = () => {
  //   if (canAdd === true) {
  //     return (
  //       <button type="button" aria-label="add event to my cal" onClick={addEvent}>Add</button>
  //     );
  //   }
  //   return null;
  // };

  return (
    <div className="popup">
      <div className="event-image">
        Image
      </div>
      <div className="popup-header">
        <span className="event-time">MON JAN 18 2021 7:00 PM - 9:00 PM</span>
        <br />
        <span className="event-name">Waymakers Volunteer Event</span>
      </div>
      <div className="details-section">
        <h3>Details</h3>
        <div className="event-info">
          <div className="event-detail">
            <img className="event-detail-icon" src={locationPinIcon} alt="location" />
            <span className="event-detail-label">Your Home</span>
          </div>
          <div className="event-detail">
            <img className="event-detail-icon" src={folderIcon} alt="folder" />
            <span className="event-detail-label">Human Trafficking Division</span>
          </div>
          <div className="event-detail">
            <img className="event-detail-icon" src={peopleIcon} alt="people" />
            <span className="event-detail-label">22/100 Spots Remaining</span>
          </div>
        </div>
      </div>
      <div className="event-description">
        Here are the event details for this very cool event and the
        volunteer can read these event details for them to learn
        more about the event and its details.
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
