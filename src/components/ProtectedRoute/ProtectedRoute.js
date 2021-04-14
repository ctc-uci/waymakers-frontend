import React, { useState, useEffect } from 'react';
import { PropTypes, instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Route, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

const signInEndpoint = '/login';

const verifyToken = async (cookies) => {
  const accessToken = cookies.get('accessToken');
  if (accessToken != null) {
    try {
      const url = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/auth/verifyToken/${accessToken}`;

      const isVerified = await axios.get(url);

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
