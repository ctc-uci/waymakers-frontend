import React, { useState, useEffect } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  fetchEvents,
  fetchUserEvents,
} from '../../components/events/redux/actions';
import { getEvents, getUserEvents } from '../../components/events/redux/selectors';

import TitledCard from '../../common/Card/TitledCard';
import { WMKBackend } from '../../common/utils';
import VolunteerAvailability from '../../components/dashboard/availability-component/volunteerAvailability/volunteerAvailability';
import CalendarPopup from '../../components/events/events-view/calendar-popup/calendarPopup';
import EventLegend from '../../components/dashboard/event-legend/eventLegend';
import EventList from '../../components/events/event-list/eventList';

import './volunteerDashboard.css';

const VolunteerDashboard = (props) => {
  const { cookies } = props;
  const [isLoading, setLoading] = useState(false);
  const [numHours, setNumHours] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const getHours = async () => {
    try {
      const { data } = await WMKBackend.get('/logs/approved/sum', {
        params: {
          userId: cookies.get('userId'),
        },
      });
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  useEffect(async () => {
    setLoading(true);
    (async () => {
      await dispatch(fetchEvents());
      await dispatch(fetchUserEvents(cookies.cookies.userId));
      const hours = await getHours();
      await setNumHours(hours);
    })();
    setLoading(false);
  }, []);

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
    myEvents = myEvents
      .filter((event) => new Date(event.startTime) >= new Date())
      .sort((e1, e2) => new Date(e1.startTime) - new Date(e2.startTime))
      .slice(0, 7);
    return <EventList events={myEvents} title="My Events" listType="my-events" page="dashboard" />;
  };

  return (
    <div className="volunteer-dashboard-page-container">
      <TitledCard title="My Stats">
        <div className="my-stats-section">
          <div id="stats-display">
            <h3>
              {numHours.Volunteer || 0}
              &nbsp;
              Volunteer Hours
            </h3>
            <h3>
              {numHours.Outreach || 0}
              &nbsp;
              Outreach Hours
            </h3>
            <h3>
              {numHours.Other || 0}
              &nbsp;
              Other Hours
            </h3>
          </div>
          <button
            type="button"
            className="view-hours-button"
            onClick={() => history.push('/volunteer/hours')}
          >
            <p className="medium">View My Hours</p>
          </button>
        </div>
      </TitledCard>
      <CalendarPopup page="volunteerDashboard" />
      <div className="events-section">
        {renderMoreEventList()}
        {renderMyEventList()}
      </div>
      <div className="dashboard-event-legend">
        <EventLegend />
      </div>
      <div className="availability-section">
        <VolunteerAvailability />
      </div>
    </div>
  );
};

VolunteerDashboard.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(VolunteerDashboard);
