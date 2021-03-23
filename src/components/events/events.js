import React, { useState } from 'react';

import EventsView from './events-view/eventsView';
import AddEventPopup from './edit-events/addEventPopup';
import './events.css';

const Events = () => {
  const [showAddPopup, setShowAddPopup] = useState(false);

  // Creating store within Provider tag
  return (
    <div className="events-page">
      <h1 className="title">Select Event to View/Edit Information</h1>
      <button type="button" className="add-button" onClick={() => setShowAddPopup(true)}>Add Events</button>
      {showAddPopup && <AddEventPopup onClose={() => setShowAddPopup(false)} />}
      <EventsView />
    </div>
  );
};

export default Events;
