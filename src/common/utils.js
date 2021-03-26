const axios = require('axios');

const server = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
  withCredentials: true,
});

export default server;
