import { useState, useEffect } from 'react';
import moment from 'moment';

// Provides filtered list of hours and filter interface
// Filter interface expects a moment object
// Filters data by month and year
const useFilteredHours = (hours) => {
  const [filteredHours, setFilteredHours] = useState(null);
  const [filteredDate, setFilteredDate] = useState(null);

  useEffect(() => {
    if (filteredDate) {
      const month = filteredDate.format('MMMM');
      const year = filteredDate.format('YYYY');
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
  }, [hours, filteredDate]);

  return [filteredHours, filteredDate, setFilteredDate];
};

export default useFilteredHours;
