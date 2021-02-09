import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import EventsView from './events-view/eventsView';
import AddEventPopup from './edit-events/addEventPopup';
import './events.css';

const Events = () => {
  const [showAddPopup, setShowAddPopup] = useState(false);

  // Creating store within Provider tag
  return (
    <Provider store={store}>
      <div className="events">
        <h1>Events</h1>
        <button type="button" className="add-button" onClick={() => setShowAddPopup(true)}>Add Events</button>
        {showAddPopup && <AddEventPopup onClose={() => setShowAddPopup(false)} />}
        <EventsView />
      </div>
    </Provider>
  );
};

export default Events;
