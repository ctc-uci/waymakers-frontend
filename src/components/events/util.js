const fullCalendarEventToRegularEvent = (event) => {
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

export default fullCalendarEventToRegularEvent;
