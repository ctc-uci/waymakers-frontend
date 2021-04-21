import React from 'react';
import { useDispatch } from 'react-redux';
import { setShowPopup, changePopupType } from './redux/actions';
import EventsView from './events-view/eventsView';
import './events.css';

const Events = () => {
  const dispatch = useDispatch();

  return (
    <div className="events-page">
      <h1 className="title">Select an Event to View/Edit Information</h1>
      <button type="button" className="add-button" onClick={() => { dispatch(changePopupType('AddEventForm')); dispatch(setShowPopup(true)); }}>Add Events</button>
      <EventsView page="addModifyDeleteEventsPage" />
    </div>
  );
};

export default Events;
