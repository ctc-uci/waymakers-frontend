import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

// import "./events.css";
import PropTypes from 'prop-types';
import Event from '../event/event';
import './eventList.css';
import EventLegend from '../../dashboard/event-legend/eventLegend';

import { getUserEvents } from '../redux/selectors';
import store from '../redux/store';
import {
  setShowPopup,
  changePopupType,
  changeSelectedEvent,
} from '../redux/actions';

// events = Array of objects with event details
/*
{
  name: name
  date: date
  time: time
  location: location
}
*/
const EventList = ({
  events, title, listType, page, view,
}) => {
  // render Event components based on events prop

  const userEvents = useSelector(getUserEvents);
  const onDashboard = useLocation().pathname === '/';

  const openPopup = () => {
    store.dispatch(setShowPopup(true));
  };

  const setEventPopupType = (type) => {
    store.dispatch(changePopupType(type));
  };

  const setEvent = (selectedEvent) => {
    store.dispatch(changeSelectedEvent(selectedEvent));
  };

  const onAddButtonClick = (event) => {
    console.log(event);
    setEvent(event);
    setEventPopupType('ConfirmCancelPopup');
    openPopup();
  };

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

      let onEventButtonClick;
      if (eventType === 'more-events') {
        onEventButtonClick = (clickedEvent) => onAddButtonClick(clickedEvent);
      } else {
        // TODO: change this when we know what a checkmark is supposed to be
        onEventButtonClick = () => console.log('oh the check was clicked -kc');
      }

      if (page === 'addModifyDeleteEventsPage' || page === 'aggregatePage') {
        eventType = page;
        // onEventButtonClick = (clickedEvent) => onViewEventsPageBlockClick(clickedEvent);
      }
      // TODO: change colors/on event button click for other event pages
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

  const renderSeeMore = () => (
    <div className="events-see-more">
      <a className="see-more-link" href="/volunteer/events">see more</a>
    </div>
  );

  const renderEventLegend = () => {
    if (page === 'volunteerDashboard' && view === 'timeGridDay') {
      return (
        <EventLegend />
      );
    }
    return null;
  };

  return (
    <div className="event-list">
      {!onDashboard && renderEventLegend()}
      <h5 className="event-list-title">{ title }</h5>
      <div className="events-container">
        {renderEvents()}
        {onDashboard && renderSeeMore()}
      </div>
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(Object).isRequired,
  title: PropTypes.string,
  listType: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  view: PropTypes.string,
};

EventList.defaultProps = {
  title: '',
  view: '',
};

export default EventList;
