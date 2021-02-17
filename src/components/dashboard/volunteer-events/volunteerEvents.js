import React from 'react';
import { Provider } from 'react-redux';
import store from '../../events/redux/store';
import EventsView from '../../events/events-view/eventsView';
import EventLegend from '../event-legend/eventLegend';
import './volunteerEvents.css';

const VolunteerEvents = () => {
  console.log('hi');
  return (
    <Provider store={store}>
      <div id="volunteer-events-page">
        <h1 id="volunteer-event-title">Select an Event to View Details</h1>
        <EventsView />
        <EventLegend />
      </div>
      {/* TODO: Add events list below the calendar once that component is created */}
    </Provider>
  );
};

export default VolunteerEvents;
