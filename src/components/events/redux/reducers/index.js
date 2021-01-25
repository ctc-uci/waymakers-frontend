import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';

// Combines all reducers into a single "rootReducer"
// used to create the store
// Define a top-level state field named `events`, handled by `events`
const rootReducer = combineReducers({ events: eventsReducer });

export default rootReducer;
