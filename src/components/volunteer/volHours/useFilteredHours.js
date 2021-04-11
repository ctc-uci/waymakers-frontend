import { useState, useEffect } from 'react';
import moment from 'moment';

// Provides a filtered list of approved hours and filter interface
// Filter interface expects a moment object
// Filters data by month and year
const useFilteredHours = (hours) => {
  const [filteredHours, setFilteredHours] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);

  useEffect(() => {
    if (dateFilter) {
      const month = dateFilter.format('MMMM');
      const year = dateFilter.format('YYYY');
      const monthIndex = moment().month(month).format('M') - 1;
      const yearIndex = Number(moment().year(year).format('YYYY'));

      const sorted = hours.filter((s) => {
        const d = new Date(s.startTime);
        return (d.getMonth() === monthIndex && d.getFullYear() === yearIndex);
      });

      setFilteredHours(sorted);
    } else {
      setFilteredHours(hours);
    }
  }, [hours, dateFilter]);

  return [filteredHours, dateFilter, setDateFilter];
};

export default useFilteredHours;
