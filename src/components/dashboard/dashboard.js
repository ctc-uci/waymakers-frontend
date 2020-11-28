import React from 'react';
import EditEvents from '../events/edit-events/editEvents';

const Dashboard = () => {
  const dummyEvents = [
    {
      title: 'Study Date',
      startDate: '2020-11-22 10:00:00',
      endDate: '2020-11-22 20:00:00',
      location: 'DBH',
      description: 'The grind never stops',
    },
    {
      title: 'Study Date 2',
      startDate: '2020-11-22 10:00:00',
      endDate: '2020-11-22 20:00:00',
      location: 'DBH',
      description: 'The grind never stops',
    },
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <EditEvents events={dummyEvents} />
    </div>
  );
};

export default Dashboard;
