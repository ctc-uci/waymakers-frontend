import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import EventPopup from '../event-popup/eventPopup';

import './eventsView.css';

const EventsView = () => {
  // make sure to be able to set timezone?
  const [events, setEvents] = useState([]);
  const [cal, setCal] = useState('eventCal');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  // Alters event object keys for FullCalendar library
  async function getEventsForCalendar() {
    try {
      let allEvents = await axios.get('http://localhost:3000/events/');
      if (allEvents.status === 200) {
        allEvents = allEvents.data.map((event) => ({
          title: event.event_name,
          type: event.event_type,
          start: event.start_time,
          end: event.end_time,
          location: event.event_location,
          description: event.event_description,
          id: event.id,
        }));
      }
      setEvents(allEvents);
    } catch (e) {
      // eslint-disable-next-line
      console.log('Error while getting events from the backend!');
    }
  }

  useEffect(() => {
    getEventsForCalendar();
  }, []);

  const onEventClick = (event) => {
    setSelectedEvent(event.event);
    setShowPopup(!showPopup);
  };

  // TODO: Need to connect to user tables to add this event to their list!
  const addEvent = (event) => event;

  function renderPopup() {
    if (showPopup) {
      return (
        <EventPopup
          event={selectedEvent}
          onClose={() => setShowPopup(false)}
          addEvent={cal === 'eventCal' ? () => addEvent(selectedEvent) : null}
        />
      );
    }
    return null;
  }

  const getCalendar = () => {
    // TODO: Add filtering based on what calendar is showing
    // let calendar = myEvents;
    // if (cal === 'EventCal') {
    //   calendar = currentEvents;
    // }
    // eslint-disable-next-line
    console.log(events);
    return (
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
        eventClick={onEventClick}
        contentHeight={450}
      />
    );
  };

  return (
    <div>
      {renderPopup()}
      <div id="calendar" className={showPopup ? 'blur' : ''}>
        <button className="button" type="button" onClick={() => { setCal('myCal'); }} disabled={cal === 'MyCal'} aria-label="Change calendar to my calendar">My Events</button>
        <button className="button" type="button" onClick={() => { setCal('eventCal'); }} disabled={cal === 'EventCal'} aria-label="Change calendar to event calendar">Current Events</button>
        {getCalendar()}
      </div>
    </div>
  );
};

export default EventsView;
