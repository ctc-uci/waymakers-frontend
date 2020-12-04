import React, { useEffect } from 'react';
import axios from 'axios';
import EditEvents from '../events/edit-events/editEvents';

const Dashboard = () => {
  // const [events, setEvents] = useState([]);
  const events = [];

  useEffect(async () => {
    try {
      // GET events from the backend
      let allEvents = await axios.get('http://localhost:3000/events/');
      if (allEvents.status === 200) {
        allEvents = allEvents.data;
        // const eventList = allEvents.map((event) => ({
        //   title: event.event_name,
        //   startTime: event.start_time,
        //   endTime: event.end_time,
        //   eventType: event.event_type,
        //   location: event.event_location,
        //   description: event.event_description,
        //   id: event.event_id,
        // }));

        // Sorting event list to only render the upcoming events
        // eventList.sort((a, b) => {
        //   // Turn your strings into dates, and then subtract them
        //   // to get a value that is either negative, positive, or zero.
        //   return new Date(b.start_time) - new Date(a.end_time);
        // });

        // setEvents(eventList.slice(0, 2));
      }
    } catch (e) {
      // eslint-disable-next-line
      console.log('Error while getting events from the backend!');
    }
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <EditEvents events={events} />
    </div>
  );
};

export default Dashboard;
