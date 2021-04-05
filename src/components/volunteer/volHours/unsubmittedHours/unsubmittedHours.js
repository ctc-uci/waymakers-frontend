import React from 'react';
import { TitledCard } from '../../../../common/Card';

import useWindowDimension from '../../../../common/useWindowDimension';
import UnsubmittedDesktopTable from './unsubmittedDesktopTable';
import UnsubmittedMobileTable from './unsubmittedMobileTable';

const UnsubmittedHours = () => {
  const { width } = useWindowDimension();

  // dummy data
  const tableData = [
    {
      name: 'Swing for Kids Tournament',
      location: 'Waymakers',
      start: '08/10/2020, 10:00 AM',
      end: '08/10/2020, 12:00 PM',
    },
    {
      name: 'Food Drive',
      location: 'Waymakers',
      start: '08/10/2020, 10:00 AM',
      end: '08/10/2020, 12:00 PM',
    },
    {
      name: 'Event 3',
      location: 'Waymakers',
      start: '08/10/2020, 10:00 AM',
      end: '08/10/2020, 12:00 PM',
    },
    {
      name: 'Event 4',
      location: 'Waymakers',
      start: '08/10/2020, 10:00 AM',
      end: '08/10/2020, 12:00 PM',
    },
  ];

  return (
    <>
      <TitledCard title="Unsubmitted Hours">
        {width > 768
          ? (
            <UnsubmittedDesktopTable tableData={tableData} />
          )
          : (
            <UnsubmittedMobileTable tableData={tableData} />
          )}
      </TitledCard>
    </>
  );
};

export default UnsubmittedHours;
