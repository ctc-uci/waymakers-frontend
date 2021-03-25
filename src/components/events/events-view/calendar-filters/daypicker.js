import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  getMonth,
  getYear,
  getDay,
} from '../../redux/selectors';

import { changeDay } from '../../redux/actions';

const DayPicker = ({ day, month, year }) => {
  const dispatch = useDispatch();
  const onDayChange = (newDay) => {
    if (newDay !== '') {
      dispatch(changeDay(newDay));
    }
  };

  const createOptionTags = () => {
    const eventDate = moment().date(day).month(month - 1).year(year);
    const numDays = eventDate.daysInMonth();

    const dayOptionTags = [];
    for (let i = 1; i <= numDays; i += 1) {
      dayOptionTags.push(<option className="picker" value={i} selected={i === day}>{i}</option>);
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
