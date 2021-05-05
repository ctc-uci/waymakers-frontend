import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Helmet } from 'react-helmet';
import Particles from 'react-particles-js';

import LogIn from '../../components/login/login';

import './loginPage.css';

const LoginPage = (props) => {
  const { cookies } = props;

  return (
    <div className="login-page">
      <Helmet>
        <title>Waymakers | Login</title>
      </Helmet>
      <h1 className="title">Waymakers Southern California</h1>
      <h2 className="subtitle">Login</h2>
      <LogIn props={cookies} />
      <Particles
        className="particles"
        params={{
          particles: {
            number: {
              value: 150,
              density: {
                enable: true,
                value_area: 4000,
              },
            },
            size: {
              value: 9,
              random: true,
            },
            line_linked: {
              enable: false,
            },
            move: {
              speed: 0.27,
            },
          },
        }}
      />
    </div>
  );
};

LoginPage.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(LoginPage);
