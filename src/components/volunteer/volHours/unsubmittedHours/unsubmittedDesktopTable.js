import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Table, TableHeader, TableColumnHeader, TableBody, TableRow, TableContent,
} from '../../../../common/Table';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';
import './unsubmittedDesktopTable.css';

const UpdateButton = styled.button`
  border-radius: 25px;
  background: #5D9A64;
  color: white;
  border: none;
  text-decoration: none;
  width: 65%;
`;

const UnsubmittedDesktopTable = ({ filteredUnsubmittedHours }) => {
  const rows = filteredUnsubmittedHours.map((e) => (
    <TableRow className="uh-table-row">
      <TableContent>{e.eventName}</TableContent>
      <TableContent>{e.location}</TableContent>
      <TableContent>{formatDate(e.startTime, DATE_FORMAT.MY_HOURS)}</TableContent>
      <TableContent>{formatDate(e.endTime, DATE_FORMAT.MY_HOURS)}</TableContent>
      <TableContent>
        <UpdateButton>Submit</UpdateButton>
      </TableContent>
    </TableRow>
  ));

  return (
    <Table className="uh-table">
      {/* <Datetime
        onChange={(date) => handleSelectedDate(date)}
        value={selectedDate}
        closeOnSelect
        timeFormat={false}
        inputProps={{ className: 'date-picker' }}
      /> */}
      <TableHeader>
        <TableColumnHeader className="uh-table-col-header">Event Name</TableColumnHeader>
        <TableColumnHeader className="uh-table-col-header">Location</TableColumnHeader>
        <TableColumnHeader className="uh-table-col-header">Start Date/Time</TableColumnHeader>
        <TableColumnHeader className="uh-table-col-header">End Date/Time</TableColumnHeader>
        <TableColumnHeader className="uh-table-col-header">Submit</TableColumnHeader>
      </TableHeader>
      <TableBody className="uh-table-body">
        {rows}
      </TableBody>
    </Table>
  );
};

// use for
UnsubmittedDesktopTable.propTypes = {
  filteredUnsubmittedHours: PropTypes.arrayOf(Object).isRequired,
};

export default UnsubmittedDesktopTable;
