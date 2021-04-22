import React, { useState, useEffect } from 'react';

import { WMKBackend } from '../../../../../common/utils';

import './topVolunteersComponent.css';
import TitledCard from '../../../../../common/Card/TitledCard';

const topVolunteersComponent = ({ event }) => {
  const [topVolunteers, setTopVolunteers] = useState([]);

  const paramQuery = {
    params: {
      event: event.id,
    },
  };

  const getTopVolunteers = async () => {
    const volunteers = await WMKBackend.get('/volunteerData/top/', paramQuery);
    setTopVolunteers(volunteers.data);
  };

  useEffect(() => {
    getTopVolunteers();
  }, []);

  const TopVolunteerItem = (volunteer) => (
    <li className="top-volunteer-item">
      <img src="https://placehold.it/75x75" alt="Profile Pic" className="avatar" />
      <div className="volunteer-info">
        <p className="volunteer-name">
          <div className="first">
            {volunteer.firstname}
          </div>
          <div className="first">
            {volunteer.lastname}
          </div>
        </p>
        <p>
          {`${volunteer.sum} hours`}
        </p>
      </div>
    </li>
  );

  return (
    <TitledCard title="Top Volunteers">
      {/* <div className="top-volunteers"> */}
      {/* <div className="volunteers-container"> */}
      <ul className="volunteer-list">
        {topVolunteers.map((volunteer) => (
          TopVolunteerItem(volunteer)
        ))}
      </ul>
      {/* </div> */}
      {/* </div> */}
    </TitledCard>
  );
};

export default topVolunteersComponent;
