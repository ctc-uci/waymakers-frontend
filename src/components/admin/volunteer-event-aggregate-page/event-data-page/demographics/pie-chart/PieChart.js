import React from 'react';
import { PieChart, Pie } from 'recharts';
import PropTypes from 'prop-types';

import '../../../../../../common/vars.css';
import './PieChart.css';

const colors = ['red', '#8884d8', '#82ca9d'];

const GenericPieChart = ({ demoInfo, label }) => {
  console.log(demoInfo);
  return (
    <div className="pie-chart-and-label">
      <PieChart width={400} height={400} className="chart">
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={demoInfo.map((d, index) => (
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
                fill="var(--text-color-blue-gray)"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
              >
                {demoInfo[index].name}
                (
                {value}
                )
              </text>
            );
          }}
        />
      </PieChart>
      <p className="chart-label">{label}</p>
    </div>
  );
};

GenericPieChart.propTypes = {
  demoInfo: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
  label: PropTypes.string.isRequired,
};

export default GenericPieChart;
