import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { useSelector, connect } from 'react-redux';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import EventCheckBoxes from './event-checkboxes/eventCheckBoxes';
import CalendarFilters from './calendar-filters/calendarFilters';
import EventBlock from './event-block/eventBlock';
import CalendarPopup from './calendar-popup/calendarPopup';
import CalendarDayHeader from './calendar-day-header/calendarDayHeader';
import EventList from '../event-list/eventList';
import EventLegend from '../../dashboard/event-legend/eventLegend';
import store from '../redux/store';

import {
  getEvents,
  getUserEvents,
  getEventsForFullCalendar,
  getUserEventsForFullCalendar,
  getMonth,
  getDay,
  getYear,
  getView,
} from '../redux/selectors';

import {
  changeDay,
  changeMonth,
  changeYear,
  fetchEvents,
  fetchUserEvents,
} from '../redux/actions';

import './eventsView.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

const EventsView = ({
  loadEvents, loadUserEvents, cookies, day, year, month, view, page,
}) => {
  const [showMoreEvents, setShowMoreEvents] = useState(true);
  const [showMyEvents, setShowMyEvents] = useState(true);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [confirmAddEvent, setConfirmAddEvent] = useState(false);
  const calendarEl = useRef(null);

  useEffect(() => {
    (async () => {
      await loadEvents();
      await loadUserEvents(cookies.cookies.userId);
    })();
  }, []);

  // Update calendar
  useEffect(() => {
    if (view !== 'timeGridDay') {
      calendarEl.current.getApi().changeView('dayGridMonth', `${year}-${month < 10 ? '0' : ''}${month}-01`);
      calendarEl.current.getApi().gotoDate(`${year}-${month < 10 ? '0' : ''}${month}-01`);
    }
  }, [useSelector(getMonth), useSelector(getYear)]);

  useEffect(() => {
    if (view !== 'timeGridDay') {
      calendarEl.current.getApi().gotoDate(`${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`);
    }
  }, [useSelector(getDay)]);

  useEffect(() => {
    if (view !== 'timeGridDay') {
      calendarEl.current.getApi().changeView(view);
    }
  }, [useSelector(getView)]);

  function renderPopup() {
    const userEvents = useSelector(getUserEventsForFullCalendar);
    return (
      <CalendarPopup
        userEvents={userEvents}
        setShowEditPopup={(value) => setShowEditPopup(value)}
        showEditPopup={showEditPopup}
        page={page}
        showMoreEvents={showMoreEvents}
        confirmAddEvent={confirmAddEvent}
        setConfirmAddEvent={setConfirmAddEvent}
      />
    );
  }

  const renderHeader = (dayInfo) => {
    const goToPrev = () => { calendarEl.current.getApi().prev(); };
    const goToNext = () => { calendarEl.current.getApi().next(); };
    return <CalendarDayHeader goToPrev={goToPrev} goToNext={goToNext} dayInfo={dayInfo} />;
  };

  const renderDayViewHeader = () => {
    // Get previous and next dates
    const currentDate = new Date(year, month - 1, day);
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 1);

    // Create functions for previous and next arrows
    const goToPrev = () => {
      store.dispatch(changeDay(prevDate.getDate()));
      store.dispatch(changeMonth(prevDate.getMonth() + 1));
      store.dispatch(changeYear(prevDate.getFullYear()));
    };
    const goToNext = () => {
      store.dispatch(changeDay(nextDate.getDate()));
      store.dispatch(changeMonth(nextDate.getMonth() + 1));
      store.dispatch(changeYear(nextDate.getFullYear()));
    };

    const dayInfo = {
      view: { type: view },
      text: currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }),
    };
    return (
      <CalendarDayHeader
        goToPrev={goToPrev}
        goToNext={goToNext}
        dayInfo={dayInfo}
      />
    );
  };

  function renderEventContent(eventInfo) {
    return (
      <EventBlock
        page={page}
        eventInfo={eventInfo}
        setConfirmAddEvent={setConfirmAddEvent}
      />
    );
  }

  const isOnCurrentDay = (event) => {
    const startDate = new Date(event.startTime);
    if (view === 'timeGridDay' && startDate.getDate() === day && (startDate.getMonth() + 1) === month && startDate.getFullYear() === year) {
      return true;
    }
    return false;
  };

  // Returns events based on filters, also adds properties for styling
  const filterEvents = (display) => {
    let userEvents;
    let allEvents;
    if (display === 'cal') {
      userEvents = useSelector(getUserEventsForFullCalendar);
      allEvents = useSelector(getEventsForFullCalendar);
    } else {
      userEvents = useSelector(getUserEvents);
      allEvents = useSelector(getEvents);
    }

    const userEventIds = userEvents.map((event) => event.id);
    let events;
    if (showMyEvents && !showMoreEvents) { // Only My Events checked off
      events = userEvents;
    } else if (!showMyEvents && showMoreEvents) { // Only More Events checked off
      events = allEvents.filter((event) => (
        isOnCurrentDay(event) && !userEventIds.includes(event.id)));
    } else { // Both My Events and More Events checked
      events = allEvents;
    }

    if (view === 'timeGridDay' && page === 'volunteerDashboard') {
      events = events.filter((event) => isOnCurrentDay(event));
    }

    // Add properties to render styled event blocks
    events = events.map((event) => {
      const newEvent = event;
      newEvent.textColor = 'var(--text-color-light)';
      newEvent.eventBorderColor = 'transparent';

      if (page === 'volunteerDashboard' && userEventIds.includes(newEvent.id)) {
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
    if (view !== 'timeGridDay') {
      const calendarEvents = filterEvents('cal');
      return (
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin]}
          initialView="timeGridWeek"
          events={calendarEvents}
          // contentHeight="auto"
          contentHeight={1000}
          expandRows="true"
          ref={calendarEl}
          headerToolbar={{
            left: 'title',
            center: '',
            right: '',
          }}
          dayHeaderContent={renderHeader}
          eventContent={renderEventContent}
          allDaySlot={false}
          // height="auto"
          slotDuration="00:60:00"
        />
      );
    }

    let filter;
    const events = filterEvents('list');
    if ((showMoreEvents && showMyEvents) || (!showMoreEvents && !showMyEvents)) {
      filter = 'all';
    } else {
      filter = showMoreEvents ? 'more-events' : 'my-events';
    }

    // TODO: ADD FILTER FOR DAY
    // TODO: Add arrows to change day
    return <EventList events={events} title="" listType={filter} onEventButtonClick={() => console.log('hi')} />;
  };

  const renderCheckboxes = () => {
    if (page === 'volunteerDashboard') {
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

  const renderEventLegend = () => {
    if (page === 'volunteerDashboard' && view !== 'timeGridDay') {
      return (
        <EventLegend />
      );
    }
    return null;
  };

  return (
    <div className="events-view">
      <div id="top-of-calendar">
        {renderPopup()}
        <CalendarFilters />
        {renderCheckboxes()}
      </div>
      <div id="calendar">
        {view === 'timeGridDay' && renderDayViewHeader()}
        {getCalendar()}
      </div>
      {renderEventLegend()}
    </div>
  );
};

EventsView.propTypes = {
  loadEvents: PropTypes.func.isRequired,
  loadUserEvents: PropTypes.func.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  view: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  day: getDay(state),
  month: getMonth(state),
  year: getYear(state),
  view: getView(state),
});

export default withCookies(connect(mapStateToProps, {
  loadEvents: fetchEvents, // rename fetchEvents action
  loadUserEvents: fetchUserEvents,
})(EventsView));
