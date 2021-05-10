import React from 'react';
import PropTypes from 'prop-types';

import {
  Table, TableHeader, TableColumnHeader, TableBody, TableContent, TableRow,
} from '../../../../common/Table';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';

const PendingHoursDesktop = ({ filteredPendingHours }) => (
  <Table>
    <TableHeader>
      <TableColumnHeader>Event Name</TableColumnHeader>
      <TableColumnHeader>Location</TableColumnHeader>
      <TableColumnHeader>Start Date/Time</TableColumnHeader>
      <TableColumnHeader>End Date/Time</TableColumnHeader>
      <TableColumnHeader>Hours</TableColumnHeader>
    </TableHeader>
    <TableBody>
      {filteredPendingHours.map((pendingHour) => (
        <TableRow key={pendingHour.eventName}>
          <TableContent>{pendingHour.eventName}</TableContent>
          <TableContent>{pendingHour.location}</TableContent>
          <TableContent>{formatDate(pendingHour.startTime, DATE_FORMAT.MY_HOURS)}</TableContent>
          <TableContent>{formatDate(pendingHour.endTime, DATE_FORMAT.MY_HOURS)}</TableContent>
          <TableContent>{pendingHour.hours}</TableContent>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

PendingHoursDesktop.propTypes = {
  filteredPendingHours: PropTypes.arrayOf(
    PropTypes.shape({
      eventName: PropTypes.string,
      location: PropTypes.string,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
      hours: PropTypes.string,
    }),
  ).isRequired,
};

export default PendingHoursDesktop;
