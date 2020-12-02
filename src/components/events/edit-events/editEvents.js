import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './editEvents.css';

import Event from '../event/event';
import EditEventPopup from './editEventPopup';
import AddEventPopup from './addEventPopup';

const EditEvents = ({ events }) => {
//   const dateAndTime = `${event.date}__${event.time}`;
// Buttons to toggle this week and this month
// separate Event component for each event square
// + button
// All events button
  const [filter, setFilter] = useState('week');
  const [editPopup, setEditPopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // passed into Event component for the Edit button => shows the popup
  const onEditEventClick = (event) => {
    setSelectedEvent(event);
    setEditPopup(true);
  };

  const onAddEventClick = () => {
    // setSelectedEvent(event.event);
    setAddPopup(!addPopup);
  };

  const renderEvents = () => {
    // use the first two events based on filter (implement filter later)
    // sort events
    // filter
    // return event component for each
    console.log(events);
    return events.map((event) => <Event event={event} onEditEventClick={onEditEventClick} />);
  };

  function renderEditPopup() {
    if (editPopup) {
      return (
        <EditEventPopup
          event={selectedEvent}
          onClose={() => setEditPopup(false)}
        />
      );
    }
    return null;
  }

  function renderAddPopup() {
    if (addPopup) {
      return (
        <AddEventPopup
          onClose={() => setAddPopup(false)}
        />
      );
    }
    return null;
  }

  return (
    <div className="editEventsContainer">
      <div className="toggle-buttons">
        <button className={filter === 'week' ? 'active' : 'disabled'} type="button" onClick={() => { setFilter('week'); }} aria-label="Change filter to week">This Week</button>
        <button className={filter === 'month' ? 'active' : 'disabled'} type="button" onClick={() => { setFilter('month'); }} aria-label="Change filter to month">This Month</button>
      </div>
      <div id="middle-section">
        { renderEditPopup() }
        { renderAddPopup() }
        { renderEvents() }
        <div className="add-event">
          <button type="button" className="add-event-button" onClick={onAddEventClick}>+</button>
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
