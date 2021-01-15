import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import EventsView from './events-view/eventsView';
import ViewHours from './view-hours/viewHours';
import HoursPopup from './hours-popup/hoursPopup';

const Events = () => {
  const [showHoursPopup, setShowHoursPopup] = useState(false);

  // Creating store within Provider tag
  return (
    <Provider store={store}>
      <div className="events">
        <h1>Events</h1>
        <button type="button" onClick={() => setShowHoursPopup(true)}>Add hours</button>
        {showHoursPopup && <HoursPopup onClose={() => setShowHoursPopup(false)} />}
        <ViewHours />
        <EventsView />
      </div>
    </Provider>
  );
};

export default Events;
