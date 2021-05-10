import React from 'react';

import useMobileWidth from '../../../../common/useMobileWidth';
import usePaginationController from '../../../../common/usePaginationController';
import {
  TitledCard,
} from '../../../../common/Card';
import PaginationController from '../../../../common/PaginationController/PaginationController';

import SubmittedHoursTableDesktop from './SubmittedHoursTableDesktop';
import SubmittedHoursTableMobile from './SubmittedHoursTableMobile';
import useAllSubmittedHours from './useSubmittedHours';
import useFilteredHours from '../useFilteredHours';
import DateTimeFilter from '../DateTimeFilter';

const SubmittedHoursTable = () => {
  const isMobile = useMobileWidth();
  // NOT subject to change based on filtering
  const [allSubmittedHours] = useAllSubmittedHours();
  // Filtered submitted hours and filter interface
  const [
    filteredSubmittedHours, filteredDate, setFilteredDate,
  ] = useFilteredHours(allSubmittedHours);
  // Paginated Filtered submitted hours and filter interface
  const [
    paginatedData, paginatedIndex, setPaginatedIndex, totalNumberOfPages,
  ] = usePaginationController(filteredSubmittedHours);

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
              filteredSubmittedHours={paginatedData}
            />
          )
          : (
            <SubmittedHoursTableDesktop
              filteredSubmittedHours={paginatedData}
            />
          ) }
        <PaginationController
          paginatedIndex={paginatedIndex}
          setPaginatedIndex={setPaginatedIndex}
          totalNumberOfPages={totalNumberOfPages}
        />
      </TitledCard>
    </>
  );
};

export default SubmittedHoursTable;
