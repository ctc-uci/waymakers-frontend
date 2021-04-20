import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Particles from 'react-particles-js';

import Register from '../../components/register/register';

import './registerPage.css';

const RegisterPage = (props) => {
  const { cookies } = props;

  return (
    <div className="register-page">
      <h1 className="title">Waymakers Southern California</h1>
      <h2 className="subtitle">Sign Up to get Started!</h2>
      <Register props={cookies} />
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

RegisterPage.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(RegisterPage);
