import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './editEvents.css';
import { Link } from 'react-router-dom';

import Event from '../event/event';
import EditEventPopup from './editEventPopup';
import AddEventPopup from './addEventPopup';

const EditEvents = () => {
  const [events, setEvents] = useState([]);
  const [editPopup, setEditPopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  async function getEvents() {
    try {
      let allEvents = await axios.get('http://localhost:3000/events/');
      if (allEvents.status === 200) {
        allEvents = allEvents.data.map((event) => ({
          title: event.event_name,
          startTime: event.start_time,
          endTime: event.end_time,
          eventType: event.event_type,
          location: event.event_location,
          description: event.event_description,
          id: event.event_id,
        }));
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
  }, []);

  // passed into Event component for the Edit button => shows the popup
  const onEditEventClick = (event) => {
    setSelectedEvent(event);
    setEditPopup(true);
  };

  const renderEvents = () => {
    // eslint-disable-next-line
    console.log('implement filtering here');
    // Render first two events for now
    return events.map((event) => (
      <Event
        key={event.id}
        event={event}
        onEditEventClick={onEditEventClick}
      />
    )).reverse().slice(0, 2);
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
