import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './editEvents.css';

import Event from '../event/event';

const EditEvents = ({ events }) => {
//   const dateAndTime = `${event.date}__${event.time}`;
// Buttons to toggle this week and this month
// separate Event component for each event square
// + button
// All events button
  const [filter, setFilter] = useState('week');

  const renderEvents = () => {
    // use the first two events based on filter (implement filter later)
    // sort events
    // filter
    // return event component for each
    console.log(events);
    return events.map((event) => <Event event={event} />);
  };

  //   const addEvent = () => {
  //     // create pop up for adding new event and store in backend
  //   };

  return (
    <div className="editEventsContainer">
      <div className="toggle-buttons">
        <button className={filter === 'week' ? 'active' : 'disabled'} type="button" onClick={() => { setFilter('week'); }} aria-label="Change filter to week">This Week</button>
        <button className={filter === 'month' ? 'active' : 'disabled'} type="button" onClick={() => { setFilter('month'); }} aria-label="Change filter to month">This Month</button>
      </div>
      <div id="middle-section">
        { renderEvents() }
        <div className="add-event">
          <button type="button" className="add-event-button" onClick="addEvent">+</button>
          <p>Add Event</p>
        </div>
      </div>
      <div>
        <button className="all-events" type="button" onClick="window.location.href='/events';">All Events</button>
      </div>
    </div>
  );
};

EditEvents.propTypes = {
  events: PropTypes.arrayOf(Object).isRequired,
};
export default EditEvents;
