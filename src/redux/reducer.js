import { combineReducers } from 'redux';

import {
  itemsReducer, categoriesReducer, divisionsReducer, editsReducer,
} from '../components/inventory/redux/reducers';

import {
  eventsReducer,
} from '../components/events/redux/reducers';

import AlertBannerReducer from '../common/AlertBanner/AlertBannerSlice';

// Combines all reducers into a single "rootReducer"
// used to create the store
// Define a top-level state field named `items`, handled by `items`
const rootReducer = combineReducers({
  items: itemsReducer,
  edits: editsReducer,
  categories: categoriesReducer,
  divisions: divisionsReducer,
  events: eventsReducer,
  notifications: AlertBannerReducer,
});

export default rootReducer;
