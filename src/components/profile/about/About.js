/* eslint-disable react/prop-types */
import React from 'react';
import './About.css';

import cake from '../../../assets/bday.png';
import people from '../../../assets/ppl.png';
import building from '../../../assets/building.png';
import TitledCard from '../../../common/Card/TitledCard';

function About({ birthday, tier, status }) {
  return (
    <TitledCard title="About" className="about-card">
      <p>
        <img src={cake} alt="" width="15px" height="15px" />
        {` ${birthday}`}
      </p>
      <p>
        <img src={people} alt="" width="15px" height="15px" />
        {` ${tier}`}
      </p>
      <p>
        <img src={building} alt="" width="15px" height="15px" />
        {` ${status}`}
      </p>
    </TitledCard>
  );
}

export default About;
