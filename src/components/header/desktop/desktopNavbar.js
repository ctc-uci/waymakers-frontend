import React from 'react';
import { Link } from 'react-router-dom';

import './desktopNavbar.css';

const DesktopNavbar = () => {
  // dummy isAdmin & isVolunteer vars; change with addition of logic to get user perms
  const isAdmin = true;
  const isVolunteer = false;
  return (
    <div className="desktop-navbar">
      {isVolunteer && <Link to="/">isAdmin</Link>}
      {isVolunteer && <Link to="/">isAdmin</Link>}
      {isAdmin && <Link to="/analytics" className="desktop-navbar-link">Analytics</Link>}
      {/* <Link to="/" className="desktop-navbar-link">Temp Link</Link> */}
      {isAdmin && <Link to="/events" className="desktop-navbar-link">Events</Link>}
      {isAdmin && <Link to="/inventory" className="desktop-navbar-link">Inventory</Link>}
      {isAdmin && <Link to="/users" className="desktop-navbar-link">Users</Link>}
    </div>
  );
};

export default DesktopNavbar;
