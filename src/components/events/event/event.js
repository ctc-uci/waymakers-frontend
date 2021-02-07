import React from 'react';
import PropTypes from 'prop-types';
import './event.css';
// import '../edit-events/editEvents.css';

const Event = ({ event, eventType }) => {
  // Date formatting
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(startDate);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(startDate);
  const startTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(startDate);
  const endTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(endDate);
  return (
    <div className={`event-container ${eventType}`}>
      <div className="event-button">
        <p>{eventType === 'more-events' ? '+' : '✓'}</p>
      </div>
      <div className="event-date-section">
        <h3 className="event-day">{day}</h3>
        <p className="event-month">{month}</p>
      </div>
      <div className="event-info-section">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-time">{`${startTime} - ${endTime}`}</p>
      </div>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.objectOf(String).isRequired,
  eventType: PropTypes.string.isRequired,
};

export default Event;
