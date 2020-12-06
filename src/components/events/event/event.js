import React from 'react';
import PropTypes from 'prop-types';
import './event.css';
import '../edit-events/editEvents.css';

const Event = ({ event, onEditEventClick }) => {
  // eslint-disable-next-line
  console.log(event);
  const startTime = new Date(event.startTime).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
  const endTime = new Date(event.endTime).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
  return (
    <div className="eventContainer">
      <h3>{event.title}</h3>
      <p>{`Start: ${startTime}`}</p>
      <p>{`End: ${endTime}`}</p>
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
