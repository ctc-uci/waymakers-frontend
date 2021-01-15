const axios = require('axios');

// Actions: fetch, edit, add, delete

// Fetching events from server
export const fetchEvents = () => async (dispatch) => {
  const url = 'http://localhost:3000/events/';
  // TODO: Add filters for getting events based on division, type, user, etc.
  try {
    const response = await axios.get(url);
    dispatch({ type: 'events/eventsLoaded', payload: response.data });
    return null; // Need this so we exit async function
  } catch (err) {
    console.error(err);
    return err; // Need this so we exit async function
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
    return null;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// Creates a events/eventDeleted action
export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    const response = await axios.delete(`http://localhost:3000/events/${eventId}`);
    if (response.status === 200) {
      dispatch({ type: 'events/eventDeleted', payload: response.data });
    }
    return null;
  } catch (err) {
    console.error(err);
    return err; // not sure where this goes though, but need so it doesn't error
  }
};

// Creates a events/eventEdit action
export const editEvent = (eventId, updatedEvent) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:3000/events/${eventId}`, updatedEvent);
    console.log(response);
    if (response.status === 200) {
      dispatch({ type: 'events/eventEdit', payload: response.data });
    }
    return null;
  } catch (err) {
    console.error(err);
    return err;
  }
};
