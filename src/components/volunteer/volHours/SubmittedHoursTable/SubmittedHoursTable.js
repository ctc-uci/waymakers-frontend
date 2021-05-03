import React from 'react';
import useMobileWidth from '../../../../common/useMobileWidth';

import SubmittedHoursTableDesktop from './SubmittedHoursTableDesktop';
import SubmittedHoursTableMobile from './SubmittedHoursTableMobile';
import useAllSubmittedHours from './useSubmittedHours';
import {
  TitledCard,
} from '../../../../common/Card';
import DateTimeFilter from '../DateTimeFilter';
import UseFilteredHours from '../useFilteredHours';

const SubmittedHoursTable = () => {
  const isMobile = useMobileWidth();
  // NOT subject to change based on filtering
  const [allSubmittedHours] = useAllSubmittedHours();
  // Filtered submitted hours and filter interface
  const [
    filteredSubmittedHours, filteredDate, setFilteredDate,
  ] = UseFilteredHours(allSubmittedHours);

  if (filteredSubmittedHours === null) {
    return (
      <TitledCard title="Submitted Hours">
        <DateTimeFilter
          filteredDate={filteredDate}
          setFilteredDate={setFilteredDate}
        />
        <p className="medium">Loading...</p>
      </TitledCard>
    );
  }

  if (filteredSubmittedHours && filteredSubmittedHours.length === 0) {
    return (
      <TitledCard title="Submitted Hours">
        <DateTimeFilter
          filteredDate={filteredDate}
          setFilteredDate={setFilteredDate}
        />
        <p className="medium">There are no submitted hours.</p>
      </TitledCard>
    );
  }

  return (
    <>
      <TitledCard title="Submitted Hours">
        <DateTimeFilter
          filteredDate={filteredDate}
          setFilteredDate={setFilteredDate}
        />
        {isMobile
          ? (
            <SubmittedHoursTableMobile
              filteredSubmittedHours={filteredSubmittedHours}
            />
          )
          : (
            <SubmittedHoursTableDesktop
              filteredSubmittedHours={filteredSubmittedHours}
            />
          ) }
      </TitledCard>
    </>
  );
};

export default SubmittedHoursTable;
