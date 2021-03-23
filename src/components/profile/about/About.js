/* eslint-disable react/prop-types */
import React from 'react';
import './About.css';

import cake from '../../../assets/bday.png';
import people from '../../../assets/ppl.png';
import building from '../../../assets/building.png';

function About({ birthday, tier, status }) {
  return (
    <div className="about">
      <h2>About</h2>
      <div>
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
      </div>
    </div>

  );
}

export default About;
