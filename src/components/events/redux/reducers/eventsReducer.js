// Initial state populated with sample values
export const initialState = {
  eventsList: [], // List of event objects
  userEventsList: [],
};

// Handles the logic of updating the state
// depending on which action was dispatched
export default (state = initialState, action) => {
  switch (action.type) {
    case 'events/eventsLoaded': {
      // eslint-disable-next-line
      console.log('[ACTION: events/eventsLoaded] Events loaded');
      // Overriding the current eventsList with the new one
      return {
        ...state,
        eventsList: action.payload,
      };
    }

    // TODO: Test add, edit, delete actions
    case 'events/eventAdded': {
      // eslint-disable-next-line
      console.log(`[ACTION: events/eventAdded] Adding event with content ${action.payload}`);
      // Appending the new event
      return {
        ...state,
        eventsList: [...state.eventsList, action.payload.rows[0]],
      };
    }
    case 'events/eventDeleted': {
      // eslint-disable-next-line
      console.log(`[ACTION: events/eventDeleted] Deleting event with content ${action.payload}`);
      // Deleting the given event
      let updatedList = [...state.eventsList];
      updatedList = updatedList.filter((event) => event.id !== action.payload.rows[0].event_id);
      return {
        ...state,
        eventsList: updatedList,
      };
    }
    case 'events/eventEdited': {
      // eslint-disable-next-line
      console.log(`[ACTION: events/eventEdited] Editing event with content ${action.payload}`);
      console.log(action.payload);
      // Update that event
      let updatedList = [...state.eventsList];
      updatedList = updatedList.filter((event) => event.id !== action.payload[0].id);
      updatedList.push(action.payload[0]);
      console.log(updatedList);
      return {
        ...state,
        eventsList: updatedList,
      };
    }

    // USER EVENTS
    case 'events/userEventsLoaded': {
      // eslint-disable-next-line
      console.log('[ACTION: events/userEventsLoaded] Events loaded');
      console.log(action.payload);
      // Overriding the current eventsList with the new one
      return {
        ...state,
        userEventsList: action.payload,
      };
    }
    default: {
      return state;
    }

    case 'events/userEventAdded': {
      // eslint-disable-next-line
      console.log(`[ACTION: events/userEventAdded] Adding event with content ${action.payload}`);
      // Appending the new event
      const id = action.payload[0].eventId;
      // TODO: Add error handling in case event not found?
      const addedEvent = state.eventsList.filter((event) => event.id === id)[0];
      return {
        ...state,
        userEventsList: [...state.userEventsList, addedEvent],
      };
    }
  }
};
