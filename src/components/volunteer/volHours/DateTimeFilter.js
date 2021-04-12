import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import styles from 'react-datetime/css/react-datetime.css';
import './DateTimeFilter.css';

const DateTimeFilter = ({ filteredDate, setFilteredDate }) => (
  <Datetime
    className="DateTimeFilter"
    onChange={(date) => setFilteredDate(date)}
    value={filteredDate}
    closeOnSelect
    timeFormat={false}
    dateFormat="MMMM YYYY"
    inputProps={{ className: styles.rdt, placeholder: 'Select Date Filter', readOnly: true }}
  />
);

DateTimeFilter.propTypes = {
  filteredDate: PropTypes.string.isRequired,
  setFilteredDate: PropTypes.func.isRequired,
};

export default DateTimeFilter;
