// redux/selectors.js
import moment from 'moment';
import { getRegularSelectedEvent } from '../util';

// Get all events from database
export const getEvents = (store) => {
  if (store.events && store.events.eventsList) {
    return store.events.eventsList;
  }
  return [];
};

const getEndDate = (events, event) => {
  const selectedEvent = getRegularSelectedEvent(events, event);
  if (event.isAllDay === true) {
    return new Date(moment(selectedEvent.endTime).add(1, 'day'));
  }
  return new Date(event.endTime);
};

// Get Events with fields needed for FullCalendar API
export const getEventsForFullCalendar = (store) => {
  const events = getEvents(store);
  if (events.length === 0) {
    return [];
  }
  console.log(events);
  return events.map((event) => ({
    title: event.title,
    division: event.division,
    eventType: event.eventType,
    start: event.startTime,
    end: getEndDate(events, event),
    location: event.location,
    description: event.description,
    id: event.id,
    eventLimit: event.eventLimit,
    eventAttendance: event.eventAttendance,
    allDay: event.isAllDay,
  }));
};

export const getUserEvents = (store) => {
  if (store.events && store.events.userEventsList) {
    return store.events.userEventsList;
  }
  return [];
};

export const getUserEventsForFullCalendar = (store) => {
  const events = getUserEvents(store);
  if (events.length === 0) {
    return [];
  }
  return events.map((event) => ({
    title: event.title,
    division: event.division,
    eventType: event.eventType,
    start: event.startTime,
    end: getEndDate(events, event),
    location: event.location,
    description: event.description,
    id: event.id,
    eventLimit: event.eventLimit,
    eventAttendance: event.eventAttendance,
    allDay: event.isAllDay,
  }));
};

export const getUnsubmittedEvents = (store) => store.events.unsubmittedUserEventsList;
export const getSubmittedEvents = (store) => store.events.submittedUserEventsList;
export const getShowPopup = (store) => store.events.showPopup;
export const getMonth = (store) => store.events.month;
export const getDay = (store) => store.events.day;
export const getYear = (store) => store.events.year;
export const getSelectedEvent = (store) => store.events.selectedEvent;
export const getView = (store) => store.events.view;
export const getPopupType = (store) => store.events.popupType;
