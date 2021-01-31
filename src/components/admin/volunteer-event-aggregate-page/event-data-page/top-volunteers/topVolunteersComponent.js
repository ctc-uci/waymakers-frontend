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
      event: event.id,
      // event: 21,
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
    <li className="list-group-item list-group-item-dark">
      <div className="top-volunteer-item">
        <img src="https://placehold.it/75x75" alt="100x100" className="rounded-circle" style={{ marginRight: 5 }} />
        <h2 style={{ fontSize: 15, fontWeight: 'bold' }}>
          {volunteer.firstname}
          <br />
          {volunteer.lastname}
          <br />
          {`${volunteer.sum} hours`}
        </h2>
      </div>
    </li>
  );

  return (
    <div className="top-volunteers-div">
      <h2>Top Volunteers:</h2>
      <ul className="list-group list-group-flush">
        {topVolunteers.map((volunteer) => (
          TopVolunteerItem(volunteer)
        ))}
      </ul>
    </div>
  );
};

export default topVolunteersComponent;
