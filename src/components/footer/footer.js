import React from 'react';
import styled from 'styled-components';

import WMKIcon from '../../assets/wmkIcon.svg';
import TwitterIcon from '../../assets/twitterIcon.svg';
import FacebookIcon from '../../assets/facebookIcon.svg';
import InstagramIcon from '../../assets/instagramIcon.svg';

import './footer.css';

const VerticalDivider = styled.div`
  width: 1px;
  height: 80px;
  margin-left: 30px;
  margin-right: 30px;
  background: #E1CECE;
`;

const Footer = () => (
  <div className="footer">
    <div className="footer-content">
      <div className="social-media">
        <a href="https://waymakersoc.org/">
          <img src={WMKIcon} className="footer-icon" alt="waymakers" />
        </a>
        <VerticalDivider className="footer-divider" />
        <a href="https://twitter.com/WaymakersOC?s=20">
          <img src={TwitterIcon} className="footer-icon" alt="twitter" />
        </a>
        <VerticalDivider className="footer-divider" />
        <a href="https://www.facebook.com/WaymakersOC/">
          <img src={FacebookIcon} className="footer-icon" alt="facebook" />
        </a>
        <VerticalDivider className="footer-divider" />
        <a href="https://www.instagram.com/WaymakersOC/">
          <img src={InstagramIcon} className="footer-icon" alt="instagram" />
        </a>
      </div>
      <VerticalDivider className="footer-divider" />
      <div className="email-phone">
        <p className="email large">info@waymakersoc.org</p>
        <p className="phone large">(949) 250-0488</p>
      </div>
    </div>
    <p className="footnote small">Created by Commit the Change @ UCI. 2021</p>
  </div>
);

export default Footer;
