const axios = require('axios');

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
  withCredentials: true,
});
// Actions: fetch, edit, add, delete

// Fetching events from server
export const fetchEvents = () => async (dispatch) => {
  console.log('HELLO');
  const url = 'events/';
  // TODO: Add filters for getting events based on division, type, user, etc.
  try {
    const response = await instance.get(url);
    console.log('FETCHING EVENTS');
    dispatch({ type: 'events/eventsLoaded', payload: response.data });
    return null; // Need this so we exit async function
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    return err; // Need this so we exit async function
  }
};

// Creates an events/eventAdded action
export const addEvent = (newEvent) => async (dispatch) => {
  try {
    const response = await instance.post('events/add', newEvent);
    if (response.status === 200) {
      dispatch({ type: 'events/eventAdded', payload: response.data });
    }
    return null;
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    return err;
  }
};

// Creates a events/eventDeleted action
export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    const response = await instance.delete(`events/${eventId}`);
    if (response.status === 200) {
      dispatch({ type: 'events/eventDeleted', payload: response.data });
    }
    return null;
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    return err; // not sure where this goes though, but need so it doesn't error
  }
};

// Creates a events/eventEdit action
export const editEvent = (eventId, updatedEvent) => async (dispatch) => {
  try {
    const response = await instance.put(`events/${eventId}`, updatedEvent);
    if (response.status === 200) {
      dispatch({ type: 'events/eventEdited', payload: response.data });
    }
    return null;
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    return err;
  }
};

// User Events
export const fetchUserEvents = (userId) => async (dispatch) => {
  try {
    const response = await instance.get(`userEvent/${userId}`);
    if (response.status === 200) {
      dispatch({ type: 'events/userEventsLoaded', payload: response.data });
    }
    return null;
  } catch (err) {
    // eslint-disable-next-line
    console.error(err);
    return err;
  }
};

// Creates an events/eventAdded action
export const addUserEvent = (userId, eventId) => async (dispatch) => {
  try {
    const response = await instance.post('userEvent/add', { userId, eventId });
    console.log(response.status);
    if (response.status === 200) {
      dispatch({ type: 'events/userEventAdded', payload: response.data });
    }
    return null;
  } catch (err) {
    console.log('You already added this event to your calendar.');
    // eslint-disable-next-line
    console.error(err);
    return err;
  }
};

// Dispatches actions to change selected division, and load connected warehouses
export const setShowPopup = (newValue) => async (dispatch) => {
  dispatch({ type: 'events/showPopupModified', payload: newValue });
};

export const changeDay = (newDay) => async (dispatch) => {
  dispatch({ type: 'events/daySelected', payload: newDay });
};

export const changeMonth = (newMonth) => async (dispatch) => {
  dispatch({ type: 'events/monthSelected', payload: newMonth });
};

export const changeYear = (newYear) => async (dispatch) => {
  dispatch({ type: 'events/yearSelected', payload: newYear });
};

export const changeSelectedEvent = (event) => async (dispatch) => {
  dispatch({ type: 'events/eventSelected', payload: event });
};

export const changeView = (newView) => async (dispatch) => {
  dispatch({ type: 'events/viewSelected', payload: newView });
};
