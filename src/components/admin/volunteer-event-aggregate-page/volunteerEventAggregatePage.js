import React from 'react';
import { Provider } from 'react-redux';
import store from '../../events/redux/store';
import EventsView from '../../events/events-view/eventsView';

const VolunteerEventAggregatePage = () => {
  console.log('hello');
  return (
    <Provider store={store}>
      <EventsView />
    </Provider>
  );
};

export default VolunteerEventAggregatePage;
