import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { WMKBackend } from '../../../common/utils';

import useMobileWidth from '../../../common/useMobileWidth';

import './AdminEventsPreview.css';

const AdminEventsPreview = () => {
  const [events, setEvents] = useState([]);
  const isMobile = useMobileWidth(1100);
  const sliceNum = isMobile ? 2 : 3;
  const history = useHistory();

  async function getEvents() {
    try {
      let allEvents = await WMKBackend.get('/events');

      if (allEvents.status === 200) {
        allEvents = allEvents.data;
      }
      const sortedEvents = allEvents.sort((a, b) => b.startTime - a.startTime);
      const upcomingEvents = sortedEvents.filter((event) => new Date(event.startTime) > new Date());
      setEvents(upcomingEvents.slice(0, sliceNum));
    } catch (e) {
      console.log('Error while getting events from the backend!');
    }
  }

  // Load events
  useEffect(() => {
    getEvents();
  }, [isMobile]);

  const renderEvent = (event, key) => {
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);
    const date = new Intl.DateTimeFormat('en', { month: 'long', day: '2-digit' }).format(startDate);
    const startTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(startDate);
    const endTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(endDate);
    return (
      <div className="upcoming-event" key={key}>
        <p className="upcoming-event-name">
          {event.title}
        </p>
        <div className="upcoming-event-date">
          <p>{date}</p>
        </div>
        <div className="upcoming-event-time">
          <p>{`${startTime} - ${endTime}`}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="upcoming-events-component">
      <h3 className="upcoming-events-title">Upcoming Events</h3>
      <div className="upcoming-events-section">
        {events.map((item, index) => (
          renderEvent(item, index)
        ))}
      </div>
      <div className="all-events-section">
        <button type="button" className="all-events-button button-anchor" onClick={() => history.push('/events')}>
          <p className="large">Edit Events</p>
        </button>
      </div>
    </div>
  );
};

export default AdminEventsPreview;
