// redux/selectors.js

export const getEvents = (store) => {
  if (store.eventsList) {
    return store.eventsList;
  }
  return [];
};

export const getEventById = (store, id) => {
  if (getEvents(store)) {
    const event = getEvents(store).filter((e) => e.id === id);
    if (event.length === 1) {
      return event[0];
    }
    return null;
  }
  return {};
};

export const getEventsForFullCalendar = (store) => {
  console.log('Formatting events for full calendar API');
  const events = getEvents(store);
  console.log(getEvents(store));
  if (events.length === 0) {
    return [];
  }
  return events.data.map((event) => ({
    title: event.eventName,
    type: event.eventType,
    start: event.startTime,
    end: event.endTime,
    location: event.eventLocation,
    description: event.eventDescription,
    id: event.id,
  }));
};
