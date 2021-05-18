/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import CookieConsent from 'react-cookie-consent';

import './cookiesBanner.css';

const bannerText1 = `Waymakers uses cookies to improve your experience on 
                    our site and help us understand how our site is being 
                    used. Find out more and set your cookie preferences `;
const bannerText2 = '. By continuing to use our site you consent to use our cookies.';

const CookiesBanner = () => (
  <CookieConsent
    disableStyles
    buttonText="Accept"
    buttonClasses="cookies-banner-button"
    containerClasses="cookies-banner-container cookies-position"
    contentClasses="cookies-banner-content"
    expires={150}
  >
    <span className="cookies-banner-content-size">{bannerText1}</span>
    <a
      className="cookies-banner-content-size cookies-banner-link-word"
      href="https://www.consumer.ftc.gov/articles/0042-online-tracking"
      target="_blank"
    >
      here
    </a>
    <span className="cookies-banner-content-size">{bannerText2}</span>
  </CookieConsent>
);

export default CookiesBanner;
