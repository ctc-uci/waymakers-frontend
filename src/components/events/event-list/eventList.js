import React from 'react';
// import "./events.css";
import PropTypes from 'prop-types';
import Event from '../event/event';

// events = Array of objects with event details
/*
{
  name: name
  date: date
  time: time
  location: location
  description: descrip
}
*/
const EventList = ({ events, title }) => {
  // render Event components based on events prop
  const renderEvents = () => events.map((event) => <Event event={event} />);

  return (
    <div className="eventList">
      <h1>{title}</h1>
      {renderEvents()}
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(Object).isRequired,
  title: PropTypes.string,
};

EventList.defaultProps = {
  title: '',
};

export default EventList;
