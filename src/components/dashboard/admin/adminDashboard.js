import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, Button, Alert,
} from 'react-bootstrap';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import EditEvents from '../../events/edit-events/editEvents';
import InventoryComponent from '../inventory-component/inventoryComponent';
import auth from '../../firebase/firebase';
import './adminDashboard.css';

import Header from '../../header/header';
import Footer from '../../footer/footer';

const AdminDashboard = (props) => {
  const { cookies } = props;
  const history = useHistory();
  const [error, setError] = useState('');
  // eslint-disable-next-line
  const [currDivision, setCurrDivision] = useState('Crisis Response Team');

  async function logout() {
    try {
      await auth.signOut();
      history.push('/login');
      // Removing session cookie
      cookies.remove('accessToken');
      cookies.remove('userId');
      // Sign-out successful
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <Header />

      <div className="d-flex align-items-center justify-content-center">
        <div className="w-100 login-container">
          <Card className="w-100">
            <Card.Body>
              <h2 className="text-center mb-4">Admin Dashboard</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Button onClick={logout} to="/login" className="w-100" type="submit" variant="primary">Log Out</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="admin-components">
        <div className="division-selector">
          <h2 className="division-selector-title">{currDivision}</h2>
        </div>
        <div className="admin-components-container">
          <div className="inventory-events-section">
            <div className="inventory-section">
              <h5 className="component-title">Inventory</h5>
              <InventoryComponent />
            </div>
            <div className="upcoming-events-section">
              <h5 className="component-title">Events</h5>
              <EditEvents />
            </div>
          </div>
          <div className="analytics-section">
            <h5 className="component-title">Analytics</h5>
            <div className="analytics-component" />
          </div>
        </div>
        <div className="availability-section">
          <h5 className="component-title">Volunteer On-Call Availability</h5>
          <div className="availability-component" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

AdminDashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(AdminDashboard);
