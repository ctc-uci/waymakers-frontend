import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { TitledCard } from '../../../../../common/Card';
import useEvent from './useEvent';

import clockIcon from '../../../../../assets/clock.svg';
import locationPinIcon from '../../../../../assets/blueLocationPin.svg';

import './EventDetails.css';

const EventDetails = ({ eventId }) => {
  const [event, eventMeta] = useEvent(eventId);
  const startTime = useMemo(() => (event ? moment(event.startTime) : null), [event]);
  const endTime = useMemo(() => (event ? moment(event.endTime) : null), [event]);

  if (eventMeta.isInitializing) {
    return <TitledCard title="Event Details">isInitializing</TitledCard>;
  }

  if (eventMeta.isLoading) {
    return <TitledCard title="Event Details">isLoading</TitledCard>;
  }

  if (eventMeta.error) {
    return <TitledCard title="Event Details">errored</TitledCard>;
  }

  if (event.length === 0) {
    return <TitledCard title="Event Details">no data</TitledCard>;
  }

  return (
    <TitledCard title="Event Details" className="event-card">
      <div className="event-details-container">
        <div className="event-info-container">
          <img className="event-info-icon" src={clockIcon} alt="time" />
          <div>
            <p>{`${startTime.format('ddd MMM Do hh:mm A')} to`}</p>
            <p>{endTime.format('ddd MMM Do hh:mm A')}</p>
          </div>
        </div>
        <div className="event-info-container">
          <img className="event-info-icon" src={locationPinIcon} alt="location" />
          <p>{event.location}</p>
        </div>
        <p>{event.description}</p>
      </div>
    </TitledCard>
  );
};

EventDetails.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default EventDetails;
