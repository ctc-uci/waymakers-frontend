import { React, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import moment from 'moment';
import Datetime from 'react-datetime';

import useMobileWidth from '../../../../common/useMobileWidth';
import TitledCard from '../../../../common/Card/TitledCard';
import PendingHoursDesktop from './pendingHoursDesktop';
import PendingHoursMobile from './pendingHoursMobile';
import '../unsubmittedHours/unsubmittedDesktopTable.css';

const PendingHours = () => {
  const isMobile = useMobileWidth();
  // subject to change based on filtering
  const [filteredPendingHours, setFilteredPendingHours] = useState(null);

  // contains all unsubmitted hours from db
  // NOT subject to change based on filtering
  const [allPendingHours, setAllPendingHours] = useState(null);

  // used to display selected date and pass it to sortHours
  const [selectedDate, setSelectedDate] = useState('');

  // method to sort hours
  // filter allUnsubmittedHours based on month and year
  const sortHours = (month, year) => {
    // get index for month, number version of year
    const monthIndex = moment().month(month).format('M') - 1;
    const yearIndex = Number(moment().year(year).format('YYYY'));

    const sorted = allPendingHours.filter((s) => {
      const d = new Date(s.startTime);
      return (d.getMonth() === monthIndex && d.getFullYear() === yearIndex);
    });

    // update unsubmittedHours to reflect filtered results
    setFilteredPendingHours(sorted);
  };

  // updates selectedDate
  // passes selected date month & year to sortHours()
  const handleSelectedDate = (date) => {
    setSelectedDate(date);
    sortHours(date.format('MMMM'), date.format('YYYY'));
  };

  const [cookies] = useCookies(['userId']);

  const getPendingHours = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/logs/pending`,
        {
          params: { userId: cookies.userId },
          withCredentials: true,
        },
      );
      setFilteredPendingHours(response.data);
      setAllPendingHours(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPendingHours();
  }, []);

  if (filteredPendingHours === null) {
    return (
      <TitledCard title="Pending Hours">
        <Datetime
          onChange={(date) => handleSelectedDate(date)}
          value={selectedDate}
          closeOnSelect
          timeFormat={false}
          inputProps={{ className: 'date-picker', placeholder: 'Select Date Filter' }}
        />
        <p className="medium">Loading...</p>
      </TitledCard>
    );
  }

  if (filteredPendingHours && filteredPendingHours.length === 0) {
    return (
      <TitledCard title="Pending Hours">
        <Datetime
          onChange={(date) => handleSelectedDate(date)}
          value={selectedDate}
          closeOnSelect
          timeFormat={false}
          inputProps={{ className: 'date-picker', placeholder: 'Select Date Filter' }}
        />
        <p className="medium">There are no pending hours.</p>
      </TitledCard>
    );
  }

  return (
    <TitledCard title="Pending Hours">
      <Datetime
        onChange={(date) => handleSelectedDate(date)}
        value={selectedDate}
        closeOnSelect
        timeFormat={false}
        inputProps={{ className: 'date-picker', placeholder: 'Select Date Filter' }}
      />
      {isMobile
        ? (
          <PendingHoursMobile
            filteredPendingHours={filteredPendingHours}
          />
        )
        : (
          <PendingHoursDesktop
            filteredPendingHours={filteredPendingHours}
          />
        )}
    </TitledCard>
  );
};

export default PendingHours;
