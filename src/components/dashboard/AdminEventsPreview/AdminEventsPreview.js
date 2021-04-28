import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { WMKBackend } from '../../../common/utils';
import useMobileWidth from '../../../common/useMobileWidth';

import './AdminEventsPreview.css';

const AdminEventsPreview = () => {
  const [events, setEvents] = useState([]);
  const isMobile = useMobileWidth(1100);
  const sliceNum = isMobile ? 2 : 3;

  async function getEvents() {
    try {
      let allEvents = await WMKBackend.get('/events');

      if (allEvents.status === 200) {
        allEvents = allEvents.data;
      }
      setEvents(allEvents.sort((a, b) => b.startTime - a.startTime).slice(0, sliceNum));
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
      <h4 className="upcoming-events-title">Upcoming Events</h4>
      <div className="upcoming-events-section">
        {events.map((item, index) => (
          renderEvent(item, index)
        ))}
      </div>
      <div className="all-events-section">
        <button type="button" className="all-events-button">
          <Link to="/events" className="button-anchor">
            <p className="large">Edit Events</p>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default AdminEventsPreview;
