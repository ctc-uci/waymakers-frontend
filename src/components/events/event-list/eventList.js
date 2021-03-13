import React from 'react';
import { useSelector } from 'react-redux';

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

const EventList = ({
  events, title, listType, page, view,
}) => {
  const userEvents = useSelector(getUserEvents);

  const openPopup = () => { store.dispatch(setShowPopup(true)); };
  const setEventPopupType = (type) => { store.dispatch(changePopupType(type)); };
  const setEvent = (selectedEvent) => { store.dispatch(changeSelectedEvent(selectedEvent)); };

  const onAddButtonClick = (event) => {
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
        eventType = (eventType !== 'my-events') ? 'more-events' : eventType;
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
      }

      return (
        <div className="event-div" key={event.id}>
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

  return (
    <div className="event-list">
      {page === 'volunteerDashboard' && view === 'timeGridDay' && <EventLegend />}
      <h5 className="event-list-title">{ title }</h5>
      <div className="events-container">
        {renderEvents()}
        {page === 'dashboard' && renderSeeMore()}
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
