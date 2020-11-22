import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '@fullcalendar/core';

import './eventPopup.css';

const EventPopup = ({ event, onClose, addEvent }) => {
  const formatConfig = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    timeZoneName: 'short',
    timeZone: 'UTC',
    locale: 'en',
  };

  const startDate = formatDate(event.start, formatConfig);
  const endDate = formatDate(event.end, formatConfig);

  const getAddButton = () => {
    if (addEvent != null) {
      return (
        <button type="button" aria-label="add event to my cal" onClick={addEvent}>Add</button>
      );
    }
    return null;
  };
  return (
    <div id="popup">
      <h3>{event.title}</h3>
      <p>{`Start: ${startDate}`}</p>
      <p>{`End: ${endDate}`}</p>
      <p>{`Location: ${event.location}`}</p>
      <p>{`Details: ${event.description}`}</p>
      {getAddButton()}
      <button type="button" aria-label="close popup" onClick={onClose}>Close</button>
    </div>
  );
};

// Need to fix this after we finalize what info in each event object!
// we pass in FullCalendar's Event Object, but not sure how to specify that for
// type checking in react
EventPopup.propTypes = {
  event: PropTypes.objectOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
  addEvent: PropTypes.func,
};

EventPopup.defaultProps = {
  addEvent: null,
};

export default EventPopup;
