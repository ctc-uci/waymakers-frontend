import React from 'react';
import './hours.css';

import PendingHours from './pendingHours/pendingHours';
import ApprovedHoursTable from './ApprovedHoursTable/ApprovedHoursTable';
import UnsubmittedHours from './unsubmittedHours/unsubmittedHours';
import RejectedHoursTable from './RejectedHoursTable/RejectedHoursTable';

const Hours = () => (
  <div className="hours">
    <h1 className="title">My Hours</h1>
    <UnsubmittedHours />
    <PendingHours />
    <RejectedHoursTable />
    <ApprovedHoursTable />
  </div>
);

export default Hours;
