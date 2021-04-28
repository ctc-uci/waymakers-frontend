import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getUserEvents } from '../redux/selectors';
import {
  setShowPopup,
  changePopupType,
  changeSelectedEvent,
} from '../redux/actions';

import Event from '../event/event';
import EventLegend from '../../dashboard/event-legend/eventLegend';

import './eventList.css';

const EventList = ({
  events, title, listType, page, view,
}) => {
  const dispatch = useDispatch();
  const userEvents = useSelector(getUserEvents);

  const openPopup = () => { dispatch(setShowPopup(true)); };
  const setEventPopupType = (type) => { dispatch(changePopupType(type)); };
  const setEvent = (selectedEvent) => { dispatch(changeSelectedEvent(selectedEvent)); };

  const onAddButtonClick = (event) => {
    setEvent(event);
    setEventPopupType('ConfirmCancelPopup');
    openPopup();
  };

  const onCheckMarkClick = (event) => {
    setEvent(event);
    setEventPopupType('RemoveFromMyEventPopup');
    openPopup();
  };

  // Create list of Event Components for a specific type
  const createEventBlocks = (eventType, eventList) => {
    let finalEventType = eventType;
    return eventList.map((event, index) => {
      let onEventButtonClick;
      if (eventType === 'more-events') {
        onEventButtonClick = (clickedEvent) => onAddButtonClick(clickedEvent);
      } else {
        // TODO: change this when we know what a checkmark is supposed to be
        onEventButtonClick = (clickedEvent) => onCheckMarkClick(clickedEvent);
      }
      if (page === 'addModifyDeleteEventsPage' || page === 'aggregatePage') {
        finalEventType = page;
      }
      return (
        <div className="event-div" key={event.id}>
          <Event
            event={event}
            listType={finalEventType}
            index={index}
            onEventButtonClick={onEventButtonClick}
          />
        </div>
      );
    });
  };

  const renderEvents = () => {
    // Get more and my events from all events
    const userEventIds = userEvents.map((event) => event.id);
    const moreEvents = events.filter((event) => !userEventIds.includes(event.id));
    const myEvents = events.filter((event) => userEventIds.includes(event.id));

    if (page === 'addModifyDeleteEventsPage' || page === 'aggregatePage') {
      return createEventBlocks(page, events);
    }

    const moreEventComponents = createEventBlocks('more-events', moreEvents);
    const myEventComponents = createEventBlocks('my-events', myEvents);
    const allEvents = moreEventComponents.concat(myEventComponents);
    if (listType === 'my-events') {
      return myEventComponents;
    }
    if (listType === 'more-events') {
      return moreEventComponents;
    }
    return allEvents;
  };

  const renderSeeMore = () => (
    <div className="events-see-more">
      <Link to="/volunteer/events" className="see-more-link">
        <button
          type="button"
          className="see-more-button"
          href="/volunteer/events"
        >
          <p className="large">View Calendar</p>
        </button>
      </Link>
    </div>
  );

  return (
    <div className="event-list-component">
      <h4 className="event-list-title">{ title }</h4>
      <div className="event-list">
        {page === 'volunteerDashboard' && view === 'timeGridDay' && <EventLegend />}
        <div className="events-container">
          {renderEvents()}
        </div>
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
