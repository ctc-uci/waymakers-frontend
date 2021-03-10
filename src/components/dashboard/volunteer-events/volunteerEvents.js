import React from 'react';
import { Provider } from 'react-redux';
import store from '../../events/redux/store';
import EventsView from '../../events/events-view/eventsView';
import './volunteerEvents.css';

const VolunteerEvents = () => (
  <Provider store={store}>
    <div className="volunteer-events-page">
      <h1 className="title">Select an Event to View Details</h1>
      <EventsView page="volunteerDashboard" />
    </div>
  </Provider>
);

export default VolunteerEvents;
