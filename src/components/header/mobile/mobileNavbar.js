import React, { useState, useRef } from 'react';
import { instanceOf } from 'prop-types';
import { Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';

import { logout } from '../../../common/utils';
import handleOutsideClick from '../../../common/handleOutsideClick';
import SubmitHoursPopup from '../../volunteer/volHours/unsubmittedHours/SubmitHoursPopup';

import './mobileNavbar.css';
import HamburgerIcon from '../../../assets/hamburgerIcon.svg';

const MobileNavbar = (props) => {
  const { cookies } = props;
  const userPerms = cookies.get('userPermissions');
  const isAdmin = (userPerms === 'Admin');
  const isVolunteer = (userPerms === 'Volunteer');
  const ref = useRef();

  const [open, setOpen] = useState(false);
  const [submitHoursOpen, setSubmitHoursOpen] = useState(false);

  const toggleMenuOpen = () => {
    setOpen(!open);
  };

  // Close dropdown menu when user clicks outside of it
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

  // Note: User Directory page not complete
  const adminDropdown = (
    <div className="navbar-mobile-menu-container">
      <Link to="/profile" className="mobile-navbar-link" onClick={() => toggleMenuOpen()}>
        Profile
      </Link>
      <Link to="/inventory" className="mobile-navbar-link" onClick={() => toggleMenuOpen()}>
        Inventory
      </Link>
      <Link to="/users" className="mobile-navbar-link" onClick={() => toggleMenuOpen()}>
        User Directory
      </Link>
      <Link to="/volunteer/hours" className="mobile-navbar-link" onClick={() => toggleMenuOpen()}>
        My Hours
      </Link>
      <Link to="/events" className="mobile-navbar-link" onClick={() => toggleMenuOpen()}>
        Events
      </Link>
      <button
        className="mobile-navbar-submit-hours-button"
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
      <button
        type="button"
        label="navbar-logout-button"
        className="navbar-mobile-logout-button"
        onClick={handleLogout}
      >
        Log Out
      </button>
    </div>
  );

  const volunteerDropdown = (
    <div className="navbar-mobile-menu-container">
      <Link to="/profile" className="mobile-navbar-link" onClick={() => toggleMenuOpen()}>
        Profile
      </Link>
      <Link to="/events" className="mobile-navbar-link" onClick={() => toggleMenuOpen()}>
        Events
      </Link>
      <Link to="/volunteer/hours" className="mobile-navbar-link" onClick={() => toggleMenuOpen()}>
        My Hours
      </Link>
      <button
        className="mobile-navbar-submit-hours-button"
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
      <button
        type="button"
        label="navbar-logout-button"
        className="navbar-mobile-logout-button"
        onClick={logout}
      >
        Log Out
      </button>
    </div>
  );

  return (
    <div ref={ref}>
      <button type="button" className="hamburger-menu" onClick={() => toggleMenuOpen()}>
        <img src={HamburgerIcon} alt="Open Menu" />
      </button>
      {(open && isAdmin) && adminDropdown}
      {(open && isVolunteer) && volunteerDropdown}
    </div>
  );
};

MobileNavbar.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(MobileNavbar);
