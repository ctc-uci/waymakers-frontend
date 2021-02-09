import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { useSelector, connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';

import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import { YearPicker, MonthPicker } from 'react-dropdown-date';

import { getEventsForFullCalendar, getUserEventsForFullCalendar } from '../redux/selectors';
import EventPopup from '../event-popup/eventPopup';
import HoursPopup from '../hours-popup/hoursPopup';
import DialogueBox from '../../admin/dialogue-box/dialogueBox';
import EditEventPopup from '../edit-events/editEventPopup';

import EventCheckBoxes from './eventCheckBoxes';

import { fetchEvents, fetchUserEvents } from '../redux/actions';

import './eventsView.css';

const EventsView = ({
  getEvents, getUserEvents, cookies,
}) => {
  const [showMoreEvents, setShowMoreEvents] = useState(true);
  const [showMyEvents, setShowMyEvents] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
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

  // Different popup rendered based on what page/route we are on
  // Volunteer Dashboard => AddPopup/EventPopup
  // Admin Aggregate Page => DialogueBox
  // Add/Modify/Remove Events Page => EditEventPopup
  function renderPopup() {
    const userEvents = useSelector(getUserEventsForFullCalendar);
    const pathName = useLocation().pathname;
    // Check if event selected = user Event
    // if it is => HoursPopup
    // else => big if statement with other popups
    const found = userEvents.filter((event) => event.id === parseInt(selectedEvent.id, 10));
    if (showPopup || showEditPopup) {
      // Event is NOT on the user's calendar
      if (showMoreEvents && found.length !== 1) {
        switch (pathName) {
          case '/volunteer/events':
            return (
              <EventPopup
                event={selectedEvent}
                onClose={() => setShowPopup(false)}
                canAdd={found.length !== 1}
              />
            );
          case '/events':
            if (showEditPopup) {
              return (
                <EditEventPopup
                  onClose={() => setShowEditPopup(false)}
                  event={selectedEvent}
                />
              );
            }
            return (
              <EventPopup
                onClose={() => setShowPopup(false)}
                event={selectedEvent}
                canAdd={false}
                showEditButton
                onEditButtonClick={() => setShowEditPopup(true)}
              />
            );
          case '/admin/aggregate':
            return <DialogueBox onClose={() => setShowPopup(false)} event={selectedEvent} />;
          default: break;
        }
      } else if (showMoreEvents) {
        switch (pathName) {
          case '/events':
            if (showEditPopup) {
              return (
                <EditEventPopup
                  onClose={() => setShowEditPopup(false)}
                  event={selectedEvent}
                />
              );
            }
            return (
              <EventPopup
                onClose={() => setShowPopup(false)}
                event={selectedEvent}
                canAdd={false}
                showEditButton
                onEditButtonClick={() => setShowEditPopup(true)}
              />
            );
          case '/admin/aggregate':
            return <DialogueBox onClose={() => setShowPopup(false)} event={selectedEvent} />;
          default: break;
        }
      }
      // Event is on the user's calendar already
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
    const userEvents = useSelector(getUserEventsForFullCalendar);
    const allEvents = useSelector(getEventsForFullCalendar);
    let events;
    if (showMyEvents && !showMoreEvents) { // Only My Events checked off
      events = userEvents;
    } else if (!showMyEvents && showMoreEvents) { // Only More Events checked off
      const userEventIds = userEvents.map((event) => event.id);
      events = allEvents.filter((event) => !userEventIds.includes(event.id));
    } else { // Both My Events and More Events checked
      events = allEvents;
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

  const renderCheckboxes = () => {
    const pathName = useLocation().pathname;
    console.log(pathName);
    if (pathName === '/volunteer/events') {
      return (
        <EventCheckBoxes
          showMyEvents={showMyEvents}
          showMoreEvents={showMoreEvents}
          onMoreClick={(value) => setShowMoreEvents(value)}
          onMyClick={(value) => setShowMyEvents(value)}
        />
      );
    }
    return null;
  };

  return (
    <div>
      <div id="top-of-calendar">
        {renderPopup()}
        <div id="event-date-picker">
          <select className="picker" name="views" id="views" onChange={(e) => { calendarEl.current.getApi().changeView(e.target.value); }}>
            <option className="picker" value="timeGridDay">Day View</option>
            <option className="picker" value="timeGridWeek">Week View</option>
            <option className="picker" value="dayGridMonth" selected="selected">Month View</option>
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
        {renderCheckboxes()}
      </div>
      <div id="calendar">
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
