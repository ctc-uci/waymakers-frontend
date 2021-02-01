import React from 'react';
import { useParams } from 'react-router-dom';
import Overview from './overview/overview';
import TopVolunteersComponent from './top-volunteers/topVolunteersComponent';
import AllVolunteers from './all-volunteers/allVolunteers';
import './eventPage.css';

const EventDetailPage = () => (
  <div>
    <Overview event={useParams()} />
    <div className="volunteer-section">
      <TopVolunteersComponent event={useParams()} className="top-volunteers" />
      <AllVolunteers event={useParams()} className="all-volunteers" />
    </div>
  </div>
);

export default EventDetailPage;
