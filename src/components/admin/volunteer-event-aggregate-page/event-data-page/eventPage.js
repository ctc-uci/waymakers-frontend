import React from 'react';
import { useParams } from 'react-router-dom';
import TopVolunteersComponent from './top-volunteers/topVolunteersComponent';
import AllVolunteers from './all-volunteers/allVolunteers';

const EventDetailPage = () => (
  <div>
    <TopVolunteersComponent event={useParams()} />
    <AllVolunteers event={useParams()} />
  </div>
);

export default EventDetailPage;
