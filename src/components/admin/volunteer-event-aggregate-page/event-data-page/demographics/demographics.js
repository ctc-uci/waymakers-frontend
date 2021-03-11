import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import PropTypes from 'prop-types';

const axios = require('axios');

const Demographics = ({ event }) => {
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/`,
    withCredentials: true,
  });

  const [allVolunteers, setAllVolunteers] = useState([]);

  const getDemographicData = ({ attribute }) => {
    const counter = {};
    allVolunteers.forEach((volunteer) => {
      if (!counter[volunteer[attribute]]) {
        counter[volunteer[attribute]] = 0;
      }
      counter[volunteer.attribute] += 1;
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
    getDemographicData('gender');
  }, []);

  const data = [{ name: 'Facebook', value: 69 }, { name: 'Joe', value: 138 }, { name: 'Ted', value: 78 }];
  const colors = ['red', '#8884d8', '#82ca9d'];

  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data.map((d, index) => (
          {
            ...d,
            fill: colors[index],
          }
        ))}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label={({
          cx,
          cy,
          midAngle,
          innerRadius,
          outerRadius,
          value,
          index,
        }) => {
          const RADIAN = Math.PI / 180;
          // eslint-disable-next-line
          const radius = 25 + innerRadius + (outerRadius - innerRadius);
          // eslint-disable-next-line
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          // eslint-disable-next-line
          const y = cy + radius * Math.sin(-midAngle * RADIAN);
          return (
            <text
              x={x}
              y={y}
              fill={colors[index]}
              textAnchor={x > cx ? 'start' : 'end'}
              dominantBaseline="central"
            >
              {data[index].name}
              (
              {value}
              )
            </text>
          );
        }}
      />
      <Tooltip />
    </PieChart>
  );
};

Demographics.propTypes = {
  event: PropTypes.string.isRequired,
};

export default Demographics;
