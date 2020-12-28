import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';

// Combines all reducers into a single "rootReducer"
// used to create the store
// Define a top-level state field named `items`, handled by `items`
const rootReducer = combineReducers({ items: itemsReducer });

export default rootReducer;
