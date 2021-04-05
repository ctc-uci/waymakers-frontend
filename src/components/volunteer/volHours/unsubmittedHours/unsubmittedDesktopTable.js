import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  Table, TableHeader, TableColumnHeader, TableBody, TableRow, TableContent,
} from '../../../../common/Table';

import './unsubmittedDesktopTable.css';

const UpdateButton = styled.button`
  border-radius: 25px;
  background: #5D9A64;
  color: white;
  border: none;
  text-decoration: none;
  width: 65%;
`;

const UnsubmittedDesktopTable = ({ tableData }) => {
  const rows = tableData.map((e) => (
    <TableRow className="uh-table-row">
      <TableContent>{e.name}</TableContent>
      <TableContent>{e.location}</TableContent>
      <TableContent>{e.start}</TableContent>
      <TableContent>{e.end}</TableContent>
      <TableContent>
        <UpdateButton>Submit</UpdateButton>
      </TableContent>
    </TableRow>
  ));
  return (
    <Table className="uh-table">
      <select name="dateDropDown" id="date">
        <option value="">--Select Date to Filter By--</option>
        <option value="">October 2020</option>
        <option value="">November 2020</option>
        <option value="">December 2020</option>
        <option value="">January 2021</option>
      </select>
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
  tableData: PropTypes.arrayOf(Object).isRequired,
};

export default UnsubmittedDesktopTable;
