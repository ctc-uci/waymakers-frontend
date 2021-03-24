import React from 'react';
import EventsView from '../../events/events-view/eventsView';
import './volunteerEventAggregatePage.css';

const VolunteerEventAggregatePage = () => {
  console.log('hello');
  return (
    <div className="volunteer-event-aggregatePage">
      <h1 className="title">Select Event to View Data</h1>
      <EventsView />
    </div>
  );
};

export default VolunteerEventAggregatePage;
