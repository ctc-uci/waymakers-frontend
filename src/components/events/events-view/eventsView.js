import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

// import axios from 'axios';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';

import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import { YearPicker, MonthPicker } from 'react-dropdown-date';

import { getEventsForFullCalendar } from '../redux/selectors';
import EventPopup from '../event-popup/eventPopup';
import HoursPopup from '../hours-popup/hoursPopup';
import store from '../redux/store';
import { fetchEvents } from '../redux/actions';

import './eventsView.css';

const EventsView = () => {
  // make sure to be able to set timezone?
  // const [events, setEvents] = useState([]);
  const [cal, setCal] = useState('eventCal');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // stored as int

  const calendarEl = useRef(null);

  // Alters event object keys for FullCalendar library
  // async function getEventsForCalendar() {
  //   try {
  //     let allEvents = store.;
  //     let allEvents = await axios.get('http://localhost:3000/events/');
  //     console.log('all events');
  //     console.log(allEvents);
  //     if (allEvents.status === 200) {
  //       allEvents = allEvents.data.map((event) => ({
  //         title: event.eventName,
  //         type: event.eventType,
  //         start: event.startTime,
  //         end: event.endTime,
  //         location: event.eventLocation,
  //         description: event.eventDescription,
  //         id: event.id,
  //       }));
  //     }
  //     setEvents(allEvents);
  //   } catch (e) {
  //     // eslint-disable-next-line
  //     console.log('Error while getting events from the backend!');
  //   }
  // }

  // Might need to refresh events if things change in store??
  // useEffect(() => {
  // }, [useSelector(getEvents)])

  // Load Events
  useEffect(() => {
    console.log('fetching events');
    store.dispatch(fetchEvents);
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
      if (cal === 'eventCal') {
        return (
          <EventPopup
            event={selectedEvent}
            onClose={() => setShowPopup(false)}
            addEvent={cal === 'eventCal' ? () => addEvent(selectedEvent) : null}
          />
        );
      }
      // show hours popup for MyEvents events
      return (
        <HoursPopup
          onClose={() => setShowPopup(false)}
          event={selectedEvent}
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
    console.log(useSelector(getEventsForFullCalendar));
    return (
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]}
        initialView="timeGridWeek"
        events={useSelector(getEventsForFullCalendar)}
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
      <div id="filters">
        <button className="button" type="button" onClick={() => { setCal('eventCal'); }} disabled={cal === 'eventCal'} aria-label="Change calendar to event calendar">Current Events</button>
        <button className="button" type="button" onClick={() => { setCal('myCal'); }} disabled={cal === 'myCal'} aria-label="Change calendar to my calendar">My Events</button>
        <select name="views" id="views" onChange={(e) => { calendarEl.current.getApi().changeView(e.target.value); }}>
          <option value="timeGridDay">Day</option>
          <option value="timeGridWeek">Week</option>
          <option value="dayGridMonth" selected="selected">Month</option>
        </select>
        <MonthPicker
          defaultValue="Select Month"
          endYearGiven
          year={year}
          value={month - 1}
          onChange={(newMonth) => {
            if (newMonth !== '') {
              setMonth(parseInt(newMonth, 10) + 1);
            }
          }}
          id="month"
          name="month"
        />
        <YearPicker
          defaultValue="Select Year"
          start={getCurrentYear() - 2}
          end={getCurrentYear() + 10}
          value={year}
          onChange={(newYear) => {
            if (newYear !== '') {
              setYear(newYear);
            }
          }}
          id="year"
          name="year"
        />
      </div>
      <div id="calendar" className={showPopup ? 'blur' : ''}>
        <h3>{cal === 'myCal' ? 'My Events' : 'Current Events'}</h3>
        {getCalendar()}

      </div>

    </div>
  );
};

export default EventsView;
