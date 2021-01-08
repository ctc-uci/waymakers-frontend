import React from 'react';

import EventsView from './events-view/eventsView';
import ViewHours from './view-hours/viewHours';

const Events = () => (
  <div className="events">
    <h1>Events</h1>
    <ViewHours />
    <EventsView />
  </div>
);

export default Events;
