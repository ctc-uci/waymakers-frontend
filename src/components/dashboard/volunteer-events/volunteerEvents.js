import React from 'react';
import EventsView from '../../events/events-view/eventsView';
import './volunteerEvents.css';

const VolunteerEvents = () => (
  <div className="volunteer-events-page">
    <h1 className="title">Select an Event to View Details</h1>
    <EventsView page="volunteerDashboard" />
  </div>
);

export default VolunteerEvents;
