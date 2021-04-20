import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, Button, Alert,
} from 'react-bootstrap';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import AdminEventsPreview from '../../components/dashboard/AdminEventsPreview/AdminEventsPreview';
import AdminInventoryPreview from '../../components/dashboard/AdminInventoryPreview/AdminInventoryPreview';
import { WMKBackend } from '../../common/utils';

import AdminAvailability from '../../components/dashboard/availability-component/adminAvailability/adminAvailability';
import GoogleAuthService from '../../services/firebase/firebase';

import TitledCard from '../../common/Card/TitledCard';

import './adminDashboard.css';

const AdminDashboard = (props) => {
  const { cookies } = props;
  const history = useHistory();
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [divisionList, setDivisionList] = useState([]);
  const [currDivision, setCurrDivision] = useState(1);

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
      const response = await WMKBackend.get('/divisions');
      setDivisionList(response.data);
    } catch (err) {
      // eslint-disable-next-line
      console.error(err);
    }
  };

  useEffect(async () => {
    setLoading(true);
    getDivisionList();
    setLoading(false);
  }, []);

  // Creating dropdown selector for division menu
  const Menu = () => (
    <div className="division-section">
      <select
        name="division"
        className="division-dropdown"
        value={currDivision - 1}
        onChange={(e) => {
          setCurrDivision(parseInt(e.target.value, 10) + 1);
        }}
      >
        {Object.entries(divisionList)
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map(([id, division]) => (
            <option key={id} value={id}>{division.div_name}</option>
          ))}
      </select>
    </div>
  );

  if (isLoading) {
    return (<div>Loading dashboard...</div>);
  }

  return (
    <>
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
          { Menu() }
        </div>
        <div className="admin-components-container">
          <div className="inventory-events-section">
            <div className="inventory-section">
              <TitledCard title="Inventory">
                <AdminInventoryPreview division={currDivision} />
              </TitledCard>
            </div>
            <div className="upcoming-events-container">
              <TitledCard title="Events">
                <AdminEventsPreview />
              </TitledCard>
            </div>
          </div>
          <div className="analytics-section">
            <TitledCard title="Analytics">
              <div className="analytics-component" />
            </TitledCard>
          </div>
        </div>
        <div className="availability-section">
          <AdminAvailability />
        </div>
      </div>
    </>
  );
};

AdminDashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(AdminDashboard);
