import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './editEvents.css';
import Event from '../event/event';
import EditEventPopup from './editEventPopup';
import AddEventPopup from './addEventPopup';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
  withCredentials: true,
});

const EditEvents = () => {
  const [events, setEvents] = useState([]);
  const [editPopup, setEditPopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  async function getEvents() {
    try {
      let allEvents = await instance.get('events');

      if (allEvents.status === 200) {
        allEvents = allEvents.data;
      }
      setEvents(allEvents);
    } catch (e) {
      // eslint-disable-next-line
      console.log('Error while getting events from the backend!');
    }
  }

  // Load / Refresh events
  useEffect(() => {
    getEvents();
  }, [addPopup]);

  // Passed into Event component for the Edit button => shows the popup
  const onEditEventClick = (event) => {
    setSelectedEvent(event);
    setEditPopup(true);
  };

  const renderEvents = () => {
    const f = events.filter((event) => (new Date(event.startTime)) > (new Date())).slice(0, 2);
    // Render first two events for now
    return f.map((event) => (
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
          onClose={() => {
            setEditPopup(false);
            getEvents();
          }}
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
      <div id="middle-section">
        {renderEditPopup()}
        {renderAddPopup()}
        {renderEvents()}
        <div className="add-event">
          <button type="button" className="add-event-button" onClick={() => setAddPopup(!addPopup)}>+</button>
          <p>Add Event</p>
        </div>
      </div>
      <Link to="/events">
        <button className="all-events" type="button">All Events</button>
      </Link>
    </div>
  );
};

export default EditEvents;
