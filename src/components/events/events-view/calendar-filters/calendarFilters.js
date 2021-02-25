import React from 'react';
import { YearPicker, MonthPicker } from 'react-dropdown-date';
import { useSelector } from 'react-redux';

import DayPicker from './daypicker';
import './calendarFilters.css';

import store from '../../redux/store';
import { changeMonth, changeYear, changeView } from '../../redux/actions';

import {
  getMonth,
  getYear,
} from '../../redux/selectors';

const CalendarFilters = () => {
  const getCurrentYear = () => new Date().getFullYear();
  const setView = (newView) => {
    store.dispatch(changeView(newView));
  };
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

export default CalendarFilters;
