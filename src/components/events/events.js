import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { setShowPopup, changePopupType } from './redux/actions';

import EventsView from './events-view/eventsView';
// import AddEventPopup from './edit-events/addEventPopup';
import './events.css';

const Events = () => (
  <Provider store={store}>
    <div className="events-page">
      <h1 className="title">Select Event to View/Edit Information</h1>
      <button type="button" className="add-button" onClick={() => { store.dispatch(changePopupType('AddEventForm')); store.dispatch(setShowPopup(true)); }}>Add Events</button>
      {/* {showAddPopup && <AddEventPopup onClose={() => setShowAddPopup(false)} />} */}
      <EventsView page="addModifyDeleteEventsPage" />
    </div>
  </Provider>
);

export default Events;
