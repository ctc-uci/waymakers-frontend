import React from 'react';
import { Provider } from 'react-redux';
import store from '../../events/redux/store';
import EventsView from '../../events/events-view/eventsView';

const VolunteerEvents = () => {
  console.log('hi');
  return (
    <Provider store={store}>
      <EventsView />
      {/* TODO: Add events list below the calendar once that component is created */}
    </Provider>
  );
};

export default VolunteerEvents;
