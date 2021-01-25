// Initial state populated with sample values
export const initialState = {
  eventsList: [], // List of event objects
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
      // Update that event
      let updatedList = [...state.eventsList];
      updatedList = updatedList.filter((event) => event.id !== action.payload.rows[0].event_id);
      updatedList.concat(action.payload.rows[0]);
      return {
        ...state,
        eventsList: updatedList,
      };
    }
    default: {
      return state;
    }
  }
};
