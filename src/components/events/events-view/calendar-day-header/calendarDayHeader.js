import React from 'react';
import PropTypes from 'prop-types';
import * as IconIo from 'react-icons/io';

import './calendarDayHeader.css';

const CalendarDayHeader = ({ goToPrev, goToNext, dayInfo }) => {
  const renderDayHeader = () => {
    const prevButton = () => <button className="cal-btn prev-button cursor-pointer" type="button" onClick={goToPrev} aria-label="previous"><IconIo.IoIosArrowBack size={20} /></button>;
    const nextButton = () => <button className="cal-btn next-button cursor-pointer" type="button" onClick={goToNext} aria-label="next"><IconIo.IoIosArrowForward size={20} /></button>;
    const currentDay = dayInfo.text.substring(0, 3);

    if (dayInfo.view.type === 'timeGridWeek') {
      return (
        <div className="week-header">
          {currentDay === 'Sun' && prevButton()}
          <div className="week-day-header-content">
            <p id="header-date">{dayInfo.date.getDate()}</p>
            <p id="header-day">{new Date(dayInfo.date).toLocaleString('en-us', { weekday: 'short' })}</p>
          </div>
          {currentDay === 'Sat' && nextButton()}
        </div>
      );
    }
    if (dayInfo.view.type === 'dayGridMonth') {
      return (
        <div className="month-header">
          {currentDay === 'Sun' && prevButton()}
          <p>{dayInfo.text}</p>
          {currentDay === 'Sat' && nextButton()}
        </div>
      );
    }
    // timeGridDay view
    // TODO: Update this once we get the event list component
    return (
      <div className="day-header">
        {prevButton()}
        <p>{dayInfo.text}</p>
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
};

export default CalendarDayHeader;
