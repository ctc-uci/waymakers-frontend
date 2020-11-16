import React from 'react';
import EventList from './event-list/eventList';

/*
{
  name:
  date:
  time:
  location:
  description:
}
*/

const Events = () => {
  // TODO write a function to get events from database to pass into EventList
  // Will have to filter accordingly for each EventList
  const dummyData = [
    {
      name: 'Lunch',
      date: '3/4/20',
      time: '12:00pm',
      location: 'UCI',
      description: 'Yummy food yay',
    },
    {
      name: 'Career Fair',
      date: '12/31/20',
      time: '4:00pm',
      location: 'Donald Bren',
      description: 'Get an Internship!',
    },
  ];

  return (
    <div className="events">
      <h1>Events</h1>
      <EventList events={dummyData} title="Current Events" />
    </div>
  );
};

export default Events;
