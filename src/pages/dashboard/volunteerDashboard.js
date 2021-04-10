import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import disableScroll from 'disable-scroll';
import {
  Card, Button, Alert,
} from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchEvents,
  fetchUserEvents,
} from '../../components/events/redux/actions';
import { getEvents, getUserEvents } from '../../components/events/redux/selectors';

import TitledCard from '../../common/Card/TitledCard';
import VolunteerAvailability from '../../components/dashboard/availability-component/volunteerAvailability/volunteerAvailability';
import HelpPopup from '../../components/dashboard/availability-component/help-popup/helpPopup';
import CalendarPopup from '../../components/events/events-view/calendar-popup/calendarPopup';
import EventLegend from '../../components/dashboard/event-legend/eventLegend';
import EventList from '../../components/events/event-list/eventList';
import GoogleAuthService from '../../services/firebase/firebase';

import './volunteerDashboard.css';

const VolunteerDashboard = (props) => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    (async () => {
      await dispatch(fetchEvents());
      await dispatch(fetchUserEvents(cookies.cookies.userId));
    })();
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

  const renderMoreEventList = () => {
    // Filter events
    const allEvents = useSelector(getEvents);
    const myEvents = useSelector(getUserEvents);
    const myEventsIds = myEvents.map((event) => event.id);
    const moreEvents = allEvents
      .filter((event) => (!myEventsIds.includes(event.id)))
      .filter((event) => new Date(event.startTime) >= new Date())
      .sort((e1, e2) => new Date(e1.startTime) - new Date(e2.startTime))
      .slice(0, 7);

    return <EventList events={moreEvents} title="More Events" listType="more-events" page="dashboard" />;
  };

  const renderMyEventList = () => {
    let myEvents = useSelector(getUserEvents);
    console.log(myEvents);
    myEvents = myEvents
      .filter((event) => new Date(event.startTime) >= new Date())
      .sort((e1, e2) => new Date(e1.startTime) - new Date(e2.startTime))
      .slice(0, 7);
    return <EventList events={myEvents} title="My Events" listType="my-events" page="dashboard" />;
  };

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
      {/* <div className="my-stats-section"> */}
      {/* <h5 className="my-stats-title">My Stats</h5>
      <div className="filler" /> */}
      <TitledCard title="My Stats">
        <div>fsdfsdfds</div>
      </TitledCard>
      {/* </div> */}
      <div className="events-section">
        <div className="event-lists">
          <CalendarPopup page="volunteerDashboard" />
          <div className="event-list-component">
            {renderMoreEventList()}
          </div>
          <div className="event-list-component">
            {renderMyEventList()}
          </div>
        </div>
      </div>
      <div className="dashboard-event-legend">
        <EventLegend />
      </div>
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
