import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import GoogleAuthService from '../../services/firebase/firebase';

import registrationShowPassword from '../../assets/registrationShowPassword.svg';
import registrationHidePassword from '../../assets/registrationHidePassword.svg';
import googleLogo from '../../assets/googleLogo.svg';

import './login.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function useRedirectURL() {
  const query = useQuery();
  const redirectURL = query.get('redirect');
  if (!redirectURL) { return '/'; }
  return redirectURL;
}

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
      await GoogleAuthService.auth.signInWithEmailAndPassword(email, password);

      const idToken = await GoogleAuthService.auth.currentUser.getIdToken();
      // console.log(`idToken: ${idToken}`);

      // Setting a session cookie
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
      await GoogleAuthService.auth.signInWithRedirect(provider);
      const result = await GoogleAuthService.firebase.getRedirectResult();
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = result.credential.accessToken;
      }
      // The signed-in user info.
      // const { user } = result;
      // console.log(user);
      history.push(redirectURL);
    } catch (err) {
      setError(err.message);
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
