import React from 'react';
import useMobileWidth from '../../../../common/useMobileWidth';

import RejectedHoursTableDesktop from './RejectedHoursTableDesktop';
import RejectedHoursTableMobile from './RejectedHoursTableMobile';
import useRejectedHours from './useRejectedHours';
import {
  TitledCard,
} from '../../../../common/Card';

const ApprovedHoursTable = () => {
  const isMobile = useMobileWidth();
  const [rejectedHours] = useRejectedHours();

  if (rejectedHours === null) {
    return (
      <TitledCard title="Rejected Hours">
        <p className="medium">Loading...</p>
      </TitledCard>
    );
  }

  if (rejectedHours && rejectedHours.length === 0) {
    return (
      <TitledCard title="Rejected Hours">
        <p className="medium">There are no rejected hours.</p>
      </TitledCard>
    );
  }

  return (
    <>
      {isMobile
        ? <RejectedHoursTableMobile rejectedHours={rejectedHours} />
        : <RejectedHoursTableDesktop rejectedHours={rejectedHours} /> }
    </>
  );
};

export default ApprovedHoursTable;
