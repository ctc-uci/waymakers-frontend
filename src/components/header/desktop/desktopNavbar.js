import React, { useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import handleOutsideClick from '../../../common/handleOutsideClick';
import GoogleAuthService from '../../../services/firebase/firebase';

import './desktopNavbar.css';

const DesktopNavbar = (props) => {
  // dummy isAdmin & isVolunteer vars; change with addition of logic to get user perms
  const isAdmin = true;
  const isVolunteer = false;

  const { cookies } = props;
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const history = useHistory();

  // TODOS:
  // - finish styling the profile menu; pretty sure logout works but confirm just in case
  // - this shouldn't display when it's on a login/register page, also needs a
  // "switch to admin view/switch to volunteer view" option for the dashboard page -
  // look into useLocation() in react-router-dom to achieve this conditional rendering
  // - the "submit hours" popup will have to show the popup to submit hours for events right on
  // the page without navigating away - look into how that was implemented on the "add hours" pg

  // Close profile menu when user clicks outside of it
  handleOutsideClick(ref, () => {
    setOpen(false);
  });

  async function logout() {
    try {
      setOpen(false);
      await GoogleAuthService.auth.signOut();
      history.push('/login');
      // Removing session cookie
      cookies.remove('accessToken');
      cookies.remove('userId');
      // Sign-out successful
    } catch (err) {
      console.log('Logout failed');
    }
  }

  const toggleMenuOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const profileMenu = (
    <div className="navbar-profile-menu-container">
      <a href="/profile" className="navbar-profile-menu-link">
        <div className="navbar-profile-menu-option">View Profile</div>
      </a>
      <button
        type="button"
        label="navbar-logout-button"
        className="navbar-profile-menu-option"
        onClick={logout}
      >
        Log Out
      </button>
    </div>
  );

  return (
    <div className="desktop-navbar" ref={ref}>
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
      <button
        type="button"
        label="profile-picture"
        className="profile"
        onClick={toggleMenuOpen}
      />
      {open && profileMenu}
    </div>
  );
};

DesktopNavbar.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(DesktopNavbar);
