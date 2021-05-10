import React from 'react';
// import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { AutoSizer } from 'react-virtualized';
import { Pie } from '@nivo/pie';
import PropTypes from 'prop-types';

import '../../../../../../common/vars.css';
import './PieChart.css';

const colors = [
  'var(--color-green)',
  'var(--color-yellow)',
  'var(--color-dark-blue)',
  'var(--color-cyan)',
  'var(--color-light-pink)',
  'var(--color-orange)',
  'var(--color-olive)',
  'var(--color-light-purple)',
];

const PieChart = ({ demoInfo }) => (
  // NOTE: There are 3 solutions to labels overlapping (might be more if you look hard enough):
  // 1. Increase the left/right margins
  // 2. Decrease the font size
  // 3. Decrease radialLabelsLinkHorizontalLength
  <div className="pie-chart">
    <AutoSizer>
      {({ height, width }) => (
        <>
          <Pie
            data={demoInfo}
            width={width}
            height={height}
            margin={{
              top: 20,
              right: 50,
              bottom: 20,
              left: 50,
            }}
            innerRadius={0}
            colors={colors}
            borderWidth={0}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            radialLabelsLinkDiagonalLength={8}
            radialLabelsLinkHorizontalLength={5}
            radialLabelsSkipAngle={0}
            radialLabelsTextColor="var(--text-color-blue-gray)"
            radialLabelsLinkColor="#000"
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor={{ from: 'color' }}
            theme={{
              fontSize: 11,
            }}
          />
        </>
      )}
    </AutoSizer>
  </div>
);

PieChart.propTypes = {
  demoInfo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  })).isRequired,
};

export default PieChart;
