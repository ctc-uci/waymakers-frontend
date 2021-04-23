import React from 'react';

import './volunteerDashboard.css';

const VolunteerDashboard = () => (
  <div className="dashboard-wrapper">
    <div>
      {/* Temporary holder for volunteer stats component */}
      My Stats
      <div className="flex-container">
        <div className="flex-item">
          XX Volunteer Hours
        </div>
        <div className="flex-item">
          XX Outreach Hours
        </div>
      </div>
    </div>
    <div>
      {/* Temporary holder for weekly availability component */}
      Availability for the Week
    </div>
  </div>
);

export default VolunteerDashboard;