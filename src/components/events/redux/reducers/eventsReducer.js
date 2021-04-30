// Initial state populated with sample values

/*
Popup Types:
ConfirmCancelPopup
AddEventPopup
AddMyHoursPopup
RemoveFromMyEventPopup
EditEventsPopup
AddEventForm
ViewEventInfoPopup
ModifyEventInfoForm
CreateEventForm
LogHoursForm
*/

export const initialState = {
  eventsList: [], // List of event objects
  userEventsList: [],
  showPopup: false,
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  day: new Date().getDate(),
  selectedEvent: {},
  view: 'dayGridMonth',
  popupType: '',
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
        eventsList: [...state.eventsList, action.payload[0]],
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
      // Overriding the current eventsList with the new one
      return {
        ...state,
        userEventsList: action.payload,
      };
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

    case 'events/userEventRemoved': {
      // eslint-disable-next-line
      console.log(`[ACTION: events/userEventRemoved] Removing event with content ${action.payload}`);
      // Appending the new event
      const id = action.payload[0].eventId;
      // TODO: Add error handling in case event not found?
      const newUserEvents = state.userEventsList.filter((event) => event.id !== id);
      return {
        ...state,
        userEventsList: newUserEvents,
      };
    }

    case 'events/showPopupModified': {
      // eslint-disable-next-line
      console.log(`[ACTION: events/showPopupModified] Setting showPopup to ${action.payload}`);
      return {
        ...state,
        showPopup: action.payload,
      };
    }

    case 'events/daySelected': {
      // eslint-disable-next-line
      console.log(`[ACTION: events/daySelected] Setting day to ${action.payload}`);
      return {
        ...state,
        day: action.payload,
      };
    }

    case 'events/monthSelected': {
      // eslint-disable-next-line
      console.log(`[ACTION: events/monthSelected] Setting month to ${action.payload}`);
      return {
        ...state,
        month: action.payload,
      };
    }

    case 'events/yearSelected': {
      // eslint-disable-next-line
      console.log(`[ACTION: events/yearSelected] Setting year to ${action.payload}`);
      return {
        ...state,
        year: action.payload,
      };
    }

    case 'events/dateSelected': {
      // eslint-disable-next-line
      console.log(`[ACTION: events/dateSelected] Setting date to ${action.payload}`);
      return {
        ...state,
        day: action.payload.day,
        month: action.payload.month,
        year: action.payload.year,
      };
    }

    case 'events/eventSelected': {
      // eslint-disable-next-line
      console.log(`[ACTION: events/eventSelected] Selecting event: ${action.payload}`);
      return {
        ...state,
        selectedEvent: action.payload,
      };
    }

    case 'events/viewSelected': {
      // eslint-disable-next-line
      console.log(`[ACTION: events/viewSelected] Selecting view: ${action.payload}`);
      return {
        ...state,
        view: action.payload,
      };
    }

    case 'events/popupTypeSelected': {
      // eslint-disable-next-line
      console.log(`[ACTION: events/popupTypeSelected] Selecting popupType: ${action.payload}`);
      return {
        ...state,
        popupType: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
