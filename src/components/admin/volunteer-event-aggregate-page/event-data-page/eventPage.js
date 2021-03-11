import React from 'react';
import { useParams } from 'react-router-dom';
import EventDetails from './event-details/EventDetails';
import TopVolunteersComponent from './top-volunteers/topVolunteersComponent';
import ListOfVolunteers from './list-of-volunteers/listOfVolunteers';
import Demographics from './demographics/demographics';
import './eventPage.css';

const EventDetailPage = () => (
  <div>
    <EventDetails event={useParams()} />
    <div className="volunteer-section">
      <TopVolunteersComponent event={useParams()} className="top-volunteers" />
      <Demographics event={useParams()} />
      <ListOfVolunteers event={useParams()} className="all-volunteers" />
    </div>
  </div>
);

export default EventDetailPage;
