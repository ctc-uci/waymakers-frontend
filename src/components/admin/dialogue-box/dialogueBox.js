import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './dialogueBox.css';

const DialogueBox = ({ event, onClose }) => {
  const formatConfig = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    locale: 'en',
    hour: '2-digit',
    minute: '2-digit',
  };

  const startDate = new Date(event.startTime).toLocaleString('us-en', formatConfig);

  return (
    <div id="dialogue-box">
      <div id="top-info">
        <button id="close-button" type="button" aria-label="close data" onClick={onClose}>&#10006;</button>
        <h4 id="event-type">{`${event.eventType} Event`}</h4>
        <h3 id="event-title">{event.title}</h3>
      </div>
      <p id="event-start-time">{`${startDate}`}</p>
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
