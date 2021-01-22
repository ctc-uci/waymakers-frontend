/* eslint-disable react/prop-types */
import React from 'react';
import './About.css';

import cake from '../../../images/bday.png';
import people from '../../../images/ppl.png';
import building from '../../../images/building.png';

function About({ birthday, tier, status }) {
  return (
    <div className="aboutCard">
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