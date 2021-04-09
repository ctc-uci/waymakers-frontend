import React from 'react';
import PendingHours from './pendingHours/pendingHours';
import './hours.css';

import ApprovedHoursTable from './ApprovedHoursTable/ApprovedHoursTable';

const Hours = () => (
  <div className="hours">
    <h1>Volunteer Hours</h1>
    <PendingHours />
    <ApprovedHoursTable />
  </div>
);

export default Hours;
