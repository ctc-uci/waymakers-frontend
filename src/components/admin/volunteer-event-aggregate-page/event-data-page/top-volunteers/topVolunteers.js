import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { WMKBackend } from '../../../../../common/utils';

import TitledCard from '../../../../../common/Card/TitledCard';

import ProfilePlaceholder from '../../../../../assets/profileplaceholder.jpg';

import './topVolunteers.css';

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: var(--text-color-dark);
`;

const TopVolunteers = ({ eventId }) => {
  const [topVolunteers, setTopVolunteers] = useState([]);

  const getTopVolunteers = async () => {
    const volunteers = await WMKBackend.get('/volunteerData/top/', {
      params: {
        event: eventId,
      },
    });

    // always have 4 top volunteers
    const fourPlaceholderVolunteers = [...Array(4)].map((_, i) => ({
      firstname: 'N/A',
      lastname: 'N/A',
      sum: '--',
      userid: `notRealVolunteer${i}`,
    }));
    const top4VolunteerData = [...volunteers.data, ...fourPlaceholderVolunteers].slice(0, 4);

    setTopVolunteers(top4VolunteerData);
  };

  useEffect(() => {
    getTopVolunteers();
  }, []);

  const TopVolunteerItem = (volunteer) => (
    <li className="top-volunteer-item" key={volunteer.userid}>
      <img src={volunteer.profile_picture || ProfilePlaceholder} alt="Profile Pic" className="avatar" />
      <div className="volunteer-info">
        <div className="volunteer-name">
          <div className="first">
            {volunteer.firstname}
          </div>
          <div className="first">
            {volunteer.lastname}
          </div>
        </div>
        <p>
          {`${volunteer.sum} hours`}
        </p>
      </div>
    </li>
  );

  return (
    <TitledCard title="Top Volunteers" className="volunteer-card-container" cardClassName="volunteer-card">
      <ul className="volunteer-list">
        {topVolunteers.map((volunteer, i) => (
          <>
            {TopVolunteerItem(volunteer)}
            {i < 3 ? <Divider /> : null}
          </>
        ))}
      </ul>
    </TitledCard>
  );
};

TopVolunteers.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default TopVolunteers;
