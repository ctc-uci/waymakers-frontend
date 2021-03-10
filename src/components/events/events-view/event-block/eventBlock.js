import React from 'react';
import PropTypes from 'prop-types';
import * as IconAi from 'react-icons/ai';
import * as IconGo from 'react-icons/go';

import store from '../../redux/store';

import {
  deleteEvent,
  setShowPopup,
  changeSelectedEvent,
  changePopupType,
} from '../../redux/actions';
import trashcan from '../../../../images/trashcan.svg';

import './eventBlock.css';

const EventBlock = ({
  page, eventInfo,
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

  const setEventPopupType = (type) => {
    store.dispatch(changePopupType(type));
  };

  const setEvent = (selectedEvent) => {
    store.dispatch(changeSelectedEvent(selectedEvent));
  };

  const onEventBlockClick = () => {
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

  const onDeleteClick = (e) => {
    e.stopPropagation();
    store.dispatch(deleteEvent(eventInfo.event.id));
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

  // TODO: Add delete confirmation before deleting event
  const renderTrashButton = () => {
    const trashIcon = <img className="trash-icon" src={trashcan} alt="trashcan" />;
    return <button type="button" className="cursor-pointer" onClick={(e) => onDeleteClick(e)}>{trashIcon}</button>;
  };

  // Renders diff blocks based on view and page/pathname
  if (eventInfo.view.type === 'timeGridWeek') {
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
            {renderTrashButton()}
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
