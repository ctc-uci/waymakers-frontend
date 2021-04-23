import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import WMKLogo from '../../assets/wmkLogo.svg';
import useMobileWidth from '../../common/useMobileWidth';

import './header.css';
import DesktopNavbar from './desktop/desktopNavbar';
import MobileNavbar from './mobile/mobileNavbar';

const Header = () => {
  const isMobile = useMobileWidth();
  const location = useLocation();
  const doNotShow = location.pathname in ['login', 'register'];

  return (doNotShow ? null
    : (
      <div className="header">
        <div className="header-left-wrapper">
          <Link to="/">
            <img
              src={WMKLogo}
              alt="Waymakers Logo"
              className="header-wmk-logo"
            />
          </Link>
        </div>
        <div className="header-right-wrapper">
          {isMobile
            ? <MobileNavbar />
            : <DesktopNavbar />}
        </div>
      </div>
    )
  );
};
export default Header;
