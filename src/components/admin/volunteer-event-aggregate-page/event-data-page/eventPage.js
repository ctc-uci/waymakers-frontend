import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EventDetails from './event-details/EventDetails';
import TopVolunteersComponent from './top-volunteers/topVolunteersComponent';
import ListOfVolunteers from './list-of-volunteers/listOfVolunteers';
import Demographics from './demographics/demographics';
import './eventPage.css';

const axios = require('axios');

const EventDetailPage = () => {
  const event = useParams();
  const [eventName, setEventName] = useState([]);
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
    withCredentials: true,
  });

  const getEventInfo = async () => {
    const currentEvent = await instance.get(`events/${event.id}`);
    setEventName(currentEvent.data[0].title);
  };

  useEffect(() => {
    getEventInfo();
  }, []);

  return (
    <div className="event-page-info">
      <h2 className="event-title">{eventName}</h2>
      <div className="row1">
        <EventDetails event={event} />
        <Demographics event={event} />
      </div>
      <div className="row2">
        <TopVolunteersComponent event={event} className="top-volunteers" />
        <ListOfVolunteers event={event} className="all-volunteers" />
      </div>
    </div>
  );
};

export default EventDetailPage;
