import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableHeader, TableColumnHeader, TableRow, TableBody,
} from '../../../../../common/Table';
import VolunteerTableRow from './volunteerTableRow';
import './volunteerTable.css';

const VolunteerTable = ({ data }) => (
  <div className="overflow-volunteer-table">
    <Table className="volunteer-table">
      <TableHeader>
        <TableRow>
          <TableColumnHeader>&nbsp;</TableColumnHeader>
          <TableColumnHeader>Name</TableColumnHeader>
          <TableColumnHeader className="numHours">Number of Hours</TableColumnHeader>
          <TableColumnHeader>&nbsp;</TableColumnHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((volunteerEntry) => (
          <VolunteerTableRow
            key={volunteerEntry.userid}
            data={volunteerEntry}
            profilePicture={volunteerEntry.profile_picture}
          />
        ))}
      </TableBody>
    </Table>
  </div>
);

VolunteerTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
};

export default VolunteerTable;
