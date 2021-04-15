import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, Button, Alert,
} from 'react-bootstrap';
import {
  startOfWeek, add, getHours, getDay,
} from 'date-fns';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import { WMKBackend } from '../../../common/utils';

import GoogleAuthService from '../../../services/firebase/firebase';
import './volunteerDashboard.css';
import ViewAvailability from '../availability-component/viewAvailability/viewAvailability';
import EditAvailability from '../availability-component/editAvailability/editAvailability';
import DashboardEventSection from './dashboardEventSection';

const VolunteerDashboard = (props) => {
  const { cookies } = props;
  const [availability, setAvailability] = useState([]);
  const [availabilityMode, setAvailabilityMode] = useState('view');
  const history = useHistory();
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const startWeek = startOfWeek(new Date());
  //   const [currDivision, setCurrDivision] = useState('human');

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

  const stringToDate = (dateString) => {
    const {
      dayofweek, starttime,
    } = dateString;

    const splitTime = String(starttime).split(':');
    const date = add(startWeek, {
      years: 0,
      months: 0,
      weeks: 0,
      days: dayofweek,
      hours: splitTime[0],
      minutes: 0,
      seconds: 0,
    });

    return date;
  };

  const parseDate = (date) => {
    const hours = getHours(date);
    return [getDay(date), `${hours}:00:00`];
  };

  async function getAvailability() {
    try {
      console.log('getting availability');
      const userID = cookies.get('userId');

      const availabilityResult = await WMKBackend.get(`/availability/${userID}`);

      const { userAvailability } = availabilityResult.data;
      const dateList = userAvailability.map((dateString) => (stringToDate(dateString)));

      setAvailability(dateList);
    } catch (e) {
      // eslint-disable-next-line
      console.log('Error while getting availability from the backend!');
    }
  }

  async function updateAvailability() {
    const dateList = availability.map((date) => (parseDate(date)));
    console.log('about to post dateList to POST route');
    const seen = new Set();

    const filteredDates = dateList.filter((date) => {
      const duplicate = seen.has(date.toString());
      seen.add(date.toString());
      return !duplicate;
    });

    const userID = cookies.get('userId');

    console.log('dateList to POST:', filteredDates);

    console.log('POST route called');

    await WMKBackend.post(`/availability/${userID}`, {
      dates: filteredDates,
    });

    console.log('post complete');

    setAvailabilityMode('view');
  }

  function renderAvailability() {
    // console.log(availabilityViewMode);
    console.log(`rendering availability in ${availabilityMode} mode`);
    console.log('availability:', availability);
    return (
      <div>
        {availabilityMode === 'view' ? (
          <div className="availability-wrapper">
            <h5 className="availability-title">Availability for the Week</h5>
            <div className="availability-buttons-container">
              <div
                className="edit-button"
                onClick={() => { setAvailabilityMode('edit'); }}
                onKeyDown={() => { setAvailabilityMode('edit'); }}
                role="button"
                tabIndex={0}
              >
                Change Availability
              </div>
              <div className="help-popup">?</div>
            </div>
            <ViewAvailability availabilities={availability} startWeek={startWeek} />
          </div>
        )
          : (
            <div className="availability-wrapper">
              <h5 className="availability-title">Availability for the Week</h5>
              <div
                className="save-button"
                onClick={updateAvailability}
                onKeyDown={updateAvailability}
                role="button"
                tabIndex={0}
              >
                Save Changes
              </div>
              <EditAvailability
                availabilityTimes={availability}
                setAvailabilityTimes={setAvailability}
                startWeek={startWeek}
              />
            </div>
          )}
      </div>
    );
  }

  useEffect(async () => {
    setLoading(true);
    getAvailability();
    setLoading(false);
  }, []);

  if (isLoading) {
    return (<div>Loading dashboard...</div>);
  }

  return (
    <div>
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
      <div className="availability-section">
        {renderAvailability()}
      </div>
    </div>
  );
};

VolunteerDashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(VolunteerDashboard);
