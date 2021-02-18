import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card, Button, Alert,
} from 'react-bootstrap';
import {
  startOfWeek, add, getHours, getDay,
} from 'date-fns';
import axios from 'axios';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import auth from '../../firebase/firebase';
import EventList from '../../events/event-list/eventList';
import './volunteerDashboard.css';
import ViewAvailability from '../availability-component/viewAvailability/ViewAvailability';
import EditAvailability from '../availability-component/editAvailability/EditAvailability';

const VolunteerDashboard = (props) => {
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
    withCredentials: true,
  });

  const { cookies } = props;
  const [moreEvents, setMoreEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [availabilityMode, setAvailabilityMode] = useState('view');
  const history = useHistory();
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const startWeek = startOfWeek(new Date());
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
        allEvents = allEvents.data.slice(0, 3);
        console.log(allEvents);
      }
      setMoreEvents(allEvents);
      setMyEvents([...allEvents]);
    } catch (e) {
      // eslint-disable-next-line
      console.log('Error while getting events from the backend!');
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

      const availabilityResult = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/availability/${userID}`, {
          withCredentials: true,
        },
      );

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

    await axios.post(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/availability/${userID}`, {
        dates: filteredDates,
      }, {
        withCredentials: true,
      },
    );

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
            <div
              className="editButton"
              onClick={() => { setAvailabilityMode('edit'); }}
              onKeyDown={() => { setAvailabilityMode('edit'); }}
              role="button"
              tabIndex={0}
            >
              Change Availability
            </div>
            <p className="mode">View Mode</p>
            <ViewAvailability availabilities={availability} startWeek={startWeek} />
          </div>
        )
          : (
            <div className="availability-wrapper">
              <h5 className="availability-title">Availability for the Week</h5>
              <div
                className="saveButton"
                onClick={updateAvailability}
                onKeyDown={updateAvailability}
                role="button"
                tabIndex={0}
              >
                Save Changes
              </div>
              <p className="mode">Edit Mode</p>
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
    getEvents();
    getAvailability();
    setLoading(false);
  }, []);

  const onEventButtonClick = (eventType, index) => {
    // If user clicks on event from More Events section to add to My Events section
    if (eventType === 'more-events') {
      // Pop element from moreEvents array and update its state
      const tempMoreEventsArr = [...moreEvents];
      const [poppedEvent] = tempMoreEventsArr.splice(index, 1);
      setMoreEvents(tempMoreEventsArr);

      // Push element that was popped from moreEvents array to myEvents array and update its state
      const tempMyEventsArr = [...myEvents];
      tempMyEventsArr.push(poppedEvent);
      setMyEvents(tempMyEventsArr);
    } else {
      // Pop element from myEvents array and update its state
      const tempMyEventsArr = [...myEvents];
      const [poppedEvent] = tempMyEventsArr.splice(index, 1);
      setMyEvents(tempMyEventsArr);

      // Push element that was popped from myEvents array to moreEvents array and update its state
      const tempMoreEventsArr = [...moreEvents];
      tempMoreEventsArr.push(poppedEvent);
      setMoreEvents(tempMoreEventsArr);
    }
  };

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
          <EventList events={moreEvents} title="More Events" listType="more-events" onEventButtonClick={onEventButtonClick} />
        </div>
        <div className="event-list-component">
          <EventList events={myEvents} title="My Events" listType="my-events" onEventButtonClick={onEventButtonClick} />
        </div>
      </div>
      <div className="key-section">
        <p className="key-text">Key</p>
        <div className="volunteer-event-square" />
        <p className="volunteer-event-text">Volunteer Event</p>
        <div className="outreach-event-square" />
        <p className="outreach-event-text">Outreach Event</p>
        <div className="other-event-square" />
        <p className="other-event-text">Other Event</p>
      </div>
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
