/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import GoogleAuthService from '../../services/firebase/firebase';
import { WMKBackend } from '../../common/utils';

import registrationShowPassword from '../../assets/registrationShowPassword.svg';
import registrationHidePassword from '../../assets/registrationHidePassword.svg';
import googleLogo from '../../assets/googleLogo.svg';

import './login.css';

const useQuery = () => (
  new URLSearchParams(useLocation().search)
);

const useRedirectURL = () => {
  const query = useQuery();
  const redirectURL = query.get('redirect');
  if (!redirectURL) { return '/'; }
  return redirectURL;
};

const setAccessToken = (cookies, idToken) => {
  if (process.env.NODE_ENV === 'production') {
    cookies.set('accessToken', idToken, {
      path: '/',
      maxAge: 3600,
      domain: `${process.env.REACT_APP_COOKIE_DOMAIN}`,
      secure: true,
    });
  } else {
    cookies.set('accessToken', idToken, {
      path: '/',
      maxAge: 3600,
    });
  }
};

const LogIn = (props) => {
  const { cookies } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const history = useHistory();
  const redirectURL = useRedirectURL();

  async function login() {
    try {
      const res = await WMKBackend.get('/register/isVerified', {
        params: {
          email,
        },
      });
      console.log('@login:', res);
      if (!res.data) {
        throw new Error('User is not verified');
      }
      await GoogleAuthService.auth.signInWithEmailAndPassword(email, password);

      const user = await GoogleAuthService.auth.currentUser;
      const idToken = await user.getIdToken();

      // Setting a session cookie
      setAccessToken(cookies, idToken);

      // set profile picture
      const { data: { account } } = await WMKBackend.get(`/accounts/${user.uid}`);
      if (account.profile_picture) {
        localStorage.setItem('profilePicture', account.profile_picture);
      }

      // add full name to local storage
      localStorage.setItem('userFullName', `${account.firstname} ${account.lastname}`);

      // console.log(user.user.uid);
      history.push(redirectURL);
      // Signed in
    } catch (err) {
      setError(err.message);
      console.log(error);
    }
  }

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthService.firebase.auth.GoogleAuthProvider();
      await GoogleAuthService.auth.signInWithPopup(provider);

      const user = await GoogleAuthService.auth.currentUser;
      console.log(user);

      const userID = user.uid;
      const { data } = await WMKBackend.get(`/register/${userID}`);
      console.log(data);
      if (!data) {
        // first time creating account or not created account on our end yet;
        return history.push({
          pathname: '/register',
          state: {
            fromGoogle: true,
          },
        });
      }

      const idToken = await user.getIdToken();

      // Setting a session cookie
      setAccessToken(cookies, idToken);

      // set profile picture
      const { data: { account } } = await WMKBackend.get(`/accounts/${user.uid}`);

      if (account.profile_picture) {
        localStorage.setItem('profilePicture', account.profile_picture);
      }

      // add full name to local storage
      localStorage.setItem('userFullName', `${account.firstname} ${account.lastname}`);

      return history.push(redirectURL);
    } catch (err) {
      setError(err.message);
      return null;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      setError('');
      login();
    } catch (err) {
      setError('Failed to log in');
    }
  };

  const handleKeyPress = (event) => {
    // console.log(event);
    if (event.charCode === 13) {
      handleSubmit(event);
    }
  };

  return (
    <div className="login-container">
      <form className="login-forms">
        <label className="login-input-label" htmlFor="login-email">
          <p className="medium">Email</p>
          <input
            type="text"
            className="login-input"
            name="login-email"
            placeholder="Email"
            onChange={(event) => { setEmail(event.target.value); }}
          />
        </label>
        <label className="login-input-label login-password-input" htmlFor="login-password">
          <p className="medium">Password</p>
          <input
            type={showPassword ? 'text' : 'password'}
            className="login-input"
            name="login-password"
            placeholder="Password"
            onChange={(event) => { setPassword(event.target.value); }}
            onKeyPress={handleKeyPress}
          />
          <button
            type="button"
            className="login-password-showhide-button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword
              ? <img src={registrationHidePassword} alt="Hide" />
              : <img src={registrationShowPassword} alt="Show" />}
          </button>
        </label>
        <div className="sign-up">
          <p className="small">Don&apos;t have an account? </p>
          {' '}
          <Link to="/register">
            <p className="small" style={{ fontWeight: 700 }}>Sign up.</p>
          </Link>
        </div>
      </form>
      {error !== ''
        ? <span className="error-message">{error}</span>
        : <br />}
      <div className="login-buttons">
        <button type="submit" className="login-button" onClick={handleSubmit}>
          <p className="large">Login</p>
        </button>
        <button type="button" className="lwg-button" onClick={loginWithGoogle}>
          <img className="google-logo" src={googleLogo} alt=" " />
          <p className="medium">Login with Google</p>
        </button>
      </div>
    </div>
  );
};

LogIn.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(LogIn);
