import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getMonth,
  getYear,
  getDay,
} from '../../redux/selectors';

import store from '../../redux/store';
import { changeDay } from '../../redux/actions';

const DayPicker = (props) => {
  const getFebDays = () => {
    if (props.year % 4 === 0) {
      if (props.year % 100 === 0 && props.year % 400 !== 0) {
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

  const onDayChange = (newDay) => {
    if (newDay !== '') {
      store.dispatch(changeDay(newDay));
    }
  };

  const createOptionTags = () => {
    const numDays = mapMonthToDays[props.month];
    const dayOptionTags = [];
    for (let i = 1; i <= numDays; i += 1) {
      dayOptionTags.push(<option className="picker" value={i} selected={i === props.day}>{i}</option>);
    }
    return dayOptionTags;
  };

  return (
    <select className="picker" onChange={(e) => onDayChange(parseInt(e.target.value, 10))}>
      {createOptionTags()}
    </select>
  );
};

const mapStateToProps = (state) => ({
  month: getMonth(state),
  year: getYear(state),
  day: getDay(state),
});

DayPicker.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(DayPicker);
