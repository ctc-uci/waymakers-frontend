import React from 'react';
import WMKLogo from '../../assets/wmkLogo.svg';
import useWindowDimension from '../../common/useWindowDimension';

import './header.css';
import DesktopNavbar from './desktop/desktopNavbar';
import MobileNavbar from './mobile/mobileNavbar';

const Header = () => {
  const { width } = useWindowDimension();

  return (
    <div className="header">
      <div className="header-left-wrapper">
        <img
          src={WMKLogo}
          alt="Waymakers Logo"
          className="header-wmk-logo"
        />
      </div>
      <div className="header-right-wrapper">
        {width > 768
          ? <DesktopNavbar />
          : <MobileNavbar />}
      </div>
    </div>
  );
};
export default Header;
