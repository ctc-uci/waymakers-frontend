import React from 'react';
import PropTypes from 'prop-types';
import './event.css';
// import '../edit-events/editEvents.css';

const Event = ({
  event, listType, index, onEventButtonClick,
}) => {
  // Date formatting
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(startDate);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(startDate);
  const startTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(startDate);
  const endTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(endDate);
  const eventType = (event.eventType === 'Volunteer') ? 'volunteer-event' : 'outreach-event';

  return (
    <div className="event-list-container">
      <div className={`event-container ${listType}`}>
        <div
          className="event-button"
          onClick={() => onEventButtonClick(listType, index)}
          onKeyDown={() => onEventButtonClick(listType, index)}
          role="button"
          tabIndex={index}
        >
          <p>{listType === 'more-events' ? '+' : '✓'}</p>
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
      <div className={`${eventType}`} />
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.objectOf(String).isRequired,
  listType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onEventButtonClick: PropTypes.func.isRequired,
};

export default Event;
