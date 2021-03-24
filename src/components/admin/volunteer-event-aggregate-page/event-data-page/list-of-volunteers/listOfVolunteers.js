import React, { useState, useEffect } from 'react';
import VolunteerTable from './volunteerTable';
import './listOfVolunteers.css';

const axios = require('axios');

const ListOfVolunteers = (prop) => {
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
    // TODO: remove this temporary overflow test
    setAllVolunteers([...volunteers.data,
      ...volunteers.data, ...volunteers.data, ...volunteers.data,
      ...volunteers.data, ...volunteers.data, ...volunteers.data,
      ...volunteers.data, ...volunteers.data, ...volunteers.data,
      ...volunteers.data, ...volunteers.data, ...volunteers.data,
      ...volunteers.data, ...volunteers.data, ...volunteers.data,
      ...volunteers.data, ...volunteers.data, ...volunteers.data]);
    console.log(volunteers.data);
    if (volunteers.data.length) {
      setTotalHours(
        volunteers.data.map((v) => v.sum).reduce((acc, v) => acc + v),
      );
    }
  };

  useEffect(() => {
    // TODO: havent confirmed if sorting works
    getAllVolunteers();
  }, [sortingMethod]);

  return (
    <div className="list-of-volunteer">
      <h2 className="title">List of Volunteers:</h2>
      <div className="card">
        <div className="sort-by-dropdown">
          Sort by:
          <select className="sort-by" value={sortingMethod} onChange={(e) => setSortingMethod(e.target.value)}>
            <option className="sort-by-items" value="0">A-Z</option>
            <option className="sort-by-items" value="1">Z-A</option>
            <option className="sort-by-items" value="2">Most Hours</option>
            <option className="sort-by-items" value="3">Least Hours</option>
          </select>
        </div>

        <VolunteerTable data={allVolunteers} />

        <div className="total-stats">
          <p>
            Total People:
            {' '}
            {allVolunteers.length}
          </p>
          <p>
            Total Hours:
            {' '}
            {totalHours}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListOfVolunteers;
