import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {
  fetchEvents,
  fetchUserEvents,
} from '../../events/redux/actions';
import EventList from '../../events/event-list/eventList';
import { getEvents, getUserEvents } from '../../events/redux/selectors';
import './volunteerDashboard.css';
import CalendarPopup from '../../events/events-view/calendar-popup/calendarPopup';
import EventLegend from '../event-legend/eventLegend';

const DashboardEventSection = (props) => {
  const dispatch = useDispatch();
  const { cookies } = props;

  useEffect(() => {
    (async () => {
      await dispatch(fetchEvents());
      await dispatch(fetchUserEvents(cookies.cookies.userId));
    })();
  }, []);

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
    <div>
      <div className="events-section">
        <CalendarPopup page="volunteerDashboard" />
        <div className="event-list-component">
          {renderMoreEventList()}
        </div>
        <div className="event-list-component">
          {renderMyEventList()}
        </div>
      </div>
      <div className="dashboard-event-legend">
        <EventLegend />
      </div>
    </div>
  );
};

DashboardEventSection.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(DashboardEventSection);
