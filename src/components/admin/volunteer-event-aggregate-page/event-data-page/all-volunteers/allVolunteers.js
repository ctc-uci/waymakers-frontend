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

  const [sortingMethod, setSortingMethod] = useState('0');

  const [totalHours, setTotalHours] = useState(0);

  const paramQuery = {
    params: {
      event: prop.event.id,
      sortingMethod,
    },
  };

  const getAllVolunteers = async () => {
    const volunteers = await instance.get('volunteerData/all/', paramQuery);
    setAllVolunteers(volunteers.data);
    setTotalHours(volunteers.data.map((v) => v.sum).reduce((acc, v) => acc + v, 0));
  };

  useEffect(() => {
    getAllVolunteers();
  }, [sortingMethod]);

  const VolunteerItem = (volunteer, index) => (
    <>
      <tr key={volunteer.userid} data-toggle="collapse" data-target={`.order${index}`}>
        <th className="border-dark">
          <div className="volunteer-info">
            <div className="volunteer-name">
              {volunteer.firstname}
              {' '}
              {volunteer.lastname}
            </div>
            <div className="volunteer-position">
              {volunteer.sum}
            </div>
          </div>
        </th>
      </tr>
      <tr>
        <td className="collapsed-info" style={{ padding: 0 }}>
          <div className={`collapse order${index}`}>
            Position:
            {' '}
            {volunteer.permissions}
            <br />
            Volunteer Tier:
            {' '}
            {volunteer.tier}
            <br />
            Age:
            {' '}
            {volunteer.date_part}
          </div>
        </td>
      </tr>
    </>
  );

  // TODO: All volunteers view box
  return (
    <div className="all-volunteers-table">
      <h1>List of Volunteers</h1>
      <div className="all-volunteers-table-header">
        <h3>Sort by</h3>
        <select
          className="form-control all-volunteers-tier-selection"
          id="sort-by"
          name="tiers"
          onChange={(e) => setSortingMethod(e.target.value)}
        >
          <option value="0" selected>None</option>
          <option value="1">A-Z</option>
          <option value="2">Z-A</option>
          <option value="3">Tier</option>
        </select>
      </div>
      <table className="table table-bordered volunteer-table border-dark">
        <thead className="border-dark">
          <th scope="col" className="all-volunteers-table-head">
            <h1>Name</h1>
            {/* <select
              className="form-control all-volunteers-tier-selection"
              id="tiers"
              name="tiers"
              onChange={(e) => setTier(e.target.value)}
            >
              <option value="" selected>All Tiers</option>
              <option value="1">Tier 1</option>
              <option value="2">Tier 2</option>
              <option value="3">Tier 3</option>
              <option value="4">Tier 4</option>
            </select> */}
            <h1>Number of hours</h1>
          </th>
        </thead>
        <tbody>
          {allVolunteers.map((volunteer, index) => (
            VolunteerItem(volunteer, index)
          ))}
        </tbody>
        <div className="volunteer-cardinality">
          <div className="volunteer-number">
            <h2>
              Total People:
              {' '}
              {allVolunteers.length}
            </h2>
          </div>
          <div className="volunteer-total-hours">
            <h2>
              Total Hours:
              {' '}
              {totalHours}
            </h2>
          </div>
        </div>
      </table>
    </div>
  );
};

export default AllVolunteers;
