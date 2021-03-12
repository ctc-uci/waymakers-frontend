import React from 'react';
// import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { ResponsivePie } from '@nivo/pie';
import PropTypes from 'prop-types';

import '../../../../../../common/vars.css';
import './PieChart.css';

// TODO: Implement different color schemes for pie charts
// const colors = ['red', '#8884d8', '#82ca9d'];

const PieChart = ({ demoInfo, label }) => (
  // <div className="pie-chart-and-label">
  //   <ResponsiveContainer width="100%" height="100%">
  //     <PieChart className="chart">
  //       <Pie
  //         dataKey="value"
  //         isAnimationActive={false}
  //         data={demoInfo.map((d, index) => (
  //           {
  //             ...d,
  //             fill: colors[index],
  //           }
  //         ))}
  //         cx="50%" // Position of the pie chart
  //         cy="50%" // Position of the pie chart
  //         outerRadius={80}
  //         label={({
  //           cx,
  //           cy,
  //           midAngle,
  //           innerRadius,
  //           outerRadius,
  //           value,
  //           index,
  //         }) => {
  //           const RADIAN = Math.PI / 180;
  //           // eslint-disable-next-line
  //           const radius = 20 + innerRadius + (outerRadius - innerRadius);
  //           // eslint-disable-next-line
  //           const x = cx + radius * Math.cos(-midAngle * RADIAN);
  //           // eslint-disable-next-line
  //           const y = cy + radius * Math.sin(-midAngle * RADIAN);
  //           return (
  //             <text
  //               className="chart-section-label"
  //               x={x} // Position of the label
  //               y={y} // Position of the label
  //               fontSize="15px"
  //               fill="var(--text-color-blue-gray)"
  //               textAnchor={x > cx ? 'start' : 'end'}
  //               dominantBaseline="middle"
  //             >
  //               {demoInfo[index].name}
  //               (
  //               {value}
  //               )
  //             </text>
  //           );
  //         }}
  //       />
  //     </PieChart>
  //   </ResponsiveContainer>
  //   <p className="chart-label">{label}</p>
  // </div>

  // NOTE: There are 2 solutions to labels overlapping (might be more if you look hard enough):
  // 1. Increase the left/right margins
  // 2. Decrease the font size
  <div className="pie-chart-and-label">
    <ResponsivePie
      data={demoInfo}
      // TODO: Make size responsive?
      // The hard part about this is making sure the labels don't mess up afterwards
      width={350}
      height={350}
      margin={{
        top: 0,
        right: 80,
        bottom: 0,
        left: 80,
      }}
      innerRadius={0}
      padAngle={0.7}
      cornerRadius={0}
      colors={{ scheme: 'nivo' }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextColor="var(--text-color-blue-gray)"
      radialLabelsLinkColor="#000"
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor={{ from: 'color' }}
      theme={{
        fontSize: 12,
      }}
    />
    <p className="chart-label">{label}</p>
  </div>
);

PieChart.propTypes = {
  demoInfo: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
  label: PropTypes.string.isRequired,
};

export default PieChart;
