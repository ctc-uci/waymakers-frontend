import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '@fullcalendar/core';

import './eventPopup.css';

const EventPopup = ({ event, onClose }) => {
  const startDate = formatDate(event.start, {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    timeZoneName: 'short',
    timeZone: 'UTC',
    locale: 'en',
  });
  const endDate = formatDate(event.end, {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    timeZoneName: 'short',
    timeZone: 'UTC',
    locale: 'en',
  });
  return (
    <div id="popup">
      <p>{event.title}</p>
      <p>{startDate}</p>
      <p>{endDate}</p>
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
};

export default EventPopup;
