import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import Datetime from 'react-datetime';
import { TitledCard } from '../../../../common/Card';

import useMobileWidth from '../../../../common/useMobileWidth';
import UnsubmittedDesktopTable from './unsubmittedDesktopTable';
import UnsubmittedMobileTable from './unsubmittedMobileTable';
import './unsubmittedDesktopTable.css';

const UnsubmittedHours = () => {
  const isMobile = useMobileWidth();
  // subject to change based on filtering
  const [filteredUnsubmittedHours, setFilteredUnsubmittedHours] = useState(null);
  // contains all unsubmitted hours from db
  // NOT subject to change based on filtering
  const [allUnsubmittedHours, setAllUnsubmittedHours] = useState(null);

  // used to display selected date and pass it to sortHours
  const [selectedDate, setSelectedDate] = useState('');

  // method to sort hours
  // filter allUnsubmittedHours based on month and year
  const sortHours = (month, year) => {
    // get index for month, number version of year
    const monthIndex = moment().month(month).format('M') - 1;
    const yearIndex = Number(moment().year(year).format('YYYY'));

    const sorted = allUnsubmittedHours.filter((s) => {
      const d = new Date(s.startTime);
      return (d.getMonth() === monthIndex && d.getFullYear() === yearIndex);
    });

    // update unsubmittedHours to reflect filtered results
    setFilteredUnsubmittedHours(sorted);
  };

  // updates selectedDate
  // passes selected date month & year to sortHours()
  const handleSelectedDate = (date) => {
    setSelectedDate(date);
    sortHours(date.format('MMMM'), date.format('YYYY'));
  };

  const [cookies] = useCookies(['userId']);
  useEffect(() => {
    axios.get(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/logs/unsubmitted`, {
        params: { userId: cookies.userId },
        withCredentials: true,
      },
    ).then((res) => {
      setFilteredUnsubmittedHours(res.data);
      setAllUnsubmittedHours(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  if (filteredUnsubmittedHours === null) {
    return (
      <TitledCard title="Unsubmitted Hours">
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

  if (filteredUnsubmittedHours && filteredUnsubmittedHours.length === 0) {
    return (
      <TitledCard title="Unsubmitted Hours">
        <Datetime
          onChange={(date) => handleSelectedDate(date)}
          value={selectedDate}
          closeOnSelect
          timeFormat={false}
          inputProps={{ className: 'date-picker', placeholder: 'Select Date Filter' }}
        />
        <p className="medium">There are no unsubmitted hours.</p>
      </TitledCard>
    );
  }

  return (
    <>
      <TitledCard title="Unsubmitted Hours">
        <Datetime
          onChange={(date) => handleSelectedDate(date)}
          value={selectedDate}
          closeOnSelect
          timeFormat={false}
          inputProps={{ className: 'date-picker', placeholder: 'Select Date Filter' }}
        />
        {isMobile
          ? (
            <UnsubmittedMobileTable
              filteredUnsubmittedHours={filteredUnsubmittedHours}
            />
          )
          : (
            <UnsubmittedDesktopTable
              filteredUnsubmittedHours={filteredUnsubmittedHours}
            />
          )}
      </TitledCard>
    </>
  );
};

export default UnsubmittedHours;
