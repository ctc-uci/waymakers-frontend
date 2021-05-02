import React from 'react';

import ApprovedHoursTable from '../../components/volunteer/volHours/ApprovedHoursTable/ApprovedHoursTable';
import UnsubmittedHours from '../../components/volunteer/volHours/unsubmittedHours/unsubmittedHours';

// DEPRECATED
// import PendingHours from './pendingHours/pendingHours';
// import RejectedHoursTable from './RejectedHoursTable/RejectedHoursTable';

import './VolunteerHoursPage.css';

const Hours = () => (
  <div className="hours-page-container">
    <div className="hours">
      <h1 className="title">My Hours</h1>
      <UnsubmittedHours />
      <ApprovedHoursTable />
    </div>
  </div>
);

export default Hours;
