import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';

import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import { YearPicker, MonthPicker } from 'react-dropdown-date';

import DialogueBox from '../dialogue-box/dialogueBox';

const VolunteerEventAggregatePage = () => {
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // stored as int

  const calendarEl = useRef(null);

  async function getEventsForCalendar() {
    try {
      const url = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/events`;
      console.log(url);
      let allEvents = await axios.get(url);
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
    setShowPopup(true);
  };

  const renderPopup = () => {
    console.log('rendering popup');
    if (showPopup) {
      return (
        <DialogueBox
          event={selectedEvent}
          onClose={() => setShowPopup(false)}
        />
      );
    }
    return null;
  };

  const getCalendar = () => {
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
      <div id="filters">
        <h3>Select an Event to View Data</h3>
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
      <div id="calendar">

        {getCalendar()}

      </div>

      {renderPopup()}

    </div>
  );
};

export default VolunteerEventAggregatePage;
