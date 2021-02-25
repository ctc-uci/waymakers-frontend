import React from 'react';
import PropTypes from 'prop-types';
// import * as Icon from 'react-icons/im';
import * as IconAi from 'react-icons/ai';
import * as IconGo from 'react-icons/go';

import store from '../../redux/store';

import { deleteEvent, setShowPopup, changeSelectedEvent } from '../../redux/actions';
import trashcan from '../../../../images/trashcan.svg';

import './eventBlock.css';

const EventBlock = ({
  path, eventInfo, setConfirmAddEvent,
}) => {
  const eventTypeColors = {
    Volunteer: 'var(--color-golden-yellow)',
    Outreach: 'var(--color-pink)',
    Other: 'var(--color-light-purple)',
  };
  const eventTypeColor = eventTypeColors[eventInfo.event.extendedProps.eventType];

  const isUserEvent = eventInfo.event.backgroundColor === 'var(--color-light-green)';

  const openPopup = () => {
    store.dispatch(setShowPopup(true));
  };

  const setEvent = (selectedEvent) => {
    store.dispatch(changeSelectedEvent(selectedEvent));
  };

  const onEventBlockClick = () => {
    setEvent(eventInfo.event);
    setConfirmAddEvent(false);
    openPopup();
  };

  const onAddButtonClick = () => {
    setEvent(eventInfo.event);
    setConfirmAddEvent(true);
    openPopup();
  };

  const onDeleteClick = () => {
    console.log(eventInfo.event.id);
    store.dispatch(deleteEvent(eventInfo.event.id));
  };

  const renderEventButton = () => {
    if (isUserEvent) {
      const checkIcon = <IconAi.AiOutlineCheck size={10} color="black" />;
      return <button type="button">{checkIcon}</button>;
    }
    return <button type="button" onClick={(e) => { e.stopPropagation(); onAddButtonClick(); }}>+</button>;
  };

  const renderTrashButton = () => {
    const trashIcon = <img className="trash-icon" src={trashcan} alt="trashcan" />;
    return <button type="button" onClick={onDeleteClick}>{trashIcon}</button>;
  };

  // Renders diff blocks based on view and page/pathname
  if (eventInfo.view.type === 'timeGridWeek') {
    switch (path) {
      case '/volunteer/events':
        return (
          <div id="week-event-block" tabIndex={0} onClick={() => { onEventBlockClick(); }} onKeyDown={() => {}} role="button">
            <div id="week-event-content">
              <p>{eventInfo.event.title}</p>
              {renderEventButton()}
            </div>
            <div id="strip" style={{ backgroundColor: eventTypeColor }} />
          </div>
        );
      case '/events':
        return (
          <div id="week-edit-event-block">
            {renderTrashButton()}
            <p id="week-edit-event-title">{eventInfo.event.title}</p>
          </div>
        );
      case '/admin/aggregate':
        return (
          <div id="week-event-block">
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

  return (
    <div id="month-event-block" tabIndex={0} onClick={() => { onEventBlockClick(); }} onKeyDown={() => {}} role="button">
      <IconGo.GoPrimitiveDot color={eventInfo.borderColor} size={14} />
      <p id="monthViewEventTime">{`${convertedHour === 0 ? 12 : convertedHour}${minute === 0 ? '' : displayMinute}${hour < 13 ? 'a' : 'p'}`}</p>
      <p id="monthViewEventTitle">{eventInfo.event.title}</p>
    </div>
  );
};

EventBlock.propTypes = {
  path: PropTypes.string.isRequired,
  eventInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  setConfirmAddEvent: PropTypes.func.isRequired,
};

export default EventBlock;
