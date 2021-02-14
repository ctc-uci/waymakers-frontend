import React from 'react';
import PropTypes from 'prop-types';
import { YearPicker, MonthPicker } from 'react-dropdown-date';

import DayPicker from './daypicker';
import './calendarFilters.css';

const CalendarFilters = ({
  month, year, setView, setDay, setMonth, setYear,
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
          year={year}
          value={month - 1}
          onChange={(newMonth) => {
            if (newMonth !== '') {
              setMonth(parseInt(newMonth, 10) + 1);
            }
          }}
          id="month"
          name="month"
        />
        <DayPicker month={month} year={year} onDayChange={(newDay) => setDay(newDay)} />
        <YearPicker
          defaultValue="Select Year"
          start={getCurrentYear() - 2}
          end={getCurrentYear() + 10}
          value={year}
          onChange={(newYear) => {
            if (newYear !== '') {
              setYear(newYear);
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
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  setView: PropTypes.func.isRequired,
  setDay: PropTypes.func.isRequired,
  setMonth: PropTypes.func.isRequired,
  setYear: PropTypes.func.isRequired,
};

export default CalendarFilters;
