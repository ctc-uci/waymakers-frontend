/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { PropTypes, instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {
  Redirect, Route, useHistory, useLocation,
} from 'react-router-dom';

import {
  WMKBackend, refreshToken,
} from '../../common/utils';

const signInEndpoint = '/login';

// const getCookie = (key) => {
//   console.log(document.cookie);
//   const b = document.cookie.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`);
//   return b ? b.pop() : '';
// };

const verifyToken = async (cookies) => {
  let accessToken = cookies.get('accessToken');
  console.log(document.cookie);

  if (!accessToken) {
    console.log('UH OH! STINKY!');
    const token = await refreshToken();
    if (!token) {
      return false;
    }
    accessToken = cookies.get('accessToken');
  }

  if (accessToken) {
    try {
      const verifiedUserId = await WMKBackend.get(`/auth/verifyToken/${accessToken}`);
      if (verifiedUserId) {
        const userPermissions = await WMKBackend.get(`/accounts/${verifiedUserId.data}`);
        if (process.env.NODE_ENV === 'production') {
          cookies.set('userId', verifiedUserId.data, {
            path: '/',
            maxAge: 3600,
            domain: `${process.env.REACT_APP_COOKIE_DOMAIN}`,
            secure: true,
          });
          cookies.set('userPermissions', userPermissions.data.permissions.permissions, {
            path: '/',
            maxAge: 3600,
            domain: `${process.env.REACT_APP_COOKIE_DOMAIN}`,
            secure: true,
          });
        } else {
          cookies.set('userId', verifiedUserId.data, {
            path: '/',
            maxAge: 3600,
          });
          cookies.set('userPermissions', userPermissions.data.permissions.permissions, {
            path: '/',
            maxAge: 3600,
          });
        }
      }

      return verifiedUserId;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return false;
};

const ProtectedRoute = ({
  component, path, cookies, admin,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();

  const permission = cookies.get('userPermissions');

  useEffect(async () => {
    const verified = await verifyToken(cookies);
    setIsAuthenticated(verified);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <h1
        style={{
          margin: 'auto',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        LOADING...
      </h1>
    );
  }
  if (admin && permission !== 'Admin') {
    return <Redirect to={{ pathname: '/' }} />;
  }
  if (isAuthenticated) {
    return <Route exact path={path} component={component} />;
  }

  // TODO: I don't like manually building URIs, seems easily broken
  history.push(`${signInEndpoint}?redirect=${encodeURIComponent(location.pathname)}`);

  return false;
};

ProtectedRoute.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
  component: PropTypes.func.isRequired || PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
};

export default withCookies(ProtectedRoute);
