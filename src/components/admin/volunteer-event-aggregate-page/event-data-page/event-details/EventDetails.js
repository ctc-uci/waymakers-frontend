import React, { useMemo } from 'react';
import moment from 'moment';
import useEvent from './useEvent';

import { TitledCard } from '../../../../../common/Card';

import clockIcon from '../../../../../assets/clock.svg';
import locationPinIcon from '../../../../../assets/blueLocationPin.svg';

import './EventDetails.css';

const Overview = (prop) => {
  const [event, eventMeta] = useEvent(prop.event.id);
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

export default Overview;
