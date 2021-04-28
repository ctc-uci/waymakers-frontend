import React, { useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import handleOutsideClick from '../../../common/handleOutsideClick';
import GoogleAuthService from '../../../services/firebase/firebase';
import SubmitHoursPopup from '../../volunteer/volHours/unsubmittedHours/SubmitHoursPopup';

import './desktopNavbar.css';

const DesktopNavbar = (props) => {
  // dummy isAdmin & isVolunteer vars; change with addition of logic to get user perms
  const { cookies } = props;
  const userPerms = cookies.get('userPermissions');
  const isAdmin = (userPerms === 'Admin');
  const isVolunteer = (userPerms === 'Volunteer');
  const [open, setOpen] = useState(false);
  const [submitHoursOpen, setSubmitHoursOpen] = useState(false);
  const ref = useRef();
  const history = useHistory();

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
      cookies.remove('userPermissions');
      // Sign-out successful
    } catch (err) {
      console.log('Logout failed');
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
        onClick={logout}
      >
        Log Out
      </button>
    </div>
  );

  // Note: User Directory page not complete
  return (
    <div className="desktop-navbar" ref={ref}>
      <Link to="/events" className="desktop-navbar-link">Events</Link>
      {isVolunteer && <Link to="/volunteer/hours" className="desktop-navbar-link">My Hours</Link>}
      {isVolunteer
      && (
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
      )}
      {isAdmin && <Link to="/inventory" className="desktop-navbar-link">Inventory</Link>}
      {isAdmin && <Link to="/users" className="desktop-navbar-link">User Directory</Link>}
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
