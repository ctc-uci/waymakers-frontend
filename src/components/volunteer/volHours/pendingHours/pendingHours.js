import { React, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Datetime from 'react-datetime';

import styles from 'react-datetime/css/react-datetime.css';
import useMobileWidth from '../../../../common/useMobileWidth';
import TitledCard from '../../../../common/Card/TitledCard';
import PendingHoursDesktop from './pendingHoursDesktop';
import PendingHoursMobile from './pendingHoursMobile';
import '../hours.css';
import UseFilteredHours from '../useFilteredHours';

const PendingHours = () => {
  const isMobile = useMobileWidth();
  // NOT subject to change based on filtering
  const [allPendingHours, setAllPendingHours] = useState(null);
  // Filtered pending hours and filter interface
  const [filteredPendingHours, filteredDate, setFilteredDate] = UseFilteredHours(allPendingHours);

  const [cookies] = useCookies(['userId']);

  const getPendingHours = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/logs/pending`,
        {
          params: { userId: cookies.userId },
          withCredentials: true,
        },
      );
      setAllPendingHours(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPendingHours();
  }, []);

  if (filteredPendingHours === null) {
    return (
      <TitledCard title="Pending Hours">
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

  if (filteredPendingHours && filteredPendingHours.length === 0) {
    return (
      <TitledCard title="Pending Hours">
        <Datetime
          onChange={(date) => setFilteredDate(date)}
          value={filteredDate}
          closeOnSelect
          timeFormat={false}
          dateFormat="MMMM YYYY"
          inputProps={{ className: styles.rdt, placeholder: 'Select Date Filter' }}
        />
        <p className="medium">There are no pending hours.</p>
      </TitledCard>
    );
  }

  return (
    <TitledCard title="Pending Hours">
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
          <PendingHoursMobile
            filteredPendingHours={filteredPendingHours}
          />
        )
        : (
          <PendingHoursDesktop
            filteredPendingHours={filteredPendingHours}
          />
        )}
    </TitledCard>
  );
};

export default PendingHours;
