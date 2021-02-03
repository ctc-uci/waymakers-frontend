import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDate } from '@fullcalendar/core';

import './dialogueBox.css';

const DialogueBox = ({ event, onClose }) => {
  const formatConfig = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    timeZoneName: 'short',
    timeZone: 'UTC',
    locale: 'en',
  };

  console.log(event);

  // TODO: Date/time needs to be converted to PST!!
  const startDate = formatDate(event.start, formatConfig);

  return (
    <div id="dialogue-box">
      <div id="top-info">
        <button id="close-button" type="button" aria-label="close data" onClick={onClose}>&#10006;</button>
        <h3 id="event-title">{event.title}</h3>
        <h4 id="event-type">{`${event.extendedProps.eventType} Event`}</h4>
      </div>
      <p id="event-start-time">{`Start: ${new Date(startDate)}`}</p>
      <Link to={`/admin/event/${event.id}`}>
        <button id="view-data-button" type="button" aria-label="view data" onClick={onClose}>View Data</button>
      </Link>
    </div>
  );
};

DialogueBox.propTypes = {
  event: PropTypes.objectOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DialogueBox;
