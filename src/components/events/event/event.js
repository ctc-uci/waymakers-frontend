import React from 'react';
import PropTypes from 'prop-types';
import './event.css';
import '../edit-events/editEvents.css';

const Event = ({ event, onEditEventClick }) => (
  <div className="eventContainer">
    <h3>{event.title}</h3>
    <p>{`Start: ${event.start_time}`}</p>
    <p>{`End: ${event.end_time}`}</p>
    <p>{`Location: ${event.location}`}</p>
    <p>{`Details: ${event.description}`}</p>
    <button className="all-events edit-event-button" type="button" onClick={() => onEditEventClick(event)}>Edit Event</button>
  </div>
);

Event.propTypes = {
  event: PropTypes.objectOf(String).isRequired,
  onEditEventClick: PropTypes.func.isRequired,
};

export default Event;
