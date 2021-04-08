import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableHeader, TableColumnHeader, TableBody, TableContent, TableRow,
} from '../../../../common/Table';
import {
  TitledCard,
} from '../../../../common/Card';

const ApprovedHoursTableDesktop = ({ approvedHours }) => (
  <TitledCard title="Approved Hours">
    <Table>
      <TableHeader>
        <TableColumnHeader>Event Name</TableColumnHeader>
        <TableColumnHeader>Location</TableColumnHeader>
        <TableColumnHeader>Start Date/Time</TableColumnHeader>
        <TableColumnHeader>End Date/Time</TableColumnHeader>
        <TableColumnHeader>Hours</TableColumnHeader>
      </TableHeader>
      <TableBody>
        {approvedHours && approvedHours.map((approvedHour) => (
          <TableRow>
            <TableContent>{approvedHour.eventName}</TableContent>
            <TableContent>{approvedHour.location}</TableContent>
            <TableContent>{approvedHour.startTime}</TableContent>
            <TableContent>{approvedHour.endTime}</TableContent>
            <TableContent>{approvedHour.hours}</TableContent>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TitledCard>
);

ApprovedHoursTableDesktop.propTypes = {
  approvedHours: PropTypes.arrayOf(
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
