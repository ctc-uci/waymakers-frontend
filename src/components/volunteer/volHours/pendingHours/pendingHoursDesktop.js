import React from 'react';
import PropTypes from 'prop-types';

import {
  Table, TableHeader, TableColumnHeader, TableBody, TableContent, TableRow,
} from '../../../../common/Table';

const PendingHoursDesktop = ({ pendingHours, formatDate }) => (
  <Table>
    <TableHeader>
      <TableColumnHeader>Event Name</TableColumnHeader>
      <TableColumnHeader>Location</TableColumnHeader>
      <TableColumnHeader>Start Date/Time</TableColumnHeader>
      <TableColumnHeader>End Date/Time</TableColumnHeader>
      <TableColumnHeader>Hours</TableColumnHeader>
    </TableHeader>
    <TableBody>
      {pendingHours.map((pendingHour) => (
        <TableRow>
          <TableContent>{pendingHour.title}</TableContent>
          <TableContent>{pendingHour.location}</TableContent>
          <TableContent>{formatDate(pendingHour.logStart)}</TableContent>
          <TableContent>{formatDate(pendingHour.logEnd)}</TableContent>
          <TableContent>{pendingHour.totalHours}</TableContent>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

PendingHoursDesktop.propTypes = {
  pendingHours: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      location: PropTypes.string,
      logStart: PropTypes.string,
      logEnd: PropTypes.string,
      totalHours: PropTypes.string,
    }),
  ).isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default PendingHoursDesktop;
