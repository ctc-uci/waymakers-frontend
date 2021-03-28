import React from 'react';
import PropTypes from 'prop-types';
import './event.css';

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
  const eventType = `${event.eventType.toLowerCase()}-event`;

  // Event click helper that builds a copy of the current event object, adding two new properties
  // for the event list type and index in the event array. This is done so that when
  // onEventButtonClick is called in VolunteerDashboard, it can render the event confirmation
  // popup with the correct event info and the moveEvent function can move the correct event.
  const eventClickHelper = () => {
    const newEventObj = event;
    newEventObj.listType = listType;
    newEventObj.index = index;
    onEventButtonClick(newEventObj);
  };

  return (
    <div className="event-list-container">
      <div className={`event-container ${listType}`}>
        <div
          className="event-button"
          onClick={eventClickHelper}
          onKeyDown={eventClickHelper}
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
