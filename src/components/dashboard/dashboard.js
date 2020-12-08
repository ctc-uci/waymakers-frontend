import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, Button, Alert,
} from 'react-bootstrap';
import auth from '../firebase/firebase';
import EditEvents from '../events/edit-events/editEvents';

const Dashboard = () => {
  const history = useHistory();
  const [error, setError] = useState('');

  async function logout() {
    try {
      await auth.signOut();
      history.push('/login');
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
      </div>
    </div>
  );
};

export default Dashboard;
