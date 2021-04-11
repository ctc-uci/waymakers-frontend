import { React, useState } from 'react';
import moment from 'moment';
import Datetime from 'react-datetime';
import useMobileWidth from '../../../../common/useMobileWidth';

import ApprovedHoursTableDesktop from './ApprovedHoursTableDesktop';
import ApprovedHoursTableMobile from './ApprovedHoursTableMobile';
import useAllApprovedHours from './useApprovedHours';
import {
  TitledCard,
} from '../../../../common/Card';
import '../unsubmittedHours/unsubmittedDesktopTable.css';

const ApprovedHoursTable = () => {
  const isMobile = useMobileWidth();
  // NOT subject to change based on filtering
  const [allApprovedHours] = useAllApprovedHours();

  // subject to change based on filtering
  // ISSUE: only setting the state when date is selected
  const [filteredApprovedHours, setFilteredApprovedHours] = useState(allApprovedHours);

  // used to display selected date and pass it to sortHours
  const [selectedDate, setSelectedDate] = useState('');

  // method to sort hours
  // filter allUnsubmittedHours based on month and year
  const sortHours = (month, year) => {
    // get index for month, number version of year
    const monthIndex = moment().month(month).format('M') - 1;
    const yearIndex = Number(moment().year(year).format('YYYY'));

    const sorted = allApprovedHours.filter((s) => {
      const d = new Date(s.startTime);
      return (d.getMonth() === monthIndex && d.getFullYear() === yearIndex);
    });

    // update filteredApprovedHours to reflect filtered results
    setFilteredApprovedHours(sorted);
  };

  // updates selectedDate
  // passes selected date month & year to sortHours()
  const handleSelectedDate = (date) => {
    setSelectedDate(date);
    sortHours(date.format('MMMM'), date.format('YYYY'));
  };

  if (filteredApprovedHours === null) {
    return (
      <TitledCard title="Approved Hours">
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

  if (filteredApprovedHours && filteredApprovedHours.length === 0) {
    return (
      <TitledCard title="Approved Hours">
        <Datetime
          onChange={(date) => handleSelectedDate(date)}
          value={selectedDate}
          closeOnSelect
          timeFormat={false}
          inputProps={{ className: 'date-picker', placeholder: 'Select Date Filter' }}
        />
        <p className="medium">There are no approved hours.</p>
      </TitledCard>
    );
  }

  return (
    <>
      <TitledCard title="Approved Hours">
        <Datetime
          onChange={(date) => handleSelectedDate(date)}
          value={selectedDate}
          closeOnSelect
          timeFormat={false}
          inputProps={{ className: 'date-picker', placeholder: 'Select Date Filter' }}
        />
        {isMobile
          ? (
            <ApprovedHoursTableMobile
              filteredApprovedHours={filteredApprovedHours}
              sortHours={sortHours}
            />
          )
          : (
            <ApprovedHoursTableDesktop
              filteredApprovedHours={filteredApprovedHours}
              sortHours={sortHours}
            />
          ) }
      </TitledCard>
    </>
  );
};

export default ApprovedHoursTable;
