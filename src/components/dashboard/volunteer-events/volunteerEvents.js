import React from 'react';
import EventsView from '../../events/events-view/eventsView';
import EventLegend from '../event-legend/eventLegend';
import './volunteerEvents.css';

const VolunteerEvents = () => (
  <div className="volunteer-events-page">
    <h1 className="title">Select an Event to View Details</h1>
    <EventsView />
    <EventLegend />
  </div>
  // {/* TODO: Add events list below the calendar once that component is created */}
);

export default VolunteerEvents;
