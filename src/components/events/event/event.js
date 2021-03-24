import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import './event.css';

import {
  setShowPopup,
  changePopupType,
  changeSelectedEvent,
} from '../redux/actions';

const Event = ({
  event, listType, index, onEventButtonClick,
}) => {
  const dispatch = useDispatch();
  // Date formatting
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(startDate);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(startDate);
  const startTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(startDate);
  const endTime = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' }).format(endDate);
  const eventType = `${event.eventType.toLowerCase()}-event`;

  const openPopup = () => { dispatch(setShowPopup(true)); };
  const setEventPopupType = (type) => { dispatch(changePopupType(type)); };
  const setEvent = (selectedEvent) => { dispatch(changeSelectedEvent(selectedEvent)); };

  // EVENT BLOCK CLICK HANDLERS
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

  const onVolunteerEventBlockClick = (clickedEvent) => {
    setEvent(clickedEvent);
    if (listType === 'my-events') {
      if (moment(new Date(clickedEvent.startTime)).isBefore(moment())) {
        setEventPopupType('AddMyHoursPopup');
      } else {
        setEventPopupType('RemoveFromMyEventPopup');
      }
    } else {
      setEventPopupType('AddEventPopup');
    }
    openPopup();
  };

  // RENDERING FUNCTIONS
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
      default: console.log('incorrect list type');
    }
  };

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

  return (
    <div className="event-list-container" tabIndex={0} onClick={renderEventBlockPopup} onKeyDown={() => {}} role="button">
      <div className={`event-container ${listType}`}>
        {renderButton()}
        <div className="event-date-section">
          <h3 className="event-day">{day}</h3>
          <p className="event-month">{month}</p>
        </div>
        <div className="event-info-section">
          <h3 className="event-block-title">{event.title}</h3>
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
