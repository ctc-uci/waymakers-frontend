import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { useSelector, connect } from 'react-redux';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';

import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import { YearPicker, MonthPicker } from 'react-dropdown-date';

import { getEventsForFullCalendar, getUserEventsForFullCalendar } from '../redux/selectors';
import EventPopup from '../event-popup/eventPopup';
import HoursPopup from '../hours-popup/hoursPopup';

import { fetchEvents, fetchUserEvents } from '../redux/actions';

import './eventsView.css';

const EventsView = ({
  getEvents, getUserEvents, cookies,
}) => {
  const [cal, setCal] = useState('myCal');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // stored as int
  const calendarEl = useRef(null);

  useEffect(() => {
    (async () => {
      await getEvents();
      await getUserEvents(cookies.cookies.userId);
    })();
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

  function renderPopup() {
    if (showPopup) {
      if (cal === 'eventCal') {
        // TODO: Set canAdd to true/false depending on if event is already in user's cal
        return (
          <EventPopup
            event={selectedEvent}
            onClose={() => setShowPopup(false)}
            canAdd
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
    let events;
    if (cal === 'myCal') {
      events = useSelector(getUserEventsForFullCalendar);
    } else {
      events = useSelector(getEventsForFullCalendar);
    }

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

EventsView.propTypes = {
  getEvents: PropTypes.func.isRequired,
  getUserEvents: PropTypes.func.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default withCookies(connect(null, {
  getEvents: fetchEvents, // rename fetchEvents action
  getUserEvents: fetchUserEvents,
})(EventsView));
