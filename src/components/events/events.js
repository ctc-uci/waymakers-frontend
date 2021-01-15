import React, { useState } from 'react';

import EventsView from './events-view/eventsView';
import HoursPopup from './hours-popup/hoursPopup';

const Events = () => {
  const [showHoursPopup, setShowHoursPopup] = useState(false);

  return (
    <div className="events">
      <h1>Events</h1>
      <button type="button" onClick={() => setShowHoursPopup(true)}>Add hours</button>
      {showHoursPopup && <HoursPopup onClose={() => setShowHoursPopup(false)} />}
      <EventsView />
    </div>
  );
};

export default Events;
