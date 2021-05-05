import React, { useState, useEffect } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import { WMKBackend } from '../../../common/utils';

import HoursBox from './hoursBox';

const ViewHours = ({ cookies }) => {
  const [logs, setLogs] = useState([]);

  async function getLogs() {
    try {
      let allLogs = await WMKBackend.get(`/logs/${cookies.cookies.userId}`);
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
      <Helmet>
        <title>Waymakers | View Hours</title>
      </Helmet>
      <HoursBox logs={logs} />
    </div>
  );
};

ViewHours.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export default withCookies(ViewHours);
