import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import AdminDashboard from '../dashboard/admin/adminDashboard';
import VolunteerDashboard from '../dashboard/volunteer/volunteerDashboard';
import Header from '../header/header';
import Footer from '../footer/footer';

import './layout.css';

const Layout = ({ cookies }) => {
  const [permissions, setPermissions] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    const userID = cookies.get('userId');
    setIsLoading(true);
    const result = await axios.get(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/accounts/${userID}`, {
      withCredentials: true,
    });

    setPermissions(result.data.permissions.permissions);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (<div>Loading dashboard...</div>);
  }

  return (
    <div className="layout">
      <Header />
      {(permissions === 'Admin' || permissions === 'Staff') ? <AdminDashboard /> : <VolunteerDashboard />}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Layout);
