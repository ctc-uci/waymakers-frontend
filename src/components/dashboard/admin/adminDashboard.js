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

const AdminDashboard = (props) => {
  const { cookies } = props;
  const history = useHistory();
  const [error, setError] = useState('');
  //   const [currDivision, setCurrDivision] = useState('human');

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
      <div>
        <EditEvents />
        <InventoryComponent />
      </div>
    </div>
  );
};

AdminDashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(AdminDashboard);
