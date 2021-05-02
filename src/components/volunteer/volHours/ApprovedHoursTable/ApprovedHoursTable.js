import React from 'react';
import useMobileWidth from '../../../../common/useMobileWidth';

import ApprovedHoursTableDesktop from './ApprovedHoursTableDesktop';
import ApprovedHoursTableMobile from './ApprovedHoursTableMobile';
import useAllApprovedHours from './useApprovedHours';
import {
  TitledCard,
} from '../../../../common/Card';
import DateTimeFilter from '../DateTimeFilter';
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
        <DateTimeFilter
          filteredDate={filteredDate}
          setFilteredDate={setFilteredDate}
        />
        <p className="medium">Loading...</p>
      </TitledCard>
    );
  }

  if (filteredApprovedHours && filteredApprovedHours.length === 0) {
    return (
      <TitledCard title="Approved Hours">
        <DateTimeFilter
          filteredDate={filteredDate}
          setFilteredDate={setFilteredDate}
        />
        <p className="medium">There are no approved hours.</p>
      </TitledCard>
    );
  }

  return (
    <>
      <TitledCard title="Approved Hours">
        <DateTimeFilter
          filteredDate={filteredDate}
          setFilteredDate={setFilteredDate}
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
