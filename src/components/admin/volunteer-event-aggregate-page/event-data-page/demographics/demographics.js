import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import PieChart from './pie-chart/PieChart';

import leftArrow from '../../../../../images/pieChartLeftArrow.svg';
import rightArrow from '../../../../../images/pieChartRightArrow.svg';
import './demographics.css';

const axios = require('axios');

const Demographics = ({ event }) => {
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
    withCredentials: true,
  });

  // Get information for all volunteers
  const [allVolunteers, setAllVolunteers] = useState([]);
  // Determines which 3 pie charts we display
  const [startDisplayIndex, setStartDisplayIndex] = useState(0);
  // List of pie chart attributes/labels which helps us map pie charts
  // Attribute is the name of column stored in the actual database
  // Label is the name of the pie chart
  const pieChartLabels = [
    { attribute: 'gender', label: 'gender' },
    { attribute: 'age', label: 'age group' },
    { attribute: 'tier', label: 'volunteer tier' },
    { attribute: 'sum', label: 'number of hours' },
  ];

  const getDemographicData = (attribute) => {
    const counter = {};
    allVolunteers.forEach((volunteer) => {
      /* TODO
        Set up age groups
      */
      if (!counter[volunteer[attribute]]) {
        counter[volunteer[attribute]] = 0;
      }
      counter[volunteer[attribute]] += 1;
    });
    return Object.entries(counter).map(([k, v]) => ({
      id: `${k} (${v})`,
      label: k,
      value: v,
      color: 'red',
    }));
  };

  const paramQuery = {
    params: {
      event: event.id,
    },
  };

  // Get all volunteers
  const getAllVolunteers = async () => {
    const volunteers = await instance.get('volunteerData/all/', paramQuery);
    const volunteersWithAge = volunteers.data.map((volunteer) => ({
      ...volunteer,
      age: moment(new Date()).diff(volunteer.birthdate, 'years'), // Get volunteer age from birthdate
    }));
    setAllVolunteers(volunteersWithAge);
  };

  // Get all volunteers on page load
  useEffect(() => {
    getAllVolunteers();
  }, []);

  const handleLeftArrowClick = () => {
    if (startDisplayIndex > 0) {
      setStartDisplayIndex(startDisplayIndex - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (startDisplayIndex < pieChartLabels.length - 3) {
      setStartDisplayIndex(startDisplayIndex + 1);
    }
  };

  const DemoGraphicsLeftArrow = () => (
    <button type="button" onClick={handleLeftArrowClick} className={startDisplayIndex > 0 ? 'left-arrow' : 'left-arrow-nonfunctional'}>
      <img src={leftArrow} alt="left-arrow" className="arrow-img" />
    </button>
  );

  const DemographicsRightArrow = () => (
    <button type="button" onClick={handleRightArrowClick} className={startDisplayIndex < pieChartLabels.length - 3 ? 'right-arrow' : 'right-arrow-nonfunctional'}>
      <img src={rightArrow} alt="right-arrow" className="arrow-img" />
    </button>
  );

  return (
    <div className="demographics">
      <h2 className="demographics-title">Demographics</h2>
      <div className="pie-charts">
        <DemoGraphicsLeftArrow />
        {pieChartLabels.slice(startDisplayIndex, startDisplayIndex + 3)
          .map(({ attribute, label }) => (
            <div className="chart-and-label">
              <PieChart
                demoInfo={getDemographicData(attribute)}
                label={label}
                className={attribute}
              />
              <span className="chart-label">{label}</span>
            </div>
          ))}
        <DemographicsRightArrow />
      </div>
    </div>
  );
};

Demographics.propTypes = {
  event: PropTypes.string.isRequired,
};

export default Demographics;
