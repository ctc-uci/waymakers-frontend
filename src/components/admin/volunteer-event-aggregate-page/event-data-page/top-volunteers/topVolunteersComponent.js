import axios from 'axios';
import React, { useState, useEffect } from 'react';

import './topVolunteersComponent.css';

const topVolunteersComponent = ({ event }) => {
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
    withCredentials: true,
  });
  const [topVolunteers, setTopVolunteers] = useState([]);

  const paramQuery = {
    params: {
      // event: event.id,
      event: 21,
    },
  };

  const getTopVolunteers = async () => {
    const volunteers = await instance.get('volunteerData/top/', paramQuery);
    console.log(event.id);
    setTopVolunteers(volunteers.data);
  };

  useEffect(() => {
    getTopVolunteers();
  }, []);

  const TopVolunteerItem = (volunteer) => (
    <div className="top-volunteer-item">
      <span className="avatar" />
      <div className="top-volunteer-item-text">
        <h2 style={{ fontSize: 15, fontWeight: 'bold', margin: 0 }}>
          {volunteer.firstname}
          <br />
          {volunteer.lastname}
        </h2>
        <h2 style={{ fontSize: 15 }}>
          {volunteer.sum}
          {' '}
          hours
        </h2>
      </div>
    </div>
  );

  return (
    <>
      <h2>Top Volunteers:</h2>
      <div className="top-volunteers-div">
        {topVolunteers.map((volunteer) => (
          TopVolunteerItem(volunteer)
        ))}
      </div>
    </>
  );
};

export default topVolunteersComponent;
