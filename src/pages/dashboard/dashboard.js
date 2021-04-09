import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import AdminDashboard from './adminDashboard';
import VolunteerDashboard from './volunteerDashboard';

const Dashboard = ({ cookies }) => {
  const [permissions, setPermissions] = useState('');
  const [currDashboard, setCurrDashboard] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    const userID = cookies.get('userId');
    setIsLoading(true);
    const result = await axios.get(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/accounts/${userID}`, {
      withCredentials: true,
    });

    setPermissions(result.data.permissions.permissions);

    if (result.data.permissions.permissions === 'Volunteer') {
      setCurrDashboard('volunteer');
    } else {
      setCurrDashboard('admin');
    }

    setIsLoading(false);
  }, []);

  const renderDropdown = () => (
    <div>
      <select
        name="dashboards"
        id="dashboards"
        onChange={(e) => {
          setCurrDashboard(e.target.value);
        }}
      >
        <option key={0} value="admin">Admin Dashboard</option>
        <option key={1} value="dashboard">Volunteer Dashboard</option>
      </select>
    </div>
  );

  if (isLoading) {
    return (<div>Loading dashboard...</div>);
  }

  return (
    <div>
      {(permissions === 'Admin' || permissions === 'Staff') && renderDropdown()}
      {(currDashboard === 'admin') ? <AdminDashboard /> : <VolunteerDashboard />}
    </div>
  );
};

Dashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Dashboard);
