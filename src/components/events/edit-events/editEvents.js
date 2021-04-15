import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { WMKBackend } from '../../../common/utils';

import './editEvents.css';
// import Event from '../event/event';
// import EditEventPopup from './editEventPopup';

const EditEvents = () => {
  const [events, setEvents] = useState([]);
  // const [editPopup, setEditPopup] = useState(false);
  // const [selectedEvent, setSelectedEvent] = useState(null);

  async function getEvents() {
    try {
      let allEvents = await WMKBackend.get('/events');

      if (allEvents.status === 200) {
        allEvents = allEvents.data;
      }
      setEvents(allEvents.sort((a, b) => b.startTime - a.startTime).slice(0, 3));
    } catch (e) {
      console.log('Error while getting events from the backend!');
    }
  }

  // Load events
  useEffect(() => {
    getEvents();
  }, []);

  const renderEvent = (event) => {
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);
    const date = new Intl.DateTimeFormat('en', { month: 'long', day: '2-digit' }).format(startDate);
    const startTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(startDate);
    const endTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(endDate);
    return (
      <div className="upcoming-event">
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

  // Passed into Event component for the Edit button => shows the popup
  // const onEditEventClick = (event) => {
  //   setSelectedEvent(event);
  //   setEditPopup(true);
  // };

  // const renderEvents = () => {
  //   const upcomingEvents = events.sort((a, b) => b.startTime - a.startTime).slice(0, 3);
  //   return upcomingEvents.map((event) => (
  //     <Event
  //       key={event.id}
  //       event={event}
  //       onEditEventClick={onEditEventClick}
  //     />
  //   ));
  // };

  // function renderEditPopup() {
  //   if (editPopup) {
  //     return (
  //       <EditEventPopup
  //         event={selectedEvent}
  //         onClose={() => {
  //           setEditPopup(false);
  //           getEvents();
  //         }}
  //       />
  //     );
  //   }
  //   return null;
  // }

  return (
    // <div className="editEventsContainer">
    //   <div id="middle-section" className="top-item-box">
    //     {renderEditPopup()}
    //     {renderEvents()}
    //     <Link to="/events">
    //       <button className="all-events" type="button">View All</button>
    //     </Link>
    //   </div>
    // </div>
    <div className="upcoming-events-component">
      <h4 className="upcoming-events-title">Upcoming Events</h4>
      <div className="upcoming-events-sectionn">
        {events.map((item) => (
          renderEvent(item)
        ))}
      </div>
      <div className="all-events-section">
        <Link to="/events">
          <button type="button" className="all-events-button">Edit Events</button>
        </Link>
      </div>
    </div>
  );
};

export default EditEvents;
