import React, { useState, useEffect } from 'react';
// import React from 'react';

import './allVolunteers.css';

import 'bootstrap/js/src/collapse';

const axios = require('axios');

const AllVolunteers = (prop) => {
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
    withCredentials: true,
  });

  const [allVolunteers, setAllVolunteers] = useState([]);

  const [selectedTier, setTier] = useState('');

  const paramQuery = {
    params: {
      event: prop.event.id,
      tier: selectedTier,
    },
  };

  const getAllVolunteers = async () => {
    const volunteers = await instance.get('volunteerData/all/', paramQuery);
    setAllVolunteers(volunteers.data);
  };

  useEffect(() => {
    getAllVolunteers();
  }, [selectedTier]);

  const VolunteerItem = (volunteer, index) => (
    <>
      <tr data-toggle="collapse" data-target={`.order${index}`}>
        <th className="border-dark">
          <div className="volunteer-info">
            <div className="volunteer-name">
              {volunteer.firstname}
              {' '}
              {volunteer.lastname}
            </div>
            <div className="volunteer-position">
              {volunteer.tier}
            </div>
          </div>
        </th>
      </tr>
      <tr>
        <td className="collapsed-info" style={{ padding: 0 }}>
          <div className={`collapse order${index}`}>
            Number of hours:
            {' '}
            {volunteer.sum}
            <br />
            Other Information:
          </div>
        </td>
      </tr>
    </>
  );

  // TODO: All volunteers view box
  return (
    <table className="table table-bordered volunteer-table border-dark">
      <thead className="border-dark">
        <th scope="col" className="all-volunteers-table-head">
          <h1>List of Volunteers</h1>
          <select
            className="form-control all-volunteers-tier-selection"
            id="tiers"
            name="tiers"
            onChange={(e) => setTier(e.target.value)}
          >
            <option value="" selected>All Tiers</option>
            {/* Creating dropdown menu items from categories list */}
            {/* category.label is displayed, but the value of the option will be the ID */}
            <option value="1">Tier 1</option>
            <option value="2">Tier 2</option>
            <option value="3">Tier 3</option>
            <option value="4">Tier 4</option>
          </select>
        </th>
      </thead>
      <tbody>
        {allVolunteers.map((volunteer, index) => (
          VolunteerItem(volunteer, index)
        ))}
      </tbody>
      <div className="volunteer-cardinality">
        <div className="volunteer-number-label">
          <h2>
            Total:
            {' '}
          </h2>
        </div>
        <div className="volunteer-number">
          <h2>
            {allVolunteers.length}
          </h2>
        </div>
      </div>
    </table>
  );
};

export default AllVolunteers;
