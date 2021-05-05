import {
  React, useState, useEffect,
} from 'react';
import { useCookies } from 'react-cookie';

import { WMKBackend } from '../../../../common/utils';
import useMobileWidth from '../../../../common/useMobileWidth';
import usePaginationController from '../../../../common/usePaginationController';
import { TitledCard } from '../../../../common/Card';
import PaginationController from '../../../../common/PaginationController/PaginationController';

import UnsubmittedDesktopTable from './unsubmittedDesktopTable';
import UnsubmittedMobileTable from './unsubmittedMobileTable';
import useFilteredHours from '../useFilteredHours';
import DateTimeFilter from '../DateTimeFilter';

const UnsubmittedHours = () => {
  const isMobile = useMobileWidth();
  // NOT subject to change based on filtering
  const [allUnsubmittedHours, setAllUnsubmittedHours] = useState(null);
  // Filtered unsubmitted hours and filter interface
  const [
    filteredUnsubmittedHours, filteredDate, setFilteredDate,
  ] = useFilteredHours(allUnsubmittedHours);
  const [
    paginatedData, paginatedIndex, setPaginatedIndex, totalNumberOfPages,
  ] = usePaginationController(filteredUnsubmittedHours);

  const [cookies] = useCookies(['userId']);

  useEffect(() => {
    WMKBackend.get('/logs/unsubmitted', {
      params: { userId: cookies.userId },
      withCredentials: true,
    }).then((res) => {
      // Set unsubmitted hours to events whose end times have passed
      setAllUnsubmittedHours(res.data.filter((e) => new Date(e.startTime) < new Date()));
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  if (filteredUnsubmittedHours === null) {
    return (
      <TitledCard title="Unsubmitted Hours">
        <DateTimeFilter
          filteredDate={filteredDate}
          setFilteredDate={setFilteredDate}
        />
        <p className="medium">Loading...</p>
      </TitledCard>
    );
  }

  if (filteredUnsubmittedHours && filteredUnsubmittedHours.length === 0) {
    return (
      <TitledCard title="Unsubmitted Hours">
        <DateTimeFilter
          filteredDate={filteredDate}
          setFilteredDate={setFilteredDate}
        />
        <p className="medium">There are no unsubmitted hours.</p>
      </TitledCard>
    );
  }

  return (
    <>
      <TitledCard title="Unsubmitted Hours">
        <DateTimeFilter
          filteredDate={filteredDate}
          setFilteredDate={setFilteredDate}
        />
        {isMobile
          ? (
            <UnsubmittedMobileTable
              filteredUnsubmittedHours={paginatedData}
            />
          )
          : (
            <UnsubmittedDesktopTable
              filteredUnsubmittedHours={paginatedData}
            />
          )}
        <PaginationController
          paginatedIndex={paginatedIndex}
          setPaginatedIndex={setPaginatedIndex}
          totalNumberOfPages={totalNumberOfPages}
        />
      </TitledCard>
    </>
  );
};

export default UnsubmittedHours;
