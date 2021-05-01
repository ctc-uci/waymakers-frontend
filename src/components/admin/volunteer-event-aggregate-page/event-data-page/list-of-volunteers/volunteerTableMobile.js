/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import {
  MobileTable, MobileTableContent, MobileTableRow, MobileTableRowHeader, Divider,
} from '../../../../../common/MobileTable';
// import VolunteerTableRow from './volunteerTableRow';
import './volunteerTable.css';
import VolunteerTableRowMobile from './volunteerTableRowMobile';

const VolunteerTableMobile = ({ data, profilePicture }) => (
  <div className="overflow-volunteer-table">
    <MobileTable title="List of Volunteers" className="volunteer-table">
      {data.map((volunteerEntry) => (
        <VolunteerTableRowMobile
          key={volunteerEntry.userid}
          data={volunteerEntry}
          profilePicture={profilePicture}
        />
      ))}

    </MobileTable>
  </div>
);

VolunteerTableMobile.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  profilePicture: PropTypes.node.isRequired,
};

export default VolunteerTableMobile;
