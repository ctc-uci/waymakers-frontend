import React, { useState, useEffect } from 'react';

const axios = require('axios');

const AllVolunteers = () => {
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
    withCredentials: true,
  });

  const [allVolunteers, setAllVolunteers] = useState([]);

  const getAllVolunteers = async () => {
    const volunteers = await instance.get('volunteerData/all');
    setAllVolunteers(volunteers.data);
  };

  useEffect(() => {
    getAllVolunteers();
  }, []);

  // TODO: All volunteers view box
  return (
    <div>
      {allVolunteers}
    </div>
  );
};

export default AllVolunteers;
