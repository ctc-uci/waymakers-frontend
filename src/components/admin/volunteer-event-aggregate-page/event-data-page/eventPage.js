import React from 'react';
import { useParams } from 'react-router-dom';
import TopVolunteersComponent from './top-volunteers/topVolunteersComponent';

const EventDetailPage = () => (
  <div>
    <TopVolunteersComponent event={useParams()} />
  </div>
);

export default EventDetailPage;
