import React from 'react';
import PropTypes from 'prop-types';
import * as IconIo from 'react-icons/io';
import moment from 'moment';

import './calendarDayHeader.css';

const CalendarDayHeader = ({
  goToPrev,
  goToNext,
  dayInfo,
  startOfRange,
  endOfRange,
}) => {
  const renderDayHeader = () => {
    const prevButton = () => <button className="day-button prev-button" type="button" onClick={goToPrev} aria-label="previous"><IconIo.IoIosArrowBack size={20} /></button>;
    const nextButton = () => <button className="day-button next-button" type="button" onClick={goToNext} aria-label="next"><IconIo.IoIosArrowForward size={20} /></button>;
    if (dayInfo.view.type === 'timeGridWeek') {
      const currentDay = dayInfo.text.substring(0, 3);
      return (
        <div className="week-header">
          {currentDay === 'Sun' && prevButton()}
          <div className="week-day-header-content">
            <p className="header-date">{dayInfo.date.getDate()}</p>
            <p className="header-day">{new Date(dayInfo.date).toLocaleString('en-us', { weekday: 'short' })}</p>
          </div>
          {currentDay === 'Sat' && nextButton()}
        </div>
      );
    }
    if (dayInfo.view.type === 'timeGridFourDay') {
      const currentDay = moment(dayInfo.date);
      return (
        <div className="week-header">
          {currentDay.isSame(moment(startOfRange)) && prevButton()}
          <div className="week-day-header-content">
            <p className="header-date">{dayInfo.date.getDate()}</p>
            <p className="header-day">{new Date(dayInfo.date).toLocaleString('en-us', { weekday: 'short' })}</p>
          </div>
          {currentDay.isSame(moment(endOfRange)) && nextButton()}
        </div>
      );
    }
    if (dayInfo.view.type === 'dayGridMonth') {
      const currentDay = dayInfo.text.substring(0, 3);
      return (
        <div className="month-header">
          {currentDay === 'Sun' && prevButton()}
          <p>{dayInfo.text}</p>
          {currentDay === 'Sat' && nextButton()}
        </div>
      );
    }
    // timeGridDay view
    return (
      <div className="day-header">
        {prevButton()}
        <p className="day-view-title">{dayInfo.text}</p>
        {nextButton()}
      </div>
    );
  };

  return (
    <div>
      {renderDayHeader()}
    </div>
  );
};

CalendarDayHeader.propTypes = {
  goToPrev: PropTypes.func.isRequired,
  goToNext: PropTypes.func.isRequired,
  dayInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  startOfRange: PropTypes.objectOf(Date),
  endOfRange: PropTypes.objectOf(Date),
};

CalendarDayHeader.defaultProps = {
  startOfRange: new Date(),
  endOfRange: new Date(),
};

export default CalendarDayHeader;
