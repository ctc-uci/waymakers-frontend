import React from 'react';
import { Link } from 'react-router-dom';

import './desktopNavbar.css';

const DesktopNavbar = () => {
  // dummy isAdmin & isVolunteer vars; change with addition of logic to get user perms
  const isAdmin = true;
  const isVolunteer = false;
  return (
    <div className="desktop-navbar">
      {isAdmin && <Link to="/analytics" className="desktop-navbar-link">Analytics</Link>}
      <Link to="/events" className="desktop-navbar-link">Events</Link>
      {isVolunteer && <Link to="/volunteer/hours" className="desktop-navbar-link">My Hours</Link>}
      {isVolunteer
      && (
        <a href="/volunteer/hours">
          <button className="desktop-navbar-submit-hours-button" aria-label="Submit Hours" type="button">Submit Hours</button>
        </a>
      )}
      {isAdmin && <Link to="/inventory" className="desktop-navbar-link">Inventory</Link>}
      {isAdmin && <Link to="/users" className="desktop-navbar-link">Users</Link>}
      {/* <div className="desktop-navbar-pfp" /> */}
      <div className="profile" />
    </div>
  );
};

export default DesktopNavbar;
