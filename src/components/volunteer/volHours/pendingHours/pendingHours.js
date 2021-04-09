import { React, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import useMobileWidth from '../../../../common/useMobileWidth';
import TitledCard from '../../../../common/Card/TitledCard';
import PendingHoursDesktop from './pendingHoursDesktop';
import PendingHoursMobile from './pendingHoursMobile';

const PendingHours = () => {
  const isMobile = useMobileWidth();
  const [pendingHours, setPendingHours] = useState(null);
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
      setPendingHours(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateString) => {
    const timestamp = new Date(dateString);

    return new Intl.DateTimeFormat('en', {
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
    }).format(timestamp);
  };

  useEffect(() => {
    getPendingHours();
  }, []);

  if (pendingHours && pendingHours.length > 0) {
    return (
      <TitledCard title="Pending Hours">
        {isMobile
          ? <PendingHoursMobile pendingHours={pendingHours} formatDate={formatDate} />
          : <PendingHoursDesktop pendingHours={pendingHours} formatDate={formatDate} /> }
      </TitledCard>
    );
  }
  return (
    <TitledCard title="Pending Hours">
      <p>There are no pending hours.</p>
    </TitledCard>
  );
};

export default PendingHours;
