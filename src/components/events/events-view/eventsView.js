import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import EventPopup from '../event-popup/eventPopup';

import './eventsView.css';

const EventsView = ({ myEvents, currentEvents }) => {
  // something to handle eventClick event?? (later)
  // make sure to be able to set timezone?
  const [cal, setCal] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const setMyCalendar = () => {
    setCal(0);
  };

  const setEventCalendar = () => {
    setCal(1);
  };

  const onEventClick = (event) => {
    setShowPopup(!showPopup);
    setSelectedEvent(event.event);
  };

  const getCalendar = () => {
    if (cal === 0) {
      return (
        <FullCalendar
          plugins={[timeGridPlugin]}
          initialView="timeGridWeek"
          events={myEvents}
          eventClick={onEventClick}
        />
      );
    }
    return (
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={currentEvents}
        eventClick={onEventClick}
      />
    );
  };

  return (
    <div id="calendar">
      <p>{cal === 0 ? 'My Events' : 'Current Events'}</p>
      <button type="button" onClick={(setMyCalendar)} aria-label="Change calendar to my calendar">My Events</button>
      <button type="button" onClick={(setEventCalendar)} aria-label="Change calendar to event calendar">Current Events</button>
      {showPopup ? <EventPopup event={selectedEvent} onClose={() => setShowPopup(false)} /> : null}
      {getCalendar()}
    </div>
  );
};

EventsView.propTypes = {
  myEvents: PropTypes.arrayOf(Object).isRequired,
  currentEvents: PropTypes.arrayOf(Object).isRequired,
};

export default EventsView;
