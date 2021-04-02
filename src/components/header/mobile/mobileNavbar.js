import React from 'react';

import './mobileNavbar.css';
import HamburgerIcon from '../../../assets/hamburgerIcon.svg';

const MobileNavbar = () => (
  <div className="navbar">
    <img
      src={HamburgerIcon}
      alt="Hamburger Icon"
    />
  </div>
);

export default MobileNavbar;
