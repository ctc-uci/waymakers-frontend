import React from 'react';
import PropTypes from 'prop-types';

const DayPicker = ({ month, year, onDayChange }) => {
  const getFebDays = () => {
    if (year % 4 === 0) {
      if (year % 100 === 0 && year % 400 !== 0) {
        return 28;
      }
      return 29;
    }
    return 28;
  };

  const mapMonthToDays = {
    1: 31,
    2: getFebDays(),
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 31,
    12: 30,
  };

  const createOptionTags = () => {
    const numDays = mapMonthToDays[month];
    const dayOptionTags = [];
    for (let i = 1; i <= numDays; i += 1) {
      dayOptionTags.push(<option className="picker" value={i}>{i}</option>);
    }
    return dayOptionTags;
  };

  return (
    <select className="picker" onChange={(e) => onDayChange(parseInt(e.target.value, 10))}>
      {createOptionTags()}
    </select>
  );
};

DayPicker.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  onDayChange: PropTypes.func.isRequired,
};

export default DayPicker;
