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
          <TableContent>{pendingHour.event_name}</TableContent>
          <TableContent>{pendingHour.event_location}</TableContent>
          <TableContent>{pendingHour.log_start}</TableContent>
          <TableContent>{pendingHour.log_end}</TableContent>
          <TableContent>{pendingHour.total_hours}</TableContent>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

PendingHoursDesktop.propTypes = {
  pendingHours: PropTypes.arrayOf(
    PropTypes.shape({
      event_name: PropTypes.string,
      event_location: PropTypes.string,
      log_start: PropTypes.string,
      log_end: PropTypes.string,
      total_hours: PropTypes.string,
    }),
  ).isRequired,
};

export default PendingHoursDesktop;
