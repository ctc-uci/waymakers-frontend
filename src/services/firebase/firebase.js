// // Firebase App (the core Firebase SDK) is always required and
// // must be listed before other Firebase SDKs
// // import firebase from 'firebase/app';
// import 'firebase/auth';

// const firebase = require('firebase/app');

// // Add the Firebase services that you want to use

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: 'waymakers-6465d.firebaseapp.com',
//   projectId: 'waymakers-6465d',
//   storageBucket: 'waymakers-6465d.appspot.com',
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

// const app = firebase.initializeApp(firebaseConfig);
// export const auth = app.auth();
// export const auth2 = firebase;
// // export const firebase;

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();

export default {
  firebase,
  app,
  auth,
};
