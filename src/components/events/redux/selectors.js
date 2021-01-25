// redux/selectors.js

// Get all events from database
export const getEvents = (store) => {
  if (store.events && store.events.eventsList) {
    return store.events.eventsList;
  }
  return [];
};

// Get Events with fields needed for FullCalendar API
export const getEventsForFullCalendar = (store) => {
  const events = getEvents(store);
  if (events.length === 0) {
    return [];
  }
  return events.map((event) => ({
    title: event.title,
    type: event.division,
    start: event.startTime,
    end: event.endTime,
    location: event.location,
    description: event.description,
    id: event.id,
  }));
};
