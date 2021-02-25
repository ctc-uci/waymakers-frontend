import React from 'react';
import PropTypes from 'prop-types';
import { YearPicker, MonthPicker } from 'react-dropdown-date';
import { useSelector } from 'react-redux';

import DayPicker from './daypicker';
import './calendarFilters.css';

import store from '../../redux/store';
import { changeMonth, changeYear } from '../../redux/actions';

import {
  getMonth,
  getYear,
} from '../../redux/selectors';

const CalendarFilters = ({
  setView,
}) => {
  const getCurrentYear = () => new Date().getFullYear();
  return (
    <div>
      <div id="event-date-picker">
        <select className="picker view-picker" name="views" id="views" onChange={(e) => { setView(e.target.value); }}>
          <option className="picker view-picker" value="timeGridDay">Day View</option>
          <option className="picker view-picker" value="timeGridWeek">Week View</option>
          <option className="picker view-picker" value="dayGridMonth" selected="selected">Month View</option>
        </select>
        <MonthPicker
          defaultValue="Select Month"
          endYearGiven
          year={useSelector(getYear)}
          value={useSelector(getMonth) - 1}
          onChange={(newMonth) => {
            if (newMonth !== '') {
              store.dispatch(changeMonth(parseInt(newMonth, 10) + 1));
            }
          }}
          id="month"
          name="month"
        />
        <DayPicker />
        <YearPicker
          defaultValue="Select Year"
          start={getCurrentYear() - 2}
          end={getCurrentYear() + 10}
          value={useSelector(getYear)}
          onChange={(newYear) => {
            if (newYear !== '') {
              store.dispatch(changeYear(newYear));
            }
          }}
          id="year"
          name="year"
        />
      </div>
    </div>
  );
};

CalendarFilters.propTypes = {
  setView: PropTypes.func.isRequired,
};

export default CalendarFilters;
