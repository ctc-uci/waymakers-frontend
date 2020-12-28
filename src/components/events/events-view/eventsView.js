import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';

import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import { YearPicker, MonthPicker } from 'react-dropdown-date';

import EventPopup from '../event-popup/eventPopup';

import './eventsView.css';

const EventsView = () => {
  // make sure to be able to set timezone?
  const [events, setEvents] = useState([]);
  const [cal, setCal] = useState('eventCal');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // stored as int

  const calendarEl = useRef(null);

  // Alters event object keys for FullCalendar library
  async function getEventsForCalendar() {
    try {
      let allEvents = await axios.get('http://localhost:3000/events/');
      if (allEvents.status === 200) {
        allEvents = allEvents.data.map((event) => ({
          title: event.event_name,
          type: event.event_type,
          start: event.start_time,
          end: event.end_time,
          location: event.event_location,
          description: event.event_description,
          id: event.id,
        }));
      }
      setEvents(allEvents);
    } catch (e) {
      // eslint-disable-next-line
      console.log('Error while getting events from the backend!');
    }
  }

  useEffect(() => {
    getEventsForCalendar();
  }, []);

  // update calendar
  useEffect(() => {
    calendarEl.current.getApi().changeView('dayGridMonth', `${year}-${month < 10 ? '0' : ''}${month}-01`);
    calendarEl.current.getApi().gotoDate(`${year}-${month < 10 ? '0' : ''}${month}-01`);
  }, [year, month]);

  const onEventClick = (event) => {
    setSelectedEvent(event.event);
    setShowPopup(!showPopup);
  };

  // TODO: Need to connect to user tables to add this event to their list!
  const addEvent = (event) => event;

  function renderPopup() {
    if (showPopup) {
      return (
        <EventPopup
          event={selectedEvent}
          onClose={() => setShowPopup(false)}
          addEvent={cal === 'eventCal' ? () => addEvent(selectedEvent) : null}
        />
      );
    }
    return null;
  }

  const getCalendar = () => {
    // TODO: Add filtering based on what calendar is showing
    // let calendar = myEvents;
    // if (cal === 'EventCal') {
    //   calendar = currentEvents;
    // }
    // eslint-disable-next-line
    console.log(events);
    return (
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]}
        initialView="timeGridWeek"
        events={events}
        eventClick={onEventClick}
        contentHeight={450}
        ref={calendarEl}
      />
    );
  };

  const getCurrentYear = () => new Date().getFullYear();

  return (
    <div>
      {renderPopup()}
      <div id="calendar" className={showPopup ? 'blur' : ''}>
        <button className="button" type="button" onClick={() => { setCal('myCal'); }} disabled={cal === 'MyCal'} aria-label="Change calendar to my calendar">My Events</button>
        <button className="button" type="button" onClick={() => { setCal('eventCal'); }} disabled={cal === 'EventCal'} aria-label="Change calendar to event calendar">Current Events</button>
        <select name="views" id="views" onChange={(e) => { calendarEl.current.getApi().changeView(e.target.value); }}>
          <option value="timeGridDay">Day</option>
          <option value="timeGridWeek">Week</option>
          <option value="dayGridMonth" selected="selec">Month</option>
        </select>
        <MonthPicker
          defaultValue="TODO" // TODO: Add default value bc blank field causes error
          endYearGiven
          year={year}
          value={month - 1}
          onChange={(newMonth) => {
            setMonth(parseInt(newMonth, 10) + 1);
          }}
          id="month"
          name="month"
        />
        <YearPicker
          defaultValue="TODO" // TODO: Add default value bc blank field causes error
          start={getCurrentYear()}
          end={getCurrentYear() + 10}
          value={year}
          onChange={(newYear) => {
            setYear(newYear);
          }}
          id="year"
          name="year"
        />
      </div>
      {getCalendar()}

    </div>
  );
};

export default EventsView;
