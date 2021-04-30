import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { useSelector, connect, useDispatch } from 'react-redux';
import moment from 'moment';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventCheckBoxes from './event-checkboxes/eventCheckBoxes';
import CalendarFilters from './calendar-filters/calendarFilters';
import EventBlock from './event-block/eventBlock';
import CalendarPopup from './calendar-popup/calendarPopup';
import CalendarDayHeader from './calendar-day-header/calendarDayHeader';
import EventList from '../event-list/eventList';
import EventLegend from '../../dashboard/event-legend/eventLegend';
import useMobileWidth from '../../../common/useMobileWidth';
import HelpPopup from './help-popup/helpPopup';

import { filterEventsByView } from '../util';

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
  changeView,
  fetchEvents,
  fetchUserEvents,
  changePopupType,
  setShowPopup,
} from '../redux/actions';

import './eventsView.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

const EventsView = ({
  loadEvents, loadUserEvents, cookies, day, year, month, view, page,
}) => {
  const dispatch = useDispatch();
  const [showMoreEvents, setShowMoreEvents] = useState(true);
  const [showMyEvents, setShowMyEvents] = useState(true);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const calendarEl = useRef(null);
  const moreEventsColor = 'var(--text-color-dark)';
  const myEventsColor = 'var(--color-light-green)';

  const isMobile = useMobileWidth();

  useEffect(() => {
    (async () => {
      await loadEvents();
      await loadUserEvents(cookies.cookies.userId);
    })();
  }, []);

  // UPDATE CALENDAR USING REDUX
  useEffect(() => {
    if (view !== 'timeGridDay' && !isMobile) {
      calendarEl.current.getApi().changeView(view, `${year}-${month < 10 ? '0' : ''}${month}-01`);
      calendarEl.current.getApi().gotoDate(`${year}-${month < 10 ? '0' : ''}${month}-01`);
    }
  }, [useSelector(getMonth), useSelector(getYear)]);

  useEffect(() => {
    if (view !== 'timeGridDay') {
      calendarEl.current.getApi().gotoDate(`${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`);
      if (isMobile && view === 'timeGridWeek') {
        calendarEl.current.getApi().setOption('visibleRange', {
          start: '2017-04-01',
          end: '2017-04-05',
        });
      }
    }
  }, [useSelector(getDay)]);

  useEffect(() => {
    if (view !== 'timeGridDay') {
      if (isMobile && view === 'timeGridWeek') {
        calendarEl.current.getApi().changeView('timeGridFourDay');
      } else {
        calendarEl.current.getApi().changeView(view);
      }
      calendarEl.current.getApi().gotoDate(`${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`);
      calendarEl.current.getApi().setOption('height', view === 'timeGridWeek' ? 1600 : 1000);
    }
  }, [useSelector(getView), isMobile]);

  // VIEW HEADER RENDERING FUNCTIONS
  const updateDate = (newDate) => {
    dispatch(changeDay(newDate.getDate()));
    dispatch(changeMonth(newDate.getMonth() + 1));
    dispatch(changeYear(newDate.getFullYear()));
  };

  const renderWeekMonthHeader = (dayInfo) => {
    const startDate = new Date(year, month - 1, day);
    const endDate = new Date(year, month - 1, day + 3);
    const goToPrev = () => {
      calendarEl.current.getApi().prev();
      updateDate(calendarEl.current.getApi().getDate());
    };
    const goToNext = () => {
      calendarEl.current.getApi().next();
      updateDate(calendarEl.current.getApi().getDate());
    };
    return (
      <CalendarDayHeader
        goToPrev={goToPrev}
        goToNext={goToNext}
        dayInfo={dayInfo}
        startOfRange={startDate}
        endOfRange={endDate}
      />
    );
  };

  const renderDayViewHeader = () => {
    const currentDate = moment(new Date(year, month - 1, day));
    const goToPrev = () => { updateDate(new Date(moment(currentDate).subtract(1, 'days'))); };
    const goToNext = () => { updateDate(new Date(moment(currentDate).add(1, 'days'))); };

    const currentDateAsDate = new Date(currentDate);

    const dayInfo = {
      view: { type: view },
      text: currentDateAsDate.toLocaleString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }),
    };
    console.log(currentDateAsDate);
    return (
      <CalendarDayHeader
        goToPrev={goToPrev}
        goToNext={goToNext}
        dayInfo={dayInfo}
      />
    );
  };

  const renderCheckboxes = () => (
    <EventCheckBoxes
      showMyEvents={showMyEvents}
      showMoreEvents={showMoreEvents}
      onMoreClick={(value) => setShowMoreEvents(value)}
      onMyClick={(value) => setShowMyEvents(value)}
    />
  );

  // EVENT FILTERING FUNCTIONS
  function colorEvents(userEventIds, events) {
    // Add properties to render styled event blocks
    return events.map((event) => {
      const newEvent = event;
      newEvent.textColor = 'var(--text-color-light)';
      newEvent.eventBorderColor = 'transparent';

      if (page === 'volunteerDashboard' && userEventIds.includes(newEvent.id)) {
        newEvent.backgroundColor = myEventsColor;
        newEvent.borderColor = myEventsColor;
      } else {
        newEvent.backgroundColor = moreEventsColor;
        newEvent.borderColor = moreEventsColor;
      }
      return newEvent;
    });
  }

  const filterEventsForCheckboxes = (allEvents, userEvents, userEventIds) => {
    // Filter based on checkbox filters (More Events, My Events)
    let filteredEvents = allEvents;
    if (showMyEvents && showMoreEvents) {
      filteredEvents = allEvents;
    } else if (showMyEvents) {
      filteredEvents = userEvents;
    } else { // just myEvents
      filteredEvents = allEvents.filter((event) => (!userEventIds.includes(event.id)));
    }
    return filteredEvents;
  };

  const filterEvents = (display) => {
    // Get events based on display type (cal or list)
    let userEvents;
    let allEvents;
    if (display === 'cal') {
      userEvents = useSelector(getUserEventsForFullCalendar);
      allEvents = useSelector(getEventsForFullCalendar);
    } else { // get events for list
      userEvents = useSelector(getUserEvents);
      allEvents = useSelector(getEvents);
    }

    const userEventIds = userEvents.map((event) => event.id);
    let events;
    events = filterEventsForCheckboxes(allEvents, userEvents, userEventIds);
    if (isMobile && view === 'timeGridWeek') {
      events = filterEventsByView(display, 'timeGridFourDay', events, day, month, year);
    } else {
      events = filterEventsByView(display, view, events, day, month, year);
    }
    events = colorEvents(userEventIds, events);
    return events;
  };

  const renderEventList = () => {
    const events = filterEvents('list').sort((e1, e2) => new Date(e1.startTime) - new Date(e2.startTime));
    let filter;
    if ((showMoreEvents && showMyEvents) || (!showMoreEvents && !showMyEvents)) {
      filter = 'all';
    } else {
      filter = showMoreEvents ? 'more-events' : 'my-events';
    }
    return <EventList events={events} listType={filter} page={page} view={view} />;
  };

  const onDateClick = (info) => {
    // Should only switch to day view on mobile month calendar
    if (isMobile && view === 'dayGridMonth') {
      updateDate(info.date);
      dispatch(changeView('timeGridDay'));
    }
  };

  const renderCalendar = () => {
    const calendarEvents = filterEvents('cal');
    if (view !== 'timeGridDay') {
      return (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          views={{
            timeGridFourDay: {
              type: 'timeGrid',
              duration: { days: 4 },
              buttonText: '4 day',
            },
          }}
          // contentHeight={isMobile ? 800 : 800}
          contentHeight={800}
          expandRows="true"
          ref={calendarEl}
          headerToolbar={{
            left: '',
            center: 'title',
            right: '',
          }}
          dayHeaderContent={renderWeekMonthHeader}
          eventContent={(eventInfo) => <EventBlock page={page} eventInfo={eventInfo} />}
          allDaySlot={false}
          slotDuration="00:60:00"
          dateClick={onDateClick}
        />
      );
    }
    return null;
  };

  return (
    <div className="events-view">
      {page === 'addModifyDeleteEventsPage'
        ? (
          <div className="top-of-calendar">
            <div className="calendar-add-date-filters">
              <button
                type="button"
                className="add-button"
                onClick={() => { dispatch(changePopupType('AddEventForm')); dispatch(setShowPopup(true)); }}
              >
                Add Events
              </button>
              <div className="filter-help-header">
                <CalendarFilters />
                <button type="button" className="help-button" onClick={() => setIsHelpModalOpen(true)}>?</button>
              </div>
            </div>
          </div>
        )
        : (
          <div className="top-of-calendar">
            <div className="filter-help-header">
              <CalendarFilters />
              <button type="button" className="help-button" onClick={() => setIsHelpModalOpen(true)}>?</button>
            </div>
            { page === 'volunteerDashboard' && renderCheckboxes()}
          </div>
        )}
      <CalendarPopup page={page} />
      <HelpPopup isModalOpen={isHelpModalOpen} setIsModalOpen={setIsHelpModalOpen} isAdmin={page === 'addModifyDeleteEventsPage'} />
      <div id="calendar">
        {view === 'timeGridDay' && renderDayViewHeader()}
        {renderCalendar()}
      </div>
      { page === 'volunteerDashboard' && view !== 'timeGridDay' && <EventLegend />}
      {renderEventList()}
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
