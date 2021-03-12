import React from 'react';
import PropTypes from 'prop-types';
import './event.css';
import store from '../redux/store';
import {
  setShowPopup,
  changePopupType,
  changeSelectedEvent,
} from '../redux/actions';

const Event = ({
  event, listType, index, onEventButtonClick,
}) => {
  // Date formatting
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(startDate);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(startDate);
  const startTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(startDate);
  const endTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(endDate);
  const eventType = `${event.eventType.toLowerCase()}-event`;

  const renderButton = () => {
    const onButtonClick = (e) => {
      e.stopPropagation();
      onEventButtonClick(event);
    };
    if (listType === 'my-events' || listType === 'all' || listType === 'more-events') {
      return (
        <div
          className="event-button"
          onClick={onButtonClick}
          onKeyDown={onButtonClick}
          role="button"
          tabIndex={index}
        >
          <p className="event-button-symbol">{listType === 'more-events' ? '+' : '✓'}</p>
        </div>
      );
    }
    return null;
  };

  const openPopup = () => {
    store.dispatch(setShowPopup(true));
  };

  const setEventPopupType = (type) => {
    store.dispatch(changePopupType(type));
  };

  const setEvent = (selectedEvent) => {
    store.dispatch(changeSelectedEvent(selectedEvent));
  };

  // Event Block Click Handlers

  // Admin Add/Modify/View Event Calendar
  const onViewEventsPageBlockClick = (clickedEvent) => {
    setEvent(clickedEvent);
    setEventPopupType('ViewEventInfoPopup');
    openPopup();
  };

  const onAdminEventBlockClick = (clickedEvent) => {
    setEvent(clickedEvent);
    openPopup();
  };

  const isPast = (firstDate, secondDate) => (
    firstDate.setHours(0, 0, 0, 0) - secondDate.setHours(0, 0, 0, 0) < 0
  );

  const onVolunteerEventBlockClick = (clickedEvent) => {
    setEvent(clickedEvent);
    if (listType === 'my-events') {
      if (isPast(new Date(clickedEvent.startTime), new Date())) {
        setEventPopupType('AddMyHoursPopup');
      } else {
        setEventPopupType('RemoveFromMyEventPopup');
      }
    } else {
      setEventPopupType('AddEventPopup');
    }
    openPopup();
  };

  const renderEventBlockPopup = () => {
    switch (listType) {
      case 'my-events':
        onVolunteerEventBlockClick(event);
        break;
      case 'more-events':
        onVolunteerEventBlockClick(event);
        break;
      case 'addModifyDeleteEventsPage':
        onViewEventsPageBlockClick(event);
        break;
      case 'aggregatePage':
        onAdminEventBlockClick(event);
        break;
      default: console.log('oops');
    }
  };

  return (
    <div className="event-list-container" tabIndex={0} onClick={renderEventBlockPopup} onKeyDown={() => {}} role="button">
      <div className={`event-container ${listType}`}>
        {renderButton()}
        <div className="event-date-section">
          <h3 className="event-day">{day}</h3>
          <p className="event-month">{month}</p>
        </div>
        <div className="event-info-section">
          <h3 className="event-title">{event.title}</h3>
          <p className="event-time">{`${startTime} - ${endTime}`}</p>
        </div>
      </div>
      { (listType === 'all' || listType === 'my-events' || listType === 'more-events') && <div className={`${eventType}`} />}
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.objectOf(String).isRequired,
  listType: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onEventButtonClick: PropTypes.func.isRequired,
};

export default Event;
