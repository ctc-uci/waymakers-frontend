import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '@fullcalendar/core';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { addUserEvent } from '../redux/actions';

import './eventPopup.css';

const EventPopup = ({
  event, onClose, canAdd, addEventToUserCalendar, cookies, showEditButton, onEditButtonClick,
}) => {
  const formatConfig = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    timeZoneName: 'short',
    timeZone: 'PST',
    locale: 'en',
  };

  const startDate = formatDate(event.start, formatConfig);
  const endDate = formatDate(event.end, formatConfig);

  const addEvent = () => {
    addEventToUserCalendar(cookies.cookies.userId, event.id);
    onClose();
  };

  // Renders add button if addEvent was passed in (so MyEvents will have no add button)
  const renderAddButton = () => {
    if (canAdd === true) {
      return (
        <button type="button" aria-label="add event to my cal" onClick={addEvent}>Add</button>
      );
    }
    return null;
  };

  // Renders edit button as needed
  const renderEditButton = () => {
    if (showEditButton === true) {
      const switchToEditPopup = () => {
        onClose();
        onEditButtonClick();
      };
      return (
        <button type="button" aria-label="edit event" onClick={switchToEditPopup}>Edit Event</button>
      );
    }
    return null;
  };

  return (
    <div className="popup">
      <h3>View Event Information</h3>
      {renderEditButton()}
      <h5>{event.title}</h5>
      <p>{`Start: ${new Date(startDate).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}`}</p>
      <p>{`End: ${new Date(endDate).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}`}</p>
      <p>{`Location: ${event.extendedProps.location}`}</p>
      <p>{`Details: ${event.extendedProps.description}`}</p>
      {renderAddButton()}
      <button type="button" aria-label="close popup" onClick={onClose}>Close</button>
    </div>
  );
};

EventPopup.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired,
  onClose: PropTypes.func.isRequired,
  canAdd: PropTypes.bool.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  addEventToUserCalendar: PropTypes.func.isRequired,
  showEditButton: PropTypes.bool,
  onEditButtonClick: PropTypes.func,
};

EventPopup.defaultProps = {
  showEditButton: false,
  onEditButtonClick: null,
};

export default withCookies(connect(null, {
  addEventToUserCalendar: addUserEvent,
})(EventPopup));
