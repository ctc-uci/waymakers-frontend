import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import EventDetails from './event-details/EventDetails';
import TopVolunteersComponent from './top-volunteers/topVolunteersComponent';
import ListOfVolunteers from './list-of-volunteers/listOfVolunteers';
import Demographics from './demographics/demographics';

import { WMKBackend } from '../../../../common/utils';

import './eventPage.css';

const EventDetailPage = () => {
  const event = useParams();
  const [eventName, setEventName] = useState([]);

  const getEventInfo = async () => {
    const currentEvent = await WMKBackend.get(`/events/${event.id}`);
    setEventName(currentEvent.data[0].title);
  };

  useEffect(() => {
    getEventInfo();
  }, []);
  // TODO: Remove borders and add box shadows before we're done
  // (they're commented out to help with alignment)
  return (
    <div className="event-page-info">
      <h1 className="event-title">{eventName}</h1>
      <div className="row1">
        <EventDetails event={event} />
        {/* <div className="demo"> */}
        <Demographics event={event} />
        {/* </div> */}
      </div>
      <div className="row2">
        <TopVolunteersComponent event={event} className="top-volunteers" />
        <ListOfVolunteers event={event} className="all-volunteers" />
      </div>
    </div>
  );
};

export default EventDetailPage;
