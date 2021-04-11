import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, Button, Alert,
} from 'react-bootstrap';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import disableScroll from 'disable-scroll';
import GoogleAuthService from '../../services/firebase/firebase';
import VolunteerAvailability from '../../components/dashboard/availability-component/volunteerAvailability/volunteerAvailability';
import HelpPopup from '../../components/dashboard/availability-component/help-popup/helpPopup';
import DashboardEventSection from '../../components/dashboard/volunteer/dashboardEventSection';

import './volunteerDashboard.css';

const VolunteerDashboard = (props) => {
  const { cookies } = props;
  const history = useHistory();
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [helpPopupSeen, setHelpPopupSeen] = useState(false);

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

  useEffect(async () => {
    setLoading(true);
    // await getEvents();
    setLoading(false);
  }, []);

  const onHelpButtonClick = () => {
    if (helpPopupSeen) {
      disableScroll.off();
    } else {
      disableScroll.on();
    }
    setHelpPopupSeen(!helpPopupSeen);
  };

  if (isLoading) {
    return (<div>Loading dashboard...</div>);
  }

  return (
    <div className="volunteer-dashboard-page-container">
      <div className="d-flex align-items-center justify-content-center">
        <div className="w-100 login-container">
          <Card className="w-100">
            <Card.Body>
              <h2 className="text-center mb-4">Volunteer Dashboard</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Button onClick={logout} to="/login" className="w-100" type="submit" variant="primary">Log Out</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="my-stats-section">
        <h5 className="my-stats-title">My Stats</h5>
        <div className="filler" />
      </div>
      <DashboardEventSection />
      <div className="availability-third">
        <VolunteerAvailability />
        {helpPopupSeen && <HelpPopup onHelpButtonClick={onHelpButtonClick} />}
      </div>
    </div>
  );
};

VolunteerDashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(VolunteerDashboard);
