import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { TitledCard } from '../../../../common/Card';

import useMobileWidth from '../../../../common/useMobileWidth';
import UnsubmittedDesktopTable from './unsubmittedDesktopTable';
import UnsubmittedMobileTable from './unsubmittedMobileTable';

const UnsubmittedHours = () => {
  const isMobile = useMobileWidth();
  const [unsubmittedHours, setUnsubmittedHours] = useState(null);
  const [cookies] = useCookies(['userId']);

  useEffect(() => {
    axios.get(
      `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/logs/unsubmitted`, {
        params: { userId: cookies.userId },
        withCredentials: true,
      },
    ).then((res) => {
      setUnsubmittedHours(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  if (unsubmittedHours === null) {
    return (
      <TitledCard title="Unsubmitted Hours">
        <p className="medium">Loading...</p>
      </TitledCard>
    );
  }

  if (unsubmittedHours && unsubmittedHours.length === 0) {
    return (
      <TitledCard title="Unsubmitted Hours">
        <p className="medium">There are no unsubmitted hours.</p>
      </TitledCard>
    );
  }

  return (
    <>
      <TitledCard title="Unsubmitted Hours">
        {isMobile
          ? (
            <UnsubmittedMobileTable unsubmittedHours={unsubmittedHours} />
          )
          : (
            <UnsubmittedDesktopTable unsubmittedHours={unsubmittedHours} />
          )}
      </TitledCard>
    </>
  );
};

export default UnsubmittedHours;
