import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Datetime from 'react-datetime';
import styles from 'react-datetime/css/react-datetime.css';
import '../hours.css';
import { TitledCard } from '../../../../common/Card';

import useMobileWidth from '../../../../common/useMobileWidth';
import UnsubmittedDesktopTable from './unsubmittedDesktopTable';
import UnsubmittedMobileTable from './unsubmittedMobileTable';
import UseFilteredHours from '../useFilteredHours';

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
    axios.get(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/logs/unsubmitted`, {
        params: { userId: cookies.userId },
        withCredentials: true,
      },
    ).then((res) => {
      setAllUnsubmittedHours(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  if (filteredUnsubmittedHours === null) {
    return (
      <TitledCard title="Unsubmitted Hours">
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

  if (filteredUnsubmittedHours && filteredUnsubmittedHours.length === 0) {
    return (
      <TitledCard title="Unsubmitted Hours">
        <Datetime
          onChange={(date) => setFilteredDate(date)}
          value={filteredDate}
          closeOnSelect
          timeFormat={false}
          dateFormat="MMMM YYYY"
          inputProps={{ className: styles.rdt, placeholder: 'Select Date Filter' }}
        />
        <p className="medium">There are no unsubmitted hours.</p>
      </TitledCard>
    );
  }

  return (
    <>
      <TitledCard title="Unsubmitted Hours">
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
