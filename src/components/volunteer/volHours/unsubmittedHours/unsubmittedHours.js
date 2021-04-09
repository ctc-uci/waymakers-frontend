import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { TitledCard } from '../../../../common/Card';

import useWindowDimension from '../../../../common/useWindowDimension';
import UnsubmittedDesktopTable from './unsubmittedDesktopTable';
import UnsubmittedMobileTable from './unsubmittedMobileTable';

const UnsubmittedHours = () => {
  const { width } = useWindowDimension();
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
        <p>Loading...</p>
      </TitledCard>
    );
  }

  return (
    <>
      <TitledCard title="Unsubmitted Hours">
        {width > 768
          ? (
            <UnsubmittedDesktopTable unsubmittedHours={unsubmittedHours} />
          )
          : (
            <UnsubmittedMobileTable unsubmittedHours={unsubmittedHours} />
          )}
      </TitledCard>
    </>
  );
};

export default UnsubmittedHours;
