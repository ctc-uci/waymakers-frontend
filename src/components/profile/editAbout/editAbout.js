/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import './editAbout.css';

const EditAbout = ({
  tier, setTier, status, setStatus,
}) => {
  const [birthday, setBday] = useState('');

  return (
    <div className="aboutCard">
      <h2>About</h2>
      <form>
        <label htmlFor="bday">Birthday: </label>
        <input type="date" value={birthday} name="bday" onChange={(e) => setBday(e.target.value)} />
        <br />
        <br />
        <label htmlFor="tier">Volunteer Tier: </label>
        <input type="text" value={tier} name="tier" onChange={(e) => setTier(e.target.value)} />
        <br />
        <br />
        <label htmlFor="status">Status: </label>
        <input type="text" value={status} name="status" onChange={(e) => setStatus(e.target.value)} />
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
      </form>
    </div>

  );
};

export default EditAbout;
