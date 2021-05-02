/* eslint-disable no-undef */
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import { logout } from '../../../common/utils';
import handleOutsideClick from '../../../common/handleOutsideClick';

import SubmitHoursPopup from '../../volunteer/volHours/unsubmittedHours/SubmitHoursPopup';

import profilePlaceholder from '../../../assets/profileplaceholder.jpg';

import './desktopNavbar.css';

const DesktopNavbar = (props) => {
  // dummy isAdmin & isVolunteer vars; change with addition of logic to get user perms
  const { cookies } = props;
  const userPerms = cookies.get('userPermissions');
  const isAdmin = userPerms === 'Admin';
  const isVolunteer = userPerms === 'Volunteer';

  const [open, setOpen] = useState(false);
  const [submitHoursOpen, setSubmitHoursOpen] = useState(false);
  // const [profilePicture, setProfiePicture] = useState(null);
  const ref = useRef();

  // useEffect(() => {
  //   setProfiePicture(localStorage.getItem('profilePicture'));
  // }, [localStorage.getItem('profilePicture')]);

  // Close profile menu when user clicks outside of it
  handleOutsideClick(ref, () => {
    setOpen(false);
  });

  async function handleLogout() {
    try {
      setOpen(false);
      await logout();
      // Sign-out successful
    } catch (err) {
      console.log('Logout failed', err);
    }
  }

  const toggleMenuOpen = () => {
    setOpen(!open);
  };

  const profileMenu = (
    <div className="navbar-profile-menu-container">
      <a href="/profile" className="navbar-profile-menu-link">View Profile</a>
      <button
        type="button"
        label="navbar-logout-button"
        className="navbar-logout-button"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );

  // Note: User Directory page not complete
  return (
    <div className="desktop-navbar" ref={ref}>
      {isAdmin && <Link to="/inventory" className="desktop-navbar-link">Inventory</Link>}
      {isAdmin && <Link to="/users" className="desktop-navbar-link">User Directory</Link>}
      {isAdmin && <Link to="/events" className="desktop-navbar-link">Events</Link>}
      {isVolunteer && <Link to="/volunteer/events" className="desktop-navbar-link">Events</Link>}
      <Link to="/volunteer/hours" className="desktop-navbar-link">My Hours</Link>
      <div>
        <button
          className="desktop-navbar-submit-hours-button"
          aria-label="Submit Hours"
          type="button"
          onClick={() => setSubmitHoursOpen(true)}
        >
          Submit Hours
        </button>
        {submitHoursOpen
          && (
            <SubmitHoursPopup
              isModalOpen={submitHoursOpen}
              setIsModalOpen={setSubmitHoursOpen}
              eventTitle=""
            />
          )}
      </div>
      <div
        className="profile-button"
        role="button"
        onClick={toggleMenuOpen}
        onKeyPress={toggleMenuOpen}
        tabIndex="0"
      >
        <img src={localStorage.getItem('profilePicture') || profilePlaceholder} className="profile-picture" alt="pfp" />
      </div>
      {open && profileMenu}
    </div>
  );
};

DesktopNavbar.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(DesktopNavbar);
