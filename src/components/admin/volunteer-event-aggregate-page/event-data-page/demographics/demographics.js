import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GenericPieChart from './pie-chart/PieChart';

const axios = require('axios');

const Demographics = ({ event }) => {
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
    withCredentials: true,
  });

  const [allVolunteers, setAllVolunteers] = useState([]);

  const getDemographicData = (attribute) => {
    const counter = {};
    allVolunteers.forEach((volunteer) => {
      console.log(attribute, volunteer[attribute]);
      if (!counter[volunteer[attribute]]) {
        counter[volunteer[attribute]] = 0;
      }
      counter[volunteer[attribute]] += 1;
    });
    return Object.entries(counter).map(([k, v]) => ({ name: k, value: v }));
  };

  const paramQuery = {
    params: {
      event: event.id,
    },
  };

  const getAllVolunteers = async () => {
    const volunteers = await instance.get('volunteerData/all/', paramQuery);
    setAllVolunteers(volunteers.data);
  };

  useEffect(() => {
    getAllVolunteers();
  }, []);

  return (
    <>
      <GenericPieChart demoInfo={getDemographicData('gender')} label="gender" />
      <GenericPieChart demoInfo={getDemographicData('tier')} label="tier" />
    </>
  );
};

Demographics.propTypes = {
  event: PropTypes.string.isRequired,
};

export default Demographics;
