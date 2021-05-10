import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Helmet } from 'react-helmet';
import Particles from 'react-particles-js';

import Register from '../../components/register/register';
import RegisterFromGoogle from '../../components/register/registerFromGoogle/registerFromGoogle';

import './registerPage.css';

const RegisterPage = (props) => {
  const { cookies } = props;
  let fromGoogle;
  if (props.location.state) {
    fromGoogle = props.location.state.fromGoogle;
  }

  let subtitle;
  if (fromGoogle) {
    subtitle = 'Continue with your Registration to get Started!';
  } else {
    subtitle = 'Sign Up to get Started!';
  }

  return (
    <div className="register-page">
      <Helmet>
        <title>Waymakers | Register</title>
      </Helmet>
      <h1 className="title">Waymakers Southern California</h1>
      <h2 className="subtitle">{subtitle}</h2>
      {fromGoogle
        ? <RegisterFromGoogle props={cookies} />
        : <Register props={cookies} />}
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

RegisterPage.defaultProps = {
  location: {
    state: {
      fromGoogle: false,
    },
  },
};

RegisterPage.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      fromGoogle: PropTypes.bool,
    }),
  }),
};

export default withCookies(RegisterPage);
