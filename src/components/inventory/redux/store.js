import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Creates a store using the "rootReducer"
// defined in ./reducers/index.js
export default createStore(rootReducer, applyMiddleware(thunk));

// -- COMMENT ABOVE AND UNCOMMENT BELOW TO DEBUG STORE WITH Redux DevTools ---
// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';

// /* eslint-disable no-underscore-dangle */
// const composeEnhancers = typeof window === 'object'
//   && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//     // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//   }) : compose;
// /* eslint-enable */

// // Apply middleware here
// const enhancer = composeEnhancers(
//   applyMiddleware(thunk),
// );

// export default createStore(rootReducer, enhancer);
