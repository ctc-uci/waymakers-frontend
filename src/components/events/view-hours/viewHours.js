import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HoursBox from './hoursBox';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
  withCredentials: true,
});

const ViewHours = () => {
  const [logs, setLogs] = useState([]);

  async function getLogs() {
    try {
      let allLogs = await instance.get('logs/');
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
      <HoursBox events={logs} />
    </div>
  );
};

export default ViewHours;
