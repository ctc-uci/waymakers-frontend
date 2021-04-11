import React from 'react';
import Datetime from 'react-datetime';
import useMobileWidth from '../../../../common/useMobileWidth';

import ApprovedHoursTableDesktop from './ApprovedHoursTableDesktop';
import ApprovedHoursTableMobile from './ApprovedHoursTableMobile';
import useApprovedHours from './useApprovedHours';
import useFilteredHours from '../useFilteredHours';

import {
  TitledCard,
} from '../../../../common/Card';
import '../unsubmittedHours/unsubmittedDesktopTable.css';

const ApprovedHoursTable = () => {
  const isMobile = useMobileWidth();
  const [approvedHours] = useApprovedHours();
  const [
    filteredApprovedHours,
    dateFilter,
    setDateFilter,
  ] = useFilteredHours(approvedHours);

  if (filteredApprovedHours === null) {
    return (
      <TitledCard title="Approved Hours">
        <Datetime
          onChange={(date) => setDateFilter(date)}
          value={dateFilter}
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
          onChange={(date) => setDateFilter(date)}
          value={dateFilter}
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
          onChange={(date) => setDateFilter(date)}
          value={dateFilter}
          closeOnSelect
          timeFormat={false}
          inputProps={{ className: 'date-picker', placeholder: 'Select Date Filter', readOnly: true }}
        />
        {isMobile
          ? <ApprovedHoursTableMobile filteredApprovedHours={filteredApprovedHours} />
          : <ApprovedHoursTableDesktop filteredApprovedHours={filteredApprovedHours} />}
      </TitledCard>
    </>
  );
};

export default ApprovedHoursTable;
