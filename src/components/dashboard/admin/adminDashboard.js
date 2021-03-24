import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, Button, Alert,
} from 'react-bootstrap';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import EditEvents from '../../events/edit-events/editEvents';
import InventoryComponent from '../inventory-component/inventoryComponent';
import GoogleAuthService from '../../../services/firebase/firebase';
import './adminDashboard.css';

const axios = require('axios');

const AdminDashboard = (props) => {
  const { cookies } = props;
  const history = useHistory();
  const [error, setError] = useState('');
  // eslint-disable-next-line
  const [divisionList, setDivisionList] = useState([]);
  // eslint-disable-next-line
  const [currDivision, setCurrDivision] = useState(2);

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

  // Fetching warehouse names from the server
  const getDivisionList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/divisions`,
        { withCredentials: true },
      );
      setDivisionList(response.data);
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
    }
  };

  // Creating dropdown selector for warehouse menu
  const Menu = () => (
    <div className="division-section">
      <select
        name="division"
        className="division-dropdown"
        value={currDivision}
        onChange={(e) => { setCurrDivision(parseInt(e.target.value, 10)); }}
      >
        {Object.entries(divisionList)
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map(([id, division]) => (
            <option key={id} value={id}>{division.div_name}</option>
          ))}
      </select>
    </div>
  );

  // Get items on page load
  useEffect(() => {
    getDivisionList();
  }, []);

  return (
    <div>
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
        <div className="division-section">
          {/* <h2 className="division-selector-title">{currDivision}</h2> */}
          { Menu() }
        </div>
        <div className="admin-components-container">
          <div className="inventory-events-section">
            <div className="inventory-section">
              <h5 className="component-title">Inventory</h5>
              <InventoryComponent division={2} />
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
    </div>
  );
};

AdminDashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(AdminDashboard);
