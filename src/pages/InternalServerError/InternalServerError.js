/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Error500Graphic1 from '../../assets/error500graphic1.svg';
import Error500Graphic2 from '../../assets/error500graphic2.png';

import './InternalServerError.css';

const InternalServerError = () => {
  const history = useHistory();
  const [graphic, setGraphic] = useState(null);

  useEffect(() => {
    if (Math.floor(Math.random() * 2) === 0) {
      setGraphic(Error500Graphic1);
    } else {
      setGraphic(Error500Graphic2);
    }
  }, []);

  return (
    <div className="error-500-page">
      <Helmet>
        <title>Waymakers | Internal Server Error</title>
      </Helmet>
      <img src={graphic} className="graphic-500" alt="500 Internal Server Error" />
      <h1>Oops! Something&apos;s wrong.</h1>
      <h3>
        Sorry this isn&apos;t working. We are working to fix the problem!
        Try going back to the home page or checking again later.
      </h3>
      <button
        type="button"
        className="go-home-button"
        onClick={() => {
          history.push('/');
        }}
      >
        <p className="large">Go Home</p>
      </button>
    </div>
  );
};

export default InternalServerError;
