const axios = require('axios');

/* ex:
  const response = await wmkAPI.post('/route_appended_to_baseURL', body);
  const response = await wmkAPI.post(`/route_appended_to_baseURL/{:params}`, body);
*/
const wmkAPI = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
  withCredentials: true,
});

const dummyFunc = () => {};

export {
  wmkAPI,
  dummyFunc,
};
