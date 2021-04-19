import { React, useState } from 'react';
import { YearPicker, MonthPicker } from 'react-dropdown-date';
import { useSelector, useDispatch } from 'react-redux';
import Datetime from 'react-datetime';

import DayPicker from './daypicker';
import './calendarFilters.css';
import useMobileWidth from '../../../../common/useMobileWidth';

import {
  changeMonth,
  changeYear,
  changeView,
  changeDate,
} from '../../redux/actions';

import {
  getDay,
  getMonth,
  getYear,
  getView,
} from '../../redux/selectors';

const ViewFilters = () => {
  const dispatch = useDispatch();
  const setView = (newView) => {
    dispatch(changeView(newView));
  };
  return (
    <select className="picker view-picker" name="views" id="views" onChange={(e) => { setView(e.target.value); }}>
      <option className="picker view-picker" value="timeGridDay" selected={useSelector(getView) === 'timeGridDay' ? 'selected' : ''}>Day View</option>
      <option className="picker view-picker" value="timeGridWeek" selected={useSelector(getView) === 'timeGridWeek' ? 'selected' : ''}>Week View</option>
      <option className="picker view-picker" value="dayGridMonth" selected={useSelector(getView) === 'dayGridMonth' ? 'selected' : ''}>Month View</option>
    </select>
  );
};

const DesktopCalendarFilters = () => {
  const dispatch = useDispatch();
  const getCurrentYear = () => new Date().getFullYear();
  return (
    <div>
      <div id="event-date-picker">
        <ViewFilters />
        <MonthPicker
          defaultValue="Select Month"
          endYearGiven
          year={useSelector(getYear)}
          value={useSelector(getMonth) - 1}
          onChange={(newMonth) => {
            if (newMonth !== '') {
              dispatch(changeMonth(parseInt(newMonth, 10) + 1));
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
              dispatch(changeYear(parseInt(newYear, 10)));
            }
          }}
          id="year"
          name="year"
        />
      </div>
    </div>
  );
};

const MobileCalendarFilters = () => {
  const dispatch = useDispatch();
  const [currentDate] = useState(new Date(
    useSelector(getYear),
    useSelector(getMonth) - 1,
    useSelector(getDay),
  ));

  const changeCurrentDate = (e) => {
    const newDate = new Date(e);
    dispatch(changeDate({
      day: newDate.getDate(),
      month: newDate.getMonth() + 1,
      year: newDate.getFullYear(),
    }));
  };

  return (
    <div className="calendar-filters">
      <ViewFilters />
      <Datetime
        className="DateFilter"
        initialValue={currentDate}
        onChange={(e) => changeCurrentDate(e)}
        timeFormat={false}
        dateFormat="MMMM DD YYYY"
      />
    </div>
  );
};

const CalendarFilters = () => {
  const isMobile = useMobileWidth();
  return (
    <>
      {isMobile
        ? (
          <MobileCalendarFilters />
        )
        : (
          <DesktopCalendarFilters />
        ) }
    </>
  );
};

export default CalendarFilters;
