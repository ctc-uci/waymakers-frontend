import React from 'react';
import PropTypes from 'prop-types';

import {
  Table, TableHeader, TableColumnHeader, TableBody, TableContent, TableRow,
} from '../../../../common/Table';

const PendingHoursDesktop = ({ pendingHours }) => (
  <Table>
    <TableHeader>
      <TableColumnHeader>Event Name</TableColumnHeader>
      <TableColumnHeader>Location</TableColumnHeader>
      <TableColumnHeader>Start Date/Time</TableColumnHeader>
      <TableColumnHeader>End Date/Time</TableColumnHeader>
      <TableColumnHeader>Hours</TableColumnHeader>
    </TableHeader>
    <TableBody>
      {pendingHours && pendingHours.map((pendingHour) => (
        <TableRow>
          <TableContent>{pendingHour.title}</TableContent>
          <TableContent>{pendingHour.location}</TableContent>
          <TableContent>{pendingHour.logStart}</TableContent>
          <TableContent>{pendingHour.logEnd}</TableContent>
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
};

export default PendingHoursDesktop;
