import React from 'react';
import useMobileWidth from '../../../../common/useMobileWidth';

import ApprovedHoursTableDesktop from './ApprovedHoursTableDesktop';
import ApprovedHoursTableMobile from './ApprovedHoursTableMobile';
import useApprovedHours from './useApprovedHours';
import {
  TitledCard,
} from '../../../../common/Card';

const ApprovedHoursTable = () => {
  const isMobile = useMobileWidth();
  const [approvedHours] = useApprovedHours();

  if (approvedHours === null) {
    return (
      <TitledCard title="Approved Hours">
        <p className="medium">Loading</p>
      </TitledCard>
    );
  }

  if (approvedHours.length === 0) {
    return (
      <TitledCard title="Approved Hours">
        <p className="medium">There are no entries</p>
      </TitledCard>
    );
  }

  return (
    <>
      {isMobile
        ? <ApprovedHoursTableMobile approvedHours={approvedHours} />
        : <ApprovedHoursTableDesktop approvedHours={approvedHours} /> }
    </>
  );
};

export default ApprovedHoursTable;
