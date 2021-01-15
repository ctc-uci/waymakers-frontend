import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { createStore, applyMiddleware, compose } from 'redux'; // Non-windows

import rootReducer from './reducers/index';

// // Uncomment to debug store with Redux DevTools on non-windows
// /* eslint-disable no-underscore-dangle */
// const composeEnhancers = typeof window === 'object'
//   && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//     // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//   }) : compose;

// const enhancer = composeEnhancers(
//   applyMiddleware(thunk),
// );
// export default createStore(rootReducer, enhancer);
export default createStore(rootReducer, applyMiddleware(thunk));
