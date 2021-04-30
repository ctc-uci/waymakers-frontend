import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as IconAi from 'react-icons/ai';
import * as IconGo from 'react-icons/go';
// import { fullCalendarEventToRegularEvent } from '../../util';

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

  const openPopup = () => {
    dispatch(setShowPopup(true));
  };

  const setEventPopupType = (type) => {
    dispatch(changePopupType(type));
  };

  const setEvent = (selectedEvent) => {
    console.log('HIIIIIIIIII');
    const calendarEventId = selectedEvent.id;
    console.log(calendarEventId);
    const regularEvent = allRegularEvents
      .filter((event) => parseInt(event.id, 10) === parseInt(calendarEventId, 10));
    console.log(regularEvent[0]);

    // const convertedEvent = fullCalendarEventToRegularEvent(selectedEvent);
    // console.log(convertedEvent);
    // console.log(selectedEvent.id);
    dispatch(changeSelectedEvent(regularEvent[0]));
  };

  const getEventById = (calendarEvent) => {
    console.log('HIIIIIIIIII');
    const calendarEventId = calendarEvent.id;
    console.log(calendarEventId);
    const regularEvent = allRegularEvents.filter((event) => event.id === calendarEventId);
    console.log(regularEvent);
  };

  const onEventBlockClick = () => {
    getEventById(eventInfo.event);
    setEvent(eventInfo.event);
    if (isUserEvent) {
      if (eventInfo.isPast) {
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
    if (isUserEvent) {
      const checkIcon = <IconAi.AiOutlineCheck size={10} color="black" />;
      return <button type="button" className="cursor-pointer">{checkIcon}</button>;
    }
    return <button type="button" className="cursor-pointer" onClick={(e) => { onAddButtonClick(e); }}>+</button>;
  };

  // Renders diff blocks based on view and page/pathname
  if (eventInfo.view.type === 'timeGridWeek' || eventInfo.view.type === 'timeGridFourDay') {
    switch (page) {
      case 'volunteerDashboard':
        return (
          <div id="week-event-block" className="cursor-pointer" tabIndex={0} onClick={onEventBlockClick} onKeyDown={() => {}} role="button">
            <div id="week-event-content">
              <p id="week-event-title">{eventInfo.event.title}</p>
              {renderEventButton()}
            </div>
            <div id="strip" style={{ backgroundColor: eventTypeColor }} />
          </div>
        );
      case 'addModifyDeleteEventsPage':
        return (
          <div id="week-edit-event-block" className="cursor-pointer" tabIndex={0} onClick={onViewEventsPageBlockClick} onKeyDown={() => {}} role="button">
            <p id="week-edit-event-title">{eventInfo.event.title}</p>
          </div>
        );
      case 'aggregatePage':
        return (
          <div id="week-event-block" className="cursor-pointer" tabIndex={0} onClick={onAdminEventBlockClick} onKeyDown={() => {}} role="button">
            <div id="week-event-content">
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
    <div id="month-event-block" className="cursor-pointer" tabIndex={0} onClick={onMonthBlockClick} onKeyDown={() => {}} role="button">
      <IconGo.GoPrimitiveDot color={eventInfo.borderColor} size={14} />
      <p id="monthViewEventTime">{`${convertedHour === 0 ? 12 : convertedHour}${minute === 0 ? '' : displayMinute}${hour < 13 ? 'a' : 'p'}`}</p>
      <p id="monthViewEventTitle">{eventInfo.event.title}</p>
    </div>
  );
};

EventBlock.propTypes = {
  page: PropTypes.string.isRequired,
  eventInfo: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EventBlock;
