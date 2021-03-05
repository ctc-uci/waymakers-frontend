import React from 'react';
import { Provider } from 'react-redux';
import store from '../../events/redux/store';
import EventsView from '../../events/events-view/eventsView';
import './volunteerEventAggregatePage.css';

const VolunteerEventAggregatePage = () => {
  console.log('hello');
  return (
    <Provider store={store}>
      <div className="volunteer-event-aggregatePage">
        <h1 className="title">Select Event to View Data</h1>
        <EventsView />
      </div>
    </Provider>
  );
};

export default VolunteerEventAggregatePage;
