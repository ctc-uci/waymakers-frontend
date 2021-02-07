import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, Button, Alert,
} from 'react-bootstrap';
import axios from 'axios';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import auth from '../../firebase/firebase';
import EventList from '../../events/event-list/eventList';
import './volunteerDashboard.css';

const VolunteerDashboard = (props) => {
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
    withCredentials: true,
  });

  const { cookies } = props;
  const [events, setEvents] = useState([]);
  const history = useHistory();
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
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

  async function getEvents() {
    try {
      console.log('getting events');
      let allEvents = await instance.get('events');

      if (allEvents.status === 200) {
        allEvents = allEvents.data;
      }
      setEvents(allEvents);
    } catch (e) {
      // eslint-disable-next-line
      console.log('Error while getting events from the backend!');
    }
  }

  useEffect(async () => {
    setLoading(true);
    getEvents();
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
      <div className="events-section">
        <div className="event-list-component">
          <EventList events={events.slice(0, 3)} title="More Events" listType="more-events" />
        </div>
        <div className="event-list-component">
          <EventList events={events.slice(0, 3)} title="My Events" listType="my-events" />
        </div>
      </div>
    </div>
  );
};

VolunteerDashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(VolunteerDashboard);
