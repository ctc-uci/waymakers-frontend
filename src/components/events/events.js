import React from 'react';
import { Helmet } from 'react-helmet';
import EventsView from './events-view/eventsView';
import './events.css';

const Events = () => (
  <div className="events-page">
    <Helmet>
      <title>Waymakers | Events</title>
    </Helmet>
    <h1 className="title">Select an Event to View/Edit Information</h1>
    <EventsView page="addModifyDeleteEventsPage" />
  </div>
);

export default Events;
