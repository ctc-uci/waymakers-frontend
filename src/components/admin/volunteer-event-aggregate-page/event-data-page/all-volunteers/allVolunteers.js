// import React, { useState, useEffect } from 'react';
import React from 'react';

import './allVolunteers.css';

// const axios = require('axios');

const AllVolunteers = () => {
  // const instance = axios.create({
  //   baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
  //   withCredentials: true,
  // });

  // const [allVolunteers, setAllVolunteers] = useState([]);

  // const getAllVolunteers = async () => {
  //   const volunteers = await instance.get('volunteerData/all');
  //   setAllVolunteers(volunteers.data);
  // };

  // useEffect(() => {
  //   getAllVolunteers();
  // }, []);
  const allVolunteers = [{ firstname: 'joe', lastname: 'shmoe', sum: 50 }, { firstname: 'joe', lastname: 'shmoe', sum: 50 }];

  const VolunteerItem = (volunteer) => (
    <tr>
      <th scope="row">
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
  );

  // TODO: All volunteers view box
  return (
    <table className="table table-striped">
      <thead>
        <th scope="col">1</th>
      </thead>
      <tbody>
        {allVolunteers.map((volunteer) => (
          VolunteerItem(volunteer)
        ))}
      </tbody>
    </table>
  );
};

export default AllVolunteers;
