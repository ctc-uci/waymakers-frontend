/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import axios from 'axios';

import './ConfigLoader';
import GoogleAuthService from '../services/firebase/firebase';

export const DATE_FORMAT = {
  MY_HOURS: 'events',
};

export const formatDate = (dateString, type = DATE_FORMAT.MY_HOURS) => {
  const timestamp = new Date(dateString);

  switch (type) {
    case DATE_FORMAT.MY_HOURS:
      return new Intl.DateTimeFormat('en', {
        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
      }).format(timestamp);

    default:
      return 'NOT SUPPORTED';
  }
};

export const refreshPage = () => {
  // eslint-disable-next-line no-undef
  if (window) {
    // eslint-disable-next-line no-undef
    window.location.reload();
  } else {
    console.error('Could not find window object and thus did not refresh page');
  }
};

const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const logout = async () => {
  try {
    await GoogleAuthService.auth.signOut();
    window.location.href = '/login';
    // Removing session cookie
    deleteCookie('accessToken');
    deleteCookie('userId');
    deleteCookie('userPermissions');

    if (localStorage.getItem('profilePicture')) {
      localStorage.removeItem('profilePicture');
    }
    localStorage.removeItem('userFullName');
    // Sign-out successful
  } catch (err) {
    console.log('Logout failed', err);
  }
};

const setCookie = (key, value, config) => {
  let cookie = `${key}=${value}; max-age=${config.maxAge}; path=${config.path}`;

  if (config.domain) {
    cookie += `; domain=${config.domain}`;
  }
  if (cookie.secure) {
    cookie += '; secure';
  }
  document.cookie = cookie;
};

// Returns the current user synchronously
const getCurrentUser = (auth) => (
  new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  })
);

// Refreshes the current user's access token
export const refreshToken = async () => {
  const user = await getCurrentUser(GoogleAuthService.auth);
  console.log(user);
  if (user) {
    console.log('AUTH STATE CHANGED!');
    const refreshUrl = `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    const refreshT = user.refreshToken;

    try {
      const { data: { access_token: idToken } } = await axios.post(refreshUrl, {
        grant_type: 'refresh_token',
        refresh_token: refreshT,
      });

      if (process.env.NODE_ENV === 'production') {
        setCookie('accessToken', idToken, {
          maxAge: 3600,
          path: '/',
          domain: `${process.env.REACT_APP_COOKIE_DOMAIN}`,
          secure: true,
        });
      } else {
        setCookie('accessToken', idToken, {
          maxAge: 3600,
          path: '/',
        });
      }

      console.log('ACCESS TOKEN COOKIE REFRESHED REFRESHTOKEN OUT');
      return idToken;
    } catch (e) {
      console.error('@refreshToken failed to refresh accessToken');
      return null;
    }
  }
  return null;
};

export const normalizePhoneInput = (value, previousValue) => {
  // return nothing if no value
  if (!value) return value;

  // only allows 0-9 inputs
  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;

  if (!previousValue || value.length > previousValue.length) {
    // returns: "x", "xx", "xxx"
    if (cvLength < 4) return currentValue;

    // returns: "(xxx)", "(xxx) x", "(xxx) xx", "(xxx) xxx",
    if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;

    // returns: "(xxx) xxx-", (xxx) xxx-x", "(xxx) xxx-xx", "(xxx) xxx-xxx", "(xxx) xxx-xxxx"
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
  }

  return value;
};

let baseURL;

if (process.env.NODE_ENV === 'production') {
  baseURL = `${process.env.REACT_APP_HOST}`;
} else {
  baseURL = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;
}

export const WMKBackend = axios.create({
  baseURL,
  withCredentials: true,
});

WMKBackend.interceptors.request.use(
  (config) => {
    console.log(`${config.method.toUpperCase()} Request made to ${config.url} with data:`, config.data, config.params);
    return config;
  },
  (err) => {
    console.log(err);
    return err;
  },
);

// Add a response interceptor
WMKBackend.interceptors.response.use(
  (response) => {
    const { status, data, config } = response;
    console.log(`Response from ${config.url}:`, {
      code: status,
      ...data,
    });
    return response;
  },
  async (error) => {
    if (error.response) {
      const { status, data } = error.response;
      console.log('WMKBACKEND RESPONSE INTERCEPTOR ERROR:', error.response);

      switch (status) {
        case 400:
          // check if 400 error was token
          console.log(data);
          if (data === '@verifyToken No access token provided') {
            // token has expired;
            try {
              // attempting to refresh token;
              await refreshToken();
              // token refreshed, reattempting request;
              const { config } = error.response;
              // configure new request in a new instance;
              return await axios({
                method: config.method,
                url: `${config.baseURL}${config.url}`,
                data: config.data,
                params: config.params,
                headers: config.headers,
                withCredentials: true,
              });
            } catch (e) {
              console.log(e);
              return window.location.href = '/500';
            }
          } else {
            throw error;
          }
        default:
          return Promise.reject(error);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return Promise.reject(error);
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error);
    }
  },
);
