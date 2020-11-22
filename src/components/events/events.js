// import React, { useEffect } from 'react';
import React from 'react';
import EventsView from './events-view/eventsView';

// const axios = require('axios');

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

  // GET events from the backend
  // filter by MyEvents and CurrentEvents to pass into EventsView

  // useEffect(() => {
  //   axios.get('http://localhost:2999/events/').then((resp) => {
  //     // eslint-disable-next-line
  //     currentEvents = JSON.parse(resp.data);
  //     console.log(currentEvents);
  //   });
  // }, []);

  const currentEvents = [
    {
      title: 'currentEvent 1',
      start: '2020-11-18T11:00:00',
      end: '2020-11-18T13:00:00',
      description: 'This is a test woohoo',
      location: 'UC Irvine',
    },
    {
      title: 'current event 2',
      date: '2020-11-19',
      location: 'UC Irvine',
    },
  ];

  const myEvents = [
    {
      title: 'myEvent 1',
      start: '2020-11-16T12:00:00',
      end: '2020-11-16T13:00:00',
      description: 'yay',
      location: 'UC Irvine',
    },
    {
      title: 'my Event 2',
      date: '2020-11-03',
      location: 'UC Irvine',
    },
  ];

  return (
    <div className="events">
      <h1>Events</h1>
      <EventsView currentEvents={currentEvents} myEvents={myEvents} />
    </div>
  );
};

export default Events;
