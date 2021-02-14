import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { useSelector, connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import EventCheckBoxes from './event-checkboxes/eventCheckBoxes';
import CalendarFilters from './calendar-filters/calendarFilters';
import EventBlock from './event-block/eventBlock';
import CalendarPopup from './calendar-popup/calendarPopup';

import { getEventsForFullCalendar, getUserEventsForFullCalendar } from '../redux/selectors';
import { fetchEvents, fetchUserEvents } from '../redux/actions';

import './eventsView.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

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
  const [day, setDay] = useState(new Date().getDate());
  const [path] = useState(useLocation().pathname);
  const calendarEl = useRef(null);

  useEffect(() => {
    (async () => {
      await getEvents();
      await getUserEvents(cookies.cookies.userId);
    })();
  }, []);

  // Update calendar
  useEffect(() => {
    calendarEl.current.getApi().changeView('dayGridMonth', `${year}-${month < 10 ? '0' : ''}${month}-01`);
    calendarEl.current.getApi().gotoDate(`${year}-${month < 10 ? '0' : ''}${month}-01`);
  }, [year, month]);

  useEffect(() => {
    calendarEl.current.getApi().gotoDate(`${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`);
  }, [day]);

  const onEventClick = (event) => {
    setSelectedEvent(event.event);
    setShowPopup(!showPopup);
  };

  function renderPopup() {
    const userEvents = useSelector(getUserEventsForFullCalendar);
    return (
      <CalendarPopup
        userEvents={userEvents}
        selectedEvent={selectedEvent}
        setShowPopup={(value) => setShowPopup(value)}
        setShowEditPopup={(value) => setShowEditPopup(value)}
        showPopup={showPopup}
        showEditPopup={showEditPopup}
        path={path}
        showMoreEvents={showMoreEvents}
      />
    );
  }

  const renderHeader = (arg) => {
    if (arg.view.type === 'timeGridWeek') {
      return (
        <div className="week-header">
          <p id="header-date">{arg.date.getDate()}</p>
          <p id="header-day">{new Date(arg.date).toLocaleString('en-us', { weekday: 'short' })}</p>
        </div>
      );
    }
    return <p>{arg.text}</p>;
  };

  function renderEventContent(eventInfo) {
    return <EventBlock path={path} eventInfo={eventInfo} />;
  }

  const filterEvents = () => {
    const userEvents = useSelector(getUserEventsForFullCalendar);
    const allEvents = useSelector(getEventsForFullCalendar);
    const userEventIds = userEvents.map((event) => event.id);
    let events;
    if (showMyEvents && !showMoreEvents) { // Only My Events checked off
      events = userEvents;
    } else if (!showMyEvents && showMoreEvents) { // Only More Events checked off
      events = allEvents.filter((event) => !userEventIds.includes(event.id));
    } else { // Both My Events and More Events checked
      events = allEvents;
    }

    events = events.map((event) => {
      const newEvent = event;
      newEvent.textColor = 'var(--text-color-light)';
      newEvent.eventBorderColor = 'transparent';

      if (path === '/volunteer/events' && userEventIds.includes(newEvent.id)) {
        newEvent.backgroundColor = 'var(--color-light-green)';
        newEvent.borderColor = 'var(--color-light-green)';
      } else {
        newEvent.backgroundColor = 'var(--text-color-dark)';
        newEvent.borderColor = 'var(--text-color-dark)';
      }
      return newEvent;
    });
    return events;
  };

  const getCalendar = () => {
    const events = filterEvents();

    return (
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]}
        initialView="timeGridWeek"
        events={events}
        eventClick={onEventClick}
        contentHeight={450}
        ref={calendarEl}
        dayHeaderContent={renderHeader}
        dayHeaderClassNames="test-headers"
        eventContent={renderEventContent}
      />
    );
  };

  const renderCheckboxes = () => {
    const pathName = useLocation().pathname;
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
        <CalendarFilters
          month={month}
          year={year}
          setView={(view) => { calendarEl.current.getApi().changeView(view); }}
          setDay={(value) => setDay(value)}
          setMonth={(value) => setMonth(value)}
          setYear={(value) => setYear(value)}
        />
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
