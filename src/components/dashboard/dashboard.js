import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, Button, Alert,
} from 'react-bootstrap';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import GoogleAuthService from '../../services/firebase/firebase';
import AdminDashboard from '../../pages/admin-dashboard/adminDashboard';
import VolunteerDashboard from '../../pages/volunteer-dashboard/volunteerDashboard';

const axios = require('axios');

const Dashboard = (props) => {
  const { cookies } = props;
  const history = useHistory();
  const [error, setError] = useState('');
  const [userPermission, setUserPermission] = useState('');

  async function logout() {
    try {
      await GoogleAuthService.auth.signOut();
      history.push('/login');
      // Removing session cookie
      cookies.remove('accessToken');
      cookies.remove('userId');
      // Sign-out successful
    } catch (err) {
      setError(err.message);
    }
  }

  // Get users permission level
  const getPermissions = async () => {
    // Getting user ID from cookies
    const userID = cookies.get('userId');
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/accounts/${userID}`,
        { withCredentials: true },
      );
      setUserPermission(response.data);
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
    }
  };

  // Get users permissions on page load
  useEffect(() => {
    getPermissions();
  }, []);

  const renderDashboard = () => {
    if (!userPermission.permissions) {
      return <h3>Error - No Permissions</h3>;
    }
    switch (userPermission.permissions.permissions) {
      case 'Admin': return <AdminDashboard />;
      case 'Volunteer': return <VolunteerDashboard />;
      default: return <h3>Error - No Permissions</h3>;
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="w-100 login-container">
          <Card className="w-100">
            <Card.Body>
              <h2 className="text-center mb-4">Dashboard</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Button onClick={logout} to="/login" className="w-100" type="submit" variant="primary">Log Out</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
      {renderDashboard()}
    </div>
  );
};

Dashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Dashboard);
