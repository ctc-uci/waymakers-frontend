import React from 'react';
import PropTypes from 'prop-types';

import cake from '../../../assets/birthday.svg';
import people from '../../../assets/volunteer-tier.svg';
import building from '../../../assets/student.svg';
import Card from '../../../common/Card/Card';

import './About.css';

function About({
  birthday, tier, status,
}) {
  return (
    <Card title="About" className="about-card">
      <p>
        <img className="about-icons" src={cake} alt="" />
        {`${birthday}`}
      </p>
      <p>
        <img className="about-icons" src={people} alt="" />
        {`${tier}`}
      </p>
      <p>
        <img className="about-icons" src={building} alt="" />
        {`${status}`}
      </p>
    </Card>
  );
}

// About.defaultProps = {
//   className: '',
// };

About.propTypes = {
  // className: PropTypes.string,
  birthday: PropTypes.string.isRequired,
  tier: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
};

export default About;
