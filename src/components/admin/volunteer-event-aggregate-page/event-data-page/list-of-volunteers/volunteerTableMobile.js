/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import {
  MobileTable, MobileTableContent, MobileTableRow, MobileTableRowHeader, Divider,
} from '../../../../../common/MobileTable';
// import VolunteerTableRow from './volunteerTableRow';
import './volunteerTable.css';
import VolunteerTableRowMobile from './volunteerTableRowMobile';

const VolunteerTableMobile = ({ data }) => (
  <div className="overflow-volunteer-table">
    <MobileTable title="List of Volunteers" className="volunteer-table">
      {data.map((volunteerEntry) => (
        <VolunteerTableRowMobile
          key={volunteerEntry.userid}
          data={volunteerEntry}
          profilePicture={volunteerEntry.profile_picture}
        />
      ))}

    </MobileTable>
  </div>
);

VolunteerTableMobile.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
};

export default VolunteerTableMobile;
