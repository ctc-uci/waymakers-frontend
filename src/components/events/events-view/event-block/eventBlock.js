import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as IconGo from 'react-icons/go';

import {
  setShowPopup,
  changeSelectedEvent,
  changePopupType,
} from '../../redux/actions';

import {
  getEvents,
} from '../../redux/selectors';

import './eventBlock.css';

const EventBlock = ({
  page, eventInfo,
}) => {
  const dispatch = useDispatch();

  const eventTypeColors = {
    Volunteer: 'var(--color-golden-yellow)',
    Outreach: 'var(--color-pink)',
    Other: 'var(--color-light-purple)',
  };

  const eventTypeColor = eventTypeColors[eventInfo.event.extendedProps.eventType];
  const isUserEvent = eventInfo.event.backgroundColor === 'var(--color-light-green)';
  const allRegularEvents = useSelector(getEvents);
  const isAllDayEvent = eventInfo.event.allDay;

  const openPopup = () => {
    dispatch(setShowPopup(true));
  };

  const setEventPopupType = (type) => {
    dispatch(changePopupType(type));
  };

  const setEvent = (selectedEvent) => {
    const calendarEventId = selectedEvent.id;
    const regularEvent = allRegularEvents
      .filter((event) => parseInt(event.id, 10) === parseInt(calendarEventId, 10));
    dispatch(changeSelectedEvent(regularEvent[0]));
  };

  const onEventBlockClick = () => {
    setEvent(eventInfo.event);
    if (isUserEvent) {
      if (new Date(eventInfo.event.start) < new Date()) {
        setEventPopupType('AddMyHoursPopup');
      } else {
        setEventPopupType('RemoveFromMyEventPopup');
      }
    } else {
      setEventPopupType('AddEventPopup');
    }
    openPopup();
  };

  const onAddButtonClick = (e) => {
    e.stopPropagation();
    setEvent(eventInfo.event);
    setEventPopupType('ConfirmCancelPopup');
    openPopup();
  };

  const onAdminEventBlockClick = () => {
    setEvent(eventInfo.event);
    openPopup();
  };

  // Admin Event Calendar
  const onViewEventsPageBlockClick = () => {
    setEvent(eventInfo.event);
    setEventPopupType('ViewEventInfoPopup');
    openPopup();
  };

  const renderEventButton = () => {
    if (isUserEvent && !isAllDayEvent) {
      return <button type="button">✓</button>;
    }
    if (!isAllDayEvent) {
      return <button type="button" className="plus-button" onClick={(e) => { onAddButtonClick(e); }}>+</button>;
    }
    return null;
  };

  // Renders diff blocks based on view and page/pathname
  if (eventInfo.view.type === 'timeGridWeek' || eventInfo.view.type === 'timeGridFourDay') {
    switch (page) {
      case 'volunteerDashboard':
        return (
          <div className={`week-event-block ${eventInfo.event.allDay ? 'all-day-week-event-content' : ''}`} tabIndex={0} onClick={onEventBlockClick} onKeyDown={() => {}} role="button">
            <div className="week-event-content">
              <p className="week-event-title">{eventInfo.event.title}</p>
              {eventInfo.event.allDay && <div className="all-day-strip" style={{ backgroundColor: eventTypeColor }} />}
              {renderEventButton()}
            </div>
            {!eventInfo.event.allDay && <div className="strip" style={{ backgroundColor: eventTypeColor }} />}
          </div>
        );
      case 'addModifyDeleteEventsPage':
        return (
          <div className="week-edit-event-block" tabIndex={0} onClick={onViewEventsPageBlockClick} onKeyDown={() => {}} role="button">
            <p className="week-edit-event-title">{eventInfo.event.title}</p>
          </div>
        );
      case 'aggregatePage':
        return (
          <div className="week-event-block" tabIndex={0} onClick={onAdminEventBlockClick} onKeyDown={() => {}} role="button">
            <div className="week-event-content">
              <p>{eventInfo.event.title}</p>
            </div>
          </div>
        );
      default: break;
    }
  }

  // Get values to display hour and minute on event block
  const hour = eventInfo.event.start.getHours();
  const convertedHour = hour < 13 ? hour : hour - 12;
  const minute = eventInfo.event.start.getMinutes();
  const displayMinute = `:${minute < 10 ? '0' : ''}${minute}`;

  const onMonthBlockClick = () => {
    switch (page) {
      case 'volunteerDashboard':
        onEventBlockClick();
        break;
      case 'addModifyDeleteEventsPage':
        onViewEventsPageBlockClick();
        break;
      case 'aggregatePage':
        onAdminEventBlockClick();
        break;
      default: break;
    }
  };

  return (
    <div className="month-event-block" tabIndex={0} onClick={onMonthBlockClick} onKeyDown={() => {}} role="button">
      <IconGo.GoPrimitiveDot color={eventInfo.borderColor} size={14} />
      <p className="month-view-event-time">{`${convertedHour === 0 ? 12 : convertedHour}${minute === 0 ? '' : displayMinute}${hour < 13 ? 'a' : 'p'}`}</p>
      <p className="month-view-event-title">{eventInfo.event.title}</p>
    </div>
  );
};

EventBlock.propTypes = {
  page: PropTypes.string.isRequired,
  eventInfo: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EventBlock;
