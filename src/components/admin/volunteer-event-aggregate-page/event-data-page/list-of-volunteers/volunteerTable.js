import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableHeader, TableColumnHeader } from '../../../../../common/Table';
import VolunteerTableRow from './volunteerTableRow';
import './volunteerTable.css';

// const VolunteerTableHeader = () => (
//   <tr>
//     <th> </th>
//     <th>Name</th>
//     <th style={{ textAlign: 'end' }}>Number of Hours</th>
//     <th> </th>
//   </tr>
// );

const VolunteerTable = ({ data, profilePicture }) => (
  // TODO: Add nicer scrollbar
  <div className="overflow-volunteer-table">
    <Table className="volunteer-table">
      {/* <VolunteerTableHeader /> */}
      <TableHeader>
        <TableColumnHeader>&nbsp;</TableColumnHeader>
        <TableColumnHeader>Name</TableColumnHeader>
        <TableColumnHeader className="numHours">Number of Hours</TableColumnHeader>
        <TableColumnHeader>&nbsp;</TableColumnHeader>
      </TableHeader>
      {data.map((volunteerEntry) => (
        <VolunteerTableRow
          key={volunteerEntry.userid}
          data={volunteerEntry}
          profilePicture={profilePicture}
        />
      ))}
    </Table>
  </div>
);

VolunteerTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  profilePicture: PropTypes.node.isRequired,
};

export default VolunteerTable;
