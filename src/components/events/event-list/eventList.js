import React from 'react';
// import "./events.css";
import PropTypes from 'prop-types';
import Event from '../event/event';
import './eventList.css';

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

  const renderEvents = () => events.map((event, index) => (
    <div className="event-div">
      <Event
        event={event}
        listType={listType}
        index={index}
        onEventButtonClick={onEventButtonClick}
      />
    </div>
  ));

  return (
    <div className="event-list">
      <h5 className="event-list-title">{ title }</h5>
      <div className="events-container">
        {renderEvents()}
        <div className="events-see-more">
          <a className="see-more-link" href="/events">see more</a>
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
