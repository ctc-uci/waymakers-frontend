import React from 'react';
import PropTypes from 'prop-types';
import * as Icon from 'react-icons/im';
import * as IconGo from 'react-icons/go';
import * as IconAi from 'react-icons/ai';

import './eventBlock.css';

const EventBlock = ({ path, eventInfo }) => {
  const eventTypeColors = {
    Volunteer: 'var(--color-golden-yellow)',
    Outreach: 'var(--color-golden-yellow)',
    Other: 'var(--color-light-purple)',
  };
  const eventTypeColor = eventTypeColors[eventInfo.event.extendedProps.eventType];

  const isUserEvent = eventInfo.event.backgroundColor === 'var(--color-light-green)';

  if (eventInfo.view.type === 'timeGridWeek') {
    switch (path) {
      case '/volunteer/events':
        return (
          <div id="week-event-block">
            <div id="week-event-content">
              <p>{eventInfo.event.title}</p>
              <button type="button">
                {isUserEvent ? <IconAi.AiOutlineCheck size={10} color="black" /> : '+'}
              </button>
            </div>
            <div id="strip" style={{ backgroundColor: eventTypeColor }} />
          </div>
        );
      case '/events':
        return (
          <div id="week-edit-event-block">
            <Icon.ImBin id="trash-can" />
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

  const hour = eventInfo.event.start.getHours();
  const convertedHour = hour < 13 ? hour : hour - 12;
  const minute = eventInfo.event.start.getMinutes();
  const displayMinute = `:${minute < 10 ? '0' : ''}${minute}`;
  return (
    <div id="month-event-block">
      <IconGo.GoPrimitiveDot color={eventInfo.borderColor} size={14} />
      <p id="monthViewEventTime">{`${convertedHour === 0 ? 12 : convertedHour}${minute === 0 ? '' : displayMinute}${hour < 13 ? 'a' : 'p'}`}</p>
      <p id="monthViewEventTitle">{eventInfo.event.title}</p>
    </div>
  );
};

EventBlock.propTypes = {
  path: PropTypes.string.isRequired,
  eventInfo: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EventBlock;
