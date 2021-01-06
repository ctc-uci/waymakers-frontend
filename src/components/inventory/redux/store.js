import { createStore, applyMiddleware} from 'redux';
// import { createStore, applyMiddleware, compose } from 'redux'; // Non-windows
import thunk from 'redux-thunk';
import rootReducer from './reducers';


// // Uncomment to debug store with Redux DevTools on non-windows
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
// // Creates a store using the "rootReducer"
// // defined in ./reducers/index.js
// export default createStore(rootReducer, enhancer);

export default createStore(rootReducer, applyMiddleware(thunk));
