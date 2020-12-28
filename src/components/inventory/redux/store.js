import { createStore } from 'redux';
import rootReducer from './reducers';

// Creates a store using the "rootReducer"
// defined in ./reducers/index.js
// export default createStore(rootReducer);

// Required to debug store with Redux DevTools
/* eslint-disable no-underscore-dangle */
export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */
