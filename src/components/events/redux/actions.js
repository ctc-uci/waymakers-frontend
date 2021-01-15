const axios = require('axios');

// actions: fetch, edit, add, delete (?)

// Fetching events from server
export const fetchEvents = () => async () => {
  const url = 'http://localhost:3000/events/';
  // TODO: Add filters for getting events based on division, type, user, etc.
  try {
    const response = await axios.get(url);
    return { type: 'events/eventsLoaded', payload: response.data };
    // dispatch({ type: 'events/eventsLoaded', payload: response.data });
  } catch (err) {
    console.error(err);
    return { type: 'events/err', payload: err };
  }
};

// Creates an events/eventAdded action
export const addEvent = (newEvent) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/events/add', newEvent);
    console.log(response);
    if (response.status === 200) {
      dispatch({ type: 'events/eventAdded', payload: response.data });
    }
  } catch (err) {
    console.error(err);
  }
};

// Creates a edits/eventDelete action
export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    const response = await axios.delete(`http://localhost:3000/events/${eventId}`);
    if (response.status === 200) {
      dispatch({ type: 'events/eventDeleted', payload: response.data });
    }
  } catch (err) {
    console.error(err);
  }
};

// Creates a events/addEventEdit action
export const editEvent = (eventId, updatedEvent) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:3000/events/${eventId}`, updatedEvent);
    console.log(response);
    if (response.status === 200) {
      dispatch({ type: 'events/eventEdit', payload: response.data });
    }
  } catch (err) {
    console.error(err);
  }
};
