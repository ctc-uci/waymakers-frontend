import React from 'react';
import { Helmet } from 'react-helmet';
import EventsView from '../../components/events/events-view/eventsView';
import './volunteerEvents.css';

const VolunteerEvents = () => (
  <div className="volunteer-events-page">
    <Helmet>
      <title>Waymakers | Events</title>
    </Helmet>
    <h1 className="title">Select an Event to View Details</h1>
    <EventsView page="volunteerDashboard" />
  </div>
);

export default VolunteerEvents;
