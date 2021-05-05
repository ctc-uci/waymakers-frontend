import React from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Graphic404 from '../../assets/404graphic.png';

import './NotFound404.css';

const NotFound404 = () => {
  const history = useHistory();

  return (
    <div className="error-404-page">
      <Helmet>
        <title>Waymakers | 404 Page Not Found</title>
      </Helmet>
      <img src={Graphic404} className="graphic-404" alt="404 Page Not Found" />
      <h1>Oops! Looks like you&apos;re lost.</h1>
      <h3>We can&apos;t find the page you&apos;re looking for...</h3>
      <button
        type="button"
        className="go-home-button"
        onClick={() => history.push('/')}
      >
        <p className="large">Go Home</p>
      </button>
    </div>
  );
};

export default NotFound404;
