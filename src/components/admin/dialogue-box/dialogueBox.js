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

  console.log(event.id);

  // TODO: Date/time needs to be converted to PST!!
  const startDate = formatDate(event.start, formatConfig);

  return (
    <div id="dialogue-box">
      <h3 id="event-title">{event.title}</h3>
      <h3>EVENT TYPE GOES HERE</h3>
      <p id="event-start-time">{`Start: ${startDate}`}</p>
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
