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
    },
  };

  const getTopVolunteers = async () => {
    const volunteers = await instance.get('volunteerData/top/', paramQuery);
    setTopVolunteers(volunteers.data);
  };

  useEffect(() => {
    getTopVolunteers();
  }, []);

  // const TopVolunteerItem = (volunteer) => (
  //   <li className="list-group-item list-group-item-dark">
  //     <div className="top-volunteer-item">
  //       <img src="https://placehold.it/75x75" alt="100x100" className="rounded-circle" style={{ marginRight: 5 }} />
  //       <h2 style={{ fontSize: 15, fontWeight: 'bold' }}>
  //         {volunteer.firstname}
  //         <br />
  //         {volunteer.lastname}
  //         <br />
  //         {`${volunteer.sum} hours`}
  //       </h2>
  //     </div>
  //   </li>
  // );

  const TopVolunteerItem = (volunteer) => (
    <li className="top-volunteer-item">
      <img src="https://placehold.it/75x75" alt="Profile Pic" className="avatar" />
      <div>
        <p className="volunteer-name">
          {volunteer.firstname}
          <br />
          {volunteer.lastname}
        </p>
        <p>
          {`${volunteer.sum} hours`}
        </p>
      </div>
    </li>
  );

  return (
    <div className="top-volunteers">
      <h2 className="title">Top Volunteers:</h2>
      <div className="volunteers-container">
        <ul className="volunteer-list">
          {topVolunteers.map((volunteer) => (
            TopVolunteerItem(volunteer)
          ))}
        </ul>
      </div>
    </div>
  );
};

export default topVolunteersComponent;
