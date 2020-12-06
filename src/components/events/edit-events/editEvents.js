import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './editEvents.css';
import { Link } from 'react-router-dom';

import Event from '../event/event';
import EditEventPopup from './editEventPopup';
import AddEventPopup from './addEventPopup';

const EditEvents = ({ events }) => {
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
    // return event component for eac
    // eslint-disable-next-line
    console.log(events);
    // eslint-disable-next-line
    console.log(setSelectedEvent);
    // Render first two events for now
    return events.slice(0, 2).map((event) => (
      <Event
        key={event.id}
        event={event}
        onEditEventClick={onEditEventClick}
      />
    ));
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
      <Link to="/events">
        <button className="all-events" type="button">All Events</button>
      </Link>
    </div>
  );
};

EditEvents.propTypes = {
  events: PropTypes.arrayOf(Object).isRequired,
};
export default EditEvents;
