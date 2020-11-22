import React, { useEffect, useState } from 'react';
import EventsView from './events-view/eventsView';

const axios = require('axios');

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(async () => {
    try {
      // GET events from the backend
      let currentEvents = await axios.get('http://localhost:2999/events/');
      if (currentEvents.status === 200) {
        currentEvents = currentEvents.data;
        const eventList = currentEvents.map((event) => ({
          title: event.event_name,
          start: event.start_time,
          end: event.end_time,
          location: event.event_location,
          description: event.event_description,
        }));

        // Will have to filter accordingly for each myEvents, curEvents later
        setEvents(eventList);
      }
    } catch (e) {
      // eslint-disable-next-line
      console.log('Error while getting events from the backend!');
    }
  }, []);

  return (
    <div className="events">
      <h1>Events</h1>
      <EventsView currentEvents={events} myEvents={events} />
    </div>
  );
};

export default Events;
