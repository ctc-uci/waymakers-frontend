import React from 'react';
import PropTypes from 'prop-types';

import {
  Table, TableHeader, TableColumnHeader, TableBody, TableContent, TableRow,
} from '../../../../common/Table';
import './SubmittedHoursTableDesktop.css';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';

const SubmittedHoursTableDesktop = ({ filteredSubmittedHours }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableColumnHeader>Event Name</TableColumnHeader>
        <TableColumnHeader>Location</TableColumnHeader>
        <TableColumnHeader>Start Date/Time</TableColumnHeader>
        <TableColumnHeader>End Date/Time</TableColumnHeader>
        <TableColumnHeader>Hours</TableColumnHeader>
      </TableRow>
    </TableHeader>
    <TableBody>
      {filteredSubmittedHours && filteredSubmittedHours.map((submittedHour) => (
        <TableRow key={`${submittedHour.eventName} ${submittedHour.startTime}`}>
          <TableContent>{submittedHour.eventName}</TableContent>
          <TableContent>{submittedHour.location}</TableContent>
          <TableContent>
            {
                  formatDate(submittedHour.startTime, DATE_FORMAT.MY_HOURS)
                }
          </TableContent>
          <TableContent>{formatDate(submittedHour.endTime, DATE_FORMAT.MY_HOURS)}</TableContent>
          <TableContent>{submittedHour.hours}</TableContent>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

SubmittedHoursTableDesktop.propTypes = {
  filteredSubmittedHours: PropTypes.arrayOf(
    PropTypes.shape({
      eventName: PropTypes.string,
      location: PropTypes.string,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
      hours: PropTypes.string,
    }),
  ).isRequired,
};

export default SubmittedHoursTableDesktop;
