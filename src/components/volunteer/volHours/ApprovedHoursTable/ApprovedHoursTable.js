import React from 'react';
import Datetime from 'react-datetime';
import styles from 'react-datetime/css/react-datetime.css';
import useMobileWidth from '../../../../common/useMobileWidth';

import ApprovedHoursTableDesktop from './ApprovedHoursTableDesktop';
import ApprovedHoursTableMobile from './ApprovedHoursTableMobile';
import useAllApprovedHours from './useApprovedHours';
import {
  TitledCard,
} from '../../../../common/Card';
import '../hours.css';
import UseFilteredHours from '../useFilteredHours';

const ApprovedHoursTable = () => {
  const isMobile = useMobileWidth();
  // NOT subject to change based on filtering
  const [allApprovedHours] = useAllApprovedHours();
  // Filtered approved hours and filter interface
  const [filteredApprovedHours, filteredDate, setFilteredDate] = UseFilteredHours(allApprovedHours);

  if (filteredApprovedHours === null) {
    return (
      <TitledCard title="Approved Hours">
        <Datetime
          onChange={(date) => setFilteredDate(date)}
          value={filteredDate}
          closeOnSelect
          timeFormat={false}
          dateFormat="MMMM YYYY"
          inputProps={{ className: styles.rdt, placeholder: 'Select Date Filter' }}
        />
        <p className="medium">Loading...</p>
      </TitledCard>
    );
  }

  if (filteredApprovedHours && filteredApprovedHours.length === 0) {
    return (
      <TitledCard title="Approved Hours">
        <Datetime
          onChange={(date) => setFilteredDate(date)}
          value={filteredDate}
          closeOnSelect
          timeFormat={false}
          dateFormat="MMMM YYYY"
          inputProps={{ className: styles.rdt, placeholder: 'Select Date Filter' }}
        />
        <p className="medium">There are no approved hours.</p>
      </TitledCard>
    );
  }

  return (
    <>
      <TitledCard title="Approved Hours">
        <Datetime
          onChange={(date) => setFilteredDate(date)}
          value={filteredDate}
          closeOnSelect
          timeFormat={false}
          dateFormat="MMMM YYYY"
          inputProps={{ className: styles.rdt, placeholder: 'Select Date Filter' }}
        />
        {isMobile
          ? (
            <ApprovedHoursTableMobile
              filteredApprovedHours={filteredApprovedHours}
            />
          )
          : (
            <ApprovedHoursTableDesktop
              filteredApprovedHours={filteredApprovedHours}
            />
          ) }
      </TitledCard>
    </>
  );
};

export default ApprovedHoursTable;
