import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import EventPopup from '../event-popup/eventPopup';

import './eventsView.css';

const EventsView = ({ myEvents, currentEvents }) => {
  // something to handle eventClick event?? (later)
  // make sure to be able to set timezone?
  const [cal, setCal] = useState('EventCal');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const onEventClick = (event) => {
    setShowPopup(!showPopup);
    setSelectedEvent(event.event);
  };

  const addEvent = (event) => event;

  function renderPopup() {
    return (
      <EventPopup
        event={selectedEvent}
        onClose={() => setShowPopup(false)}
        addEvent={cal === 'EventCal' ? () => addEvent(selectedEvent) : null}
      />
    );
  }

  const getCalendar = () => {
    let calendar = myEvents;
    if (cal === 'EventCal') {
      calendar = currentEvents;
    }
    return (
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={calendar}
        eventClick={onEventClick}
        contentHeight={450}
      />
    );
  };

  return (
    <div>
      {showPopup && renderPopup()}
      <div id="calendar" className={showPopup ? 'blur' : ''}>
        <button className="button" type="button" onClick={() => { setCal('MyCal'); }} disabled={cal === 'MyCal'} aria-label="Change calendar to my calendar">My Events</button>
        <button className="button" type="button" onClick={() => { setCal('EventCal'); }} disabled={cal === 'EventCal'} aria-label="Change calendar to event calendar">Current Events</button>
        {getCalendar()}
      </div>
    </div>
  );
};

EventsView.propTypes = {
  myEvents: PropTypes.arrayOf(Object).isRequired,
  currentEvents: PropTypes.arrayOf(Object).isRequired,
};

export default EventsView;
