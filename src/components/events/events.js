import React from 'react';
// import EventList from './event-list/eventList';
import EventsView from './events-view/eventsView';

const axios = require('axios');

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
  // const currentEvents = [
  //   {
  //     title: 'currentEvent 1',
  //     start: '2020-11-18T11:00:00',
  //     end: '2020-11-18T13:00:00',
  //     description: 'This is a test woohoo',
  //   },
  //   {
  //     title: 'current event 2', date: '2020-11-19',
  //   },
  // ];
  let currentEvents = {};
  axios.get('http://localhost:2999/events/').then((resp) => {
    // eslint-disable-next-line
    console.log(resp.data.toString());
    currentEvents = JSON.parse(resp.data.toString());
  });
  // eslint-disable-next-line
  console.log(currentEvents);
  // axios.get(':3001/events/')
  //   .then(function (response) {
  //     // handle success
  //     const currentEvents = JSON.parse(response);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   })
  //   .then(function () {
  //     // always executed
  //   });

  const myEvents = [
    {
      title: 'myEvent 1',
      start: '2020-11-16T12:00:00',
      end: '2020-11-16T13:00:00',
      description: 'yay',
    },
    {
      title: 'my Event 2',
      date: '2020-11-03',
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
