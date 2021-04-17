import React, { useState, useEffect } from 'react';
import { PropTypes, instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Route, useHistory, useLocation } from 'react-router-dom';

import { WMKBackend } from '../../common/utils';

const signInEndpoint = '/login';

const verifyToken = async (cookies) => {
  const accessToken = cookies.get('accessToken');
  console.log(cookies);
  if (accessToken != null) {
    try {
      const isVerified = await WMKBackend.get(`/auth/verifyToken/${accessToken}`);

      if (isVerified) {
        cookies.set('userId', isVerified.data, {
          path: '/',
          maxAge: 3600,
        });
      }

      return isVerified;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return false;
};

const ProtectedRoute = ({ component, path, cookies }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const verified = await verifyToken(cookies);
      setIsAuthenticated(verified);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <h1 style={{ textAlign: 'center' }}>LOADING...</h1>;
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
