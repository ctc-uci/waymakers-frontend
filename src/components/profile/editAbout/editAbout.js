/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Datetime from 'react-datetime';
// import { Link } from 'react-router-dom';
import './editAbout.css';
import TitledCard from '../../../common/Card/TitledCard';

import cake from '../../../assets/birthday.svg';
import people from '../../../assets/volunteer-tier.svg';
import building from '../../../assets/student.svg';

const EditAbout = ({
  tier, setTier, status, setStatus,
}) => {
  const [birthday, setBday] = useState(new Date());

  return (
    <TitledCard title="About" className="about-card">
      <form>
        {/* <input type="submit" /> */}
        {/* <Link
          classname="to-view"
          to={{
            pathname: '/profile',
            state: { bday, tier, status },
          }}
        >
          Save
        </Link> */}

        <div className="about-input">
          <img className="about-icons" src={cake} alt="" />
          <Datetime
            initialValue={birthday}
            onChange={(e) => setBday(new Date(e))}
          />
        </div>
        <div className="about-input">
          <img className="about-icons" src={people} alt="" />
          <input type="text" value={tier} name="tier" onChange={(e) => setTier(e.target.value)} />
        </div>
        <div className="about-input">
          <img className="about-icons" src={building} alt="" />
          <input type="text" value={status} name="status" onChange={(e) => setStatus(e.target.value)} />
        </div>
      </form>
    </TitledCard>
  );
};

export default EditAbout;
