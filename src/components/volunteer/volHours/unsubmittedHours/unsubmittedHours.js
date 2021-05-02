import { React, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { WMKBackend } from '../../../../common/utils';

import { TitledCard } from '../../../../common/Card';

import useMobileWidth from '../../../../common/useMobileWidth';
import UnsubmittedDesktopTable from './unsubmittedDesktopTable';
import UnsubmittedMobileTable from './unsubmittedMobileTable';
import UseFilteredHours from '../useFilteredHours';
import DateTimeFilter from '../DateTimeFilter';

const UnsubmittedHours = () => {
  const isMobile = useMobileWidth();
  // NOT subject to change based on filtering
  const [allUnsubmittedHours, setAllUnsubmittedHours] = useState(null);
  // Filtered unsubmitted hours and filter interface
  const [
    filteredUnsubmittedHours, filteredDate, setFilteredDate,
  ] = UseFilteredHours(allUnsubmittedHours);

  const [cookies] = useCookies(['userId']);

  useEffect(() => {
    WMKBackend.get('/logs/unsubmitted', {
      params: { userId: cookies.userId },
      withCredentials: true,
    }).then((res) => {
      setAllUnsubmittedHours(res.data);
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
