import { combineReducers } from 'redux';
import items from './items';

// Combines all reducers into a single "rootReducer"
// used to create the store
export default combineReducers({ items });
