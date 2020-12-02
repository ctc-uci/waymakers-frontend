import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '@fullcalendar/core';
import './event.css';
import '../edit-events/editEvents.css';

const Event = ({ event, onEditEventClick }) => {
  const formatConfig = {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    timeZoneName: 'short',
    timeZone: 'UTC',
    locale: 'en',
  };

  const startDate = formatDate(event.startDate, formatConfig);
  const endDate = formatDate(event.endDate, formatConfig);

  return (
    <div className="eventContainer">
      <h3>{event.title}</h3>
      <p>{`Start: ${startDate}`}</p>
      <p>{`End: ${endDate}`}</p>
      <p>{`Location: ${event.location}`}</p>
      <p>{`Details: ${event.description}`}</p>
      <button className="all-events edit-event-button" type="button" onClick={() => onEditEventClick(event)}>Edit Event</button>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.objectOf(String).isRequired,
  onEditEventClick: PropTypes.func.isRequired,
};

export default Event;
