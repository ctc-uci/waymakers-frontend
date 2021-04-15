import axios from 'axios';

import './ConfigLoader';

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

let baseURL;

if (process.env.REACT_APP_ENV === 'PRODUCTION') {
  baseURL = `${process.env.REACT_APP_HOST}`;
} else {
  baseURL = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;
}

console.log(process.env);
console.log('baseURL: ', baseURL);

export const WMKBackend = axios.create({
  baseURL,
  withCredentials: true,
});
