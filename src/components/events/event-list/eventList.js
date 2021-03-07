import React from 'react';
import { useSelector } from 'react-redux';
// import "./events.css";
import PropTypes from 'prop-types';
import Event from '../event/event';
import './eventList.css';

import { getUserEvents } from '../redux/selectors';

// events = Array of objects with event details
/*
{
  name: name
  date: date
  time: time
  location: location
  description: description
}
*/
const EventList = ({
  events, title, listType, onEventButtonClick,
}) => {
  // render Event components based on events prop

  const userEvents = useSelector(getUserEvents);
  console.log(userEvents);
  console.log(events);
  const renderEvents = () => (
    events.map((event, index) => {
      let eventType = listType;
      // Check if a specific event is a user event or more event
      const eventId = event.id;
      if (listType === 'all') {
        userEvents.forEach((e) => {
          if (e.id === eventId) {
            eventType = 'my-events';
          }
        });
        if (eventType !== 'my-events') {
          eventType = 'more-events';
        }
      }
      return (
        <div className="event-div">
          <Event
            event={event}
            listType={eventType}
            index={index}
            onEventButtonClick={onEventButtonClick}
          />
        </div>
      );
    }));

  return (
    <div className="event-list">
      <h5 className="event-list-title">{ title }</h5>
      <div className="events-container">
        {renderEvents()}
        <div className="events-see-more">
          <a className="see-more-link" href="/volunteer/events">see more</a>
        </div>
      </div>
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(Object).isRequired,
  title: PropTypes.string,
  listType: PropTypes.string.isRequired,
  onEventButtonClick: PropTypes.func.isRequired,
};

EventList.defaultProps = {
  title: '',
};

export default EventList;
