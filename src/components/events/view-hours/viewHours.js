import React, { useState, useEffect } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import axios from 'axios';
import HoursBox from './hoursBox';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
  withCredentials: true,
});

const ViewHours = ({ cookies }) => {
  const [logs, setLogs] = useState([]);

  async function getLogs() {
    try {
      let allLogs = await instance.get(`logs/${cookies.cookies.userId}`);
      console.log(allLogs.data);
      if (allLogs.status === 200) {
        allLogs = allLogs.data;
      }
      setLogs(allLogs);
    } catch (e) {
      // eslint-disable-next-line
      console.log('Error while getting logs from the backend!');
    }
  }

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <div>
      <HoursBox logs={logs} />
    </div>
  );
};

ViewHours.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default withCookies(ViewHours);
