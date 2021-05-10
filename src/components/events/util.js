import moment from 'moment';

export const fullCalendarEventToRegularEvent = (event) => {
  const convertedEvent = {
    title: event.title,
    division: event.extendedProps.division,
    eventType: event.extendedProps.eventType,
    startTime: event.start,
    endTime: event.end,
    location: event.extendedProps.location,
    description: event.extendedProps.description,
    id: event.id,
    eventLimit: event.extendedProps.eventLimit,
    eventAttendance: event.extendedProps.eventAttendance,
  };
  return convertedEvent;
};

export const getRegularSelectedEvent = (allRegularEvents, selectedEvent) => (
  allRegularEvents
    .filter((currentEvent) => parseInt(currentEvent.id, 10) === parseInt(selectedEvent.id, 10))[0]
);

export const isPast = (firstDate, secondDate) => (
  firstDate.setHours(0, 0, 0, 0) - secondDate.setHours(0, 0, 0, 0) < 0
);

export const isOnCurrentDay = (event, day, month, year) => {
  const currentDate = moment().date(day).month(month - 1).year(year);
  const eventStartDate = new Date(event.startTime);
  const eventStart = moment(eventStartDate);
  return eventStart.isSame(currentDate, 'day');
};

export const isDuringCurrentWeek = (event, day, month, year) => {
  const currentDate = moment().date(day).month(month - 1).year(year);
  const eventStartDate = new Date(event.startTime);
  const eventStart = moment(eventStartDate);
  return eventStart.isSame(currentDate, 'week');
};

export const isDuringCurrentMonth = (event, day, month, year) => {
  const currentDate = moment().date(day).month(month - 1).year(year);
  const eventStartDate = new Date(event.startTime);
  const eventStart = moment(eventStartDate);
  return eventStart.isSame(currentDate, 'month');
};

export const isDuringCurrentMobileWeek = (event, day, month, year) => {
  const currentDate = moment().date(day).month(month - 1).year(year);
  const eventStartDate = new Date(event.startTime);
  const eventStart = moment(eventStartDate);
  const endDateRange = moment(currentDate).add(3, 'days');
  return eventStart.isSameOrBefore(endDateRange, 'day') && eventStart.isSameOrAfter(currentDate, 'day');
};

// FILTERING HELPER FUNCTION
export const filterEventsByView = (display, view, events, day, month, year) => {
  // Filter out events for the list based on view (month, day, week)
  let filteredEvents = events;
  if (display === 'list') {
    if (view === 'timeGridDay') {
      filteredEvents = events.filter((event) => isOnCurrentDay(event, day, month, year));
    } else if (view === 'timeGridFourDay') {
      filteredEvents = events.filter((event) => isDuringCurrentMobileWeek(event, day, month, year));
    } else if (view === 'timeGridWeek') {
      filteredEvents = events.filter((event) => isDuringCurrentWeek(event, day, month, year));
    } else {
      filteredEvents = events.filter((event) => isDuringCurrentMonth(event, day, month, year));
    }
  }
  return filteredEvents;
};
