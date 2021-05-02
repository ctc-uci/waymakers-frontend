import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { TitledCard } from '../../../../../common/Card';
import { WMKBackend } from '../../../../../common/utils';

import PieChart from './pie-chart/PieChart';

import leftArrow from '../../../../../assets/pieChartLeftArrow.svg';
import rightArrow from '../../../../../assets/pieChartRightArrow.svg';

import './demographics.css';

const Demographics = ({ eventId }) => {
  // Get information for all volunteers
  const [allVolunteers, setAllVolunteers] = useState([]);
  // Determines which 3 pie charts we display
  const [startDisplayIndex, setStartDisplayIndex] = useState(0);
  // List of pie chart attributes/labels which helps us map pie charts
  // Attribute is the name of column stored in the actual database
  // Label is the name of the pie chart
  const pieChartLabels = [
    { attribute: 'gender', label: 'Gender' },
    { attribute: 'age', label: 'Age Range' },
    { attribute: 'tier', label: 'Volunteer Tier' },
    { attribute: 'sum', label: 'Number of Hours' },
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

  // Get all volunteers
  const getAllVolunteers = async () => {
    const volunteers = await WMKBackend.get('/volunteerData/all/', {
      params: {
        event: eventId,
      },
    });
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
    <TitledCard title="Demographics" className="demographic-card-container" cardClassName="demographic-card">
      <DemoGraphicsLeftArrow />
      <div className="pie-charts">
        {pieChartLabels.slice(startDisplayIndex, startDisplayIndex + 3)
          .map(({ attribute, label }) => (
            <div className="pie-chart-and-label" key={attribute}>
              <PieChart
                demoInfo={getDemographicData(attribute)}
                label={label}
              />
              <p className="medium">{label}</p>
            </div>
          ))}
      </div>
      <DemographicsRightArrow />
    </TitledCard>
  );
};

Demographics.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default Demographics;
