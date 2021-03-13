import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {
  fetchEvents,
  fetchUserEvents,
} from '../../events/redux/actions';
import EventList from '../../events/event-list/eventList';
import store from '../../events/redux/store';
import { getEvents, getUserEvents } from '../../events/redux/selectors';
import './volunteerDashboard.css';
import CalendarPopup from '../../events/events-view/calendar-popup/calendarPopup';

const DashboardEventSection = (props) => {
  const { cookies } = props;

  useEffect(() => {
    (async () => {
      await store.dispatch(fetchEvents());
      await store.dispatch(fetchUserEvents(cookies.cookies.userId));
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
      <div className="key-section">
        <p className="key-text">Key</p>
        <div className="volunteer-event-square" />
        <p className="volunteer-event-text">Volunteer Event</p>
        <div className="outreach-event-square" />
        <p className="outreach-event-text">Outreach Event</p>
        <div className="other-event-square" />
        <p className="other-event-text">Other Event</p>
      </div>
    </div>
  );
};

DashboardEventSection.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(DashboardEventSection);
