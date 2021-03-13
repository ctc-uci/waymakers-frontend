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
