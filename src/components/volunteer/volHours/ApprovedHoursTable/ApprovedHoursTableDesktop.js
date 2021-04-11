import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableHeader, TableColumnHeader, TableBody, TableContent, TableRow,
} from '../../../../common/Table';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';
import '../unsubmittedHours/unsubmittedDesktopTable.css';

const ApprovedHoursTableDesktop = ({ filteredApprovedHours }) => (
  <Table>
    <TableHeader>
      <TableColumnHeader>Event Name</TableColumnHeader>
      <TableColumnHeader>Location</TableColumnHeader>
      <TableColumnHeader>Start Date/Time</TableColumnHeader>
      <TableColumnHeader>End Date/Time</TableColumnHeader>
      <TableColumnHeader>Hours</TableColumnHeader>
    </TableHeader>
    <TableBody>
      {filteredApprovedHours && filteredApprovedHours.map((approvedHour) => (
        <TableRow>
          <TableContent>{approvedHour.eventName}</TableContent>
          <TableContent>{approvedHour.location}</TableContent>
          <TableContent>
            {
                  formatDate(approvedHour.startTime, DATE_FORMAT.MY_HOURS)
                }
          </TableContent>
          <TableContent>{formatDate(approvedHour.endTime, DATE_FORMAT.MY_HOURS)}</TableContent>
          <TableContent>{approvedHour.hours}</TableContent>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

ApprovedHoursTableDesktop.propTypes = {
  filteredApprovedHours: PropTypes.arrayOf(
    PropTypes.shape({
      eventName: PropTypes.string,
      location: PropTypes.string,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
      hours: PropTypes.string,
    }),
  ).isRequired,
};

export default ApprovedHoursTableDesktop;
