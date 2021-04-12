import React from 'react';
import useMobileWidth from '../../../../common/useMobileWidth';

import RejectedHoursTableDesktop from './RejectedHoursTableDesktop';
import RejectedHoursTableMobile from './RejectedHoursTableMobile';
import useRejectedHours from './useRejectedHours';
import {
  TitledCard,
} from '../../../../common/Card';
import UseFilteredHours from '../useFilteredHours';
import DateTimeFilter from '../DateTimeFilter';

const ApprovedHoursTable = () => {
  const isMobile = useMobileWidth();
  const [rejectedHours] = useRejectedHours();
  const [filteredRejectedHours, filteredDate, setFilteredDate] = UseFilteredHours(rejectedHours);

  if (filteredRejectedHours === null) {
    return (
      <TitledCard title="Rejected Hours">
        <DateTimeFilter
          filteredDate={filteredDate}
          setFilteredDate={setFilteredDate}
        />
        <p className="medium">Loading...</p>
      </TitledCard>
    );
  }

  if (filteredRejectedHours && filteredRejectedHours.length === 0) {
    return (
      <TitledCard title="Rejected Hours">
        <DateTimeFilter
          filteredDate={filteredDate}
          setFilteredDate={setFilteredDate}
        />
        <p className="medium">There are no rejected hours.</p>
      </TitledCard>
    );
  }

  return (
    <TitledCard title="Rejected Hours">
      <DateTimeFilter
        filteredDate={filteredDate}
        setFilteredDate={setFilteredDate}
      />
      {isMobile
        ? <RejectedHoursTableMobile rejectedHours={filteredRejectedHours} />
        : <RejectedHoursTableDesktop rejectedHours={filteredRejectedHours} /> }
    </TitledCard>
  );
};

export default ApprovedHoursTable;
