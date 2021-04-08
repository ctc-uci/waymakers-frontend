import React from 'react';
import './hours.css';

import ApprovedHoursTable from './ApprovedHoursTable/ApprovedHoursTable';

const Hours = () => (
  <div className="hours">
    <h1>Volunteer Hours</h1>
    <ApprovedHoursTable />
  </div>
);

export default Hours;
