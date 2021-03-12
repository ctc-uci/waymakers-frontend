import React from 'react';
import PropTypes from 'prop-types';
import VolunteerTableRow from './volunteerTableRow';
import './volunteerTable.css';

const VolunteerTableHeader = () => (
  <tr>
    <th> </th>
    <th>Name</th>
    <th style={{ textAlign: 'end' }}>Number of Hours</th>
    <th> </th>
  </tr>
);

const VolunteerTable = ({ data }) => (
  // TODO: Add nicer scrollbar
  <div className="overflow-volunteer-table">
    <table className="volunteer-table">
      <VolunteerTableHeader />
      {data.map((volunteerEntry) => (
        <VolunteerTableRow
          key={volunteerEntry.userid}
          data={volunteerEntry}
        />
      ))}
    </table>
  </div>
);

VolunteerTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
};

export default VolunteerTable;
