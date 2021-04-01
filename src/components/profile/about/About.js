/* eslint-disable react/prop-types */
import React from 'react';
import './About.css';

import cake from '../../../assets/birthday.svg';
import people from '../../../assets/volunteer-tier.svg';
import building from '../../../assets/student.svg';
import TitledCard from '../../../common/Card/TitledCard';

function About({ birthday, tier, status }) {
  return (
    <TitledCard title="About" className="about-card">
      <p>
        <img className="about-icons" src={cake} alt="" />
        {`${birthday}`}
      </p>
      <p>
        <img className="about-icons" src={people} alt="" width="15px" height="15px" />
        {`${tier}`}
      </p>
      <p>
        <img className="about-icons" src={building} alt="" width="15px" height="15px" />
        {`${status}`}
      </p>
    </TitledCard>
  );
}

export default About;
