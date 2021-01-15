import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import HoursBox from './hoursBox';

const ViewHours = () => {
  const [logs, setLogs] = useState([]);
  const events = [
    {
      event_name: 'name',
      date: 'today',
      location: 'zoom',
      start: '1pm',
      end: '2pm',
      total_hours: '1',
    },
  ];

  async function getLogs() {
    try {
      let allLogs = await axios.get('http://localhost:3000/logs/');
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

  console.log(events);
  return (
    <div>
      <HoursBox events={logs} />
    </div>
  );
};

export default ViewHours;
