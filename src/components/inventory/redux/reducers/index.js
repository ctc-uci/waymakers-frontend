import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import categoriesReducer from './categoriesReducer';
import divisionsReducer from './divisionsReducer';
import editsReducer from './editsReducer';

// Combines all reducers into a single "rootReducer"
// used to create the store
// Define a top-level state field named `items`, handled by `items`
const rootReducer = combineReducers({
  items: itemsReducer,
  edits: editsReducer,
  categories: categoriesReducer,
  divisions: divisionsReducer,
});

export default rootReducer;

export {
  itemsReducer,
  categoriesReducer,
  divisionsReducer,
  editsReducer,
};
