import React, { useState, useEffect } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
// import disableScroll from 'disable-scroll';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchEvents,
  fetchUserEvents,
} from '../../components/events/redux/actions';
import { getEvents, getUserEvents } from '../../components/events/redux/selectors';

import TitledCard from '../../common/Card/TitledCard';
import VolunteerAvailability from '../../components/dashboard/availability-component/volunteerAvailability/volunteerAvailability';
import CalendarPopup from '../../components/events/events-view/calendar-popup/calendarPopup';
import EventLegend from '../../components/dashboard/event-legend/eventLegend';
import EventList from '../../components/events/event-list/eventList';

import './volunteerDashboard.css';

const VolunteerDashboard = (props) => {
  const dispatch = useDispatch();
  const { cookies } = props;
  const [isLoading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    (async () => {
      await dispatch(fetchEvents());
      await dispatch(fetchUserEvents(cookies.cookies.userId));
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
    console.log(myEvents);
    myEvents = myEvents
      .filter((event) => new Date(event.startTime) >= new Date())
      .sort((e1, e2) => new Date(e1.startTime) - new Date(e2.startTime))
      .slice(0, 7);
    return <EventList events={myEvents} title="My Events" listType="my-events" page="dashboard" />;
  };

  return (
    <div className="volunteer-dashboard-page-container">
      <TitledCard title="My Stats">
        <div>fsdfsdfds</div>
      </TitledCard>
      <div className="events-section">
        <div className="event-lists">
          <CalendarPopup page="volunteerDashboard" />
          {renderMoreEventList()}
          {renderMyEventList()}
        </div>
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
