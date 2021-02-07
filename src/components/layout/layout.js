import React from 'react';

import VolunteerDashboard from '../dashboard/volunteer/volunteerDashboard';
import Header from '../header/header';
import Footer from '../footer/footer';

import './layout.css';

const Layout = () => (
  <div className="layout">
    <Header />
    <VolunteerDashboard />
    <Footer />
  </div>
);

export default Layout;
