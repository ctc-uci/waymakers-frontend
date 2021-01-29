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

  const paramQuery = {
    params: {
      event: prop.event.id,
      // event: 21,
    },
  };

  const [allVolunteers, setAllVolunteers] = useState([]);

  const getAllVolunteers = async () => {
    const volunteers = await instance.get('volunteerData/all/', paramQuery);
    setAllVolunteers(volunteers.data);
  };

  useEffect(() => {
    getAllVolunteers();
  }, []);

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
              Position V
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
        <th scope="col"><h1>List of Volunteers</h1></th>
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
