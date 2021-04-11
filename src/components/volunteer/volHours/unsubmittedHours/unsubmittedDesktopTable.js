/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  Table, TableHeader, TableColumnHeader, TableBody, TableRow, TableContent,
} from '../../../../common/Table';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';
import './unsubmittedDesktopTable.css';

import SubmitHoursPopup from '../SubmitHoursPopup';

const UpdateButton = styled.button`
  border-radius: 25px;
  background: #5D9A64;
  color: white;
  border: none;
  text-decoration: none;
  width: 65%;
`;

const Row = ({
  eventName, location, startTime, endTime,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <TableRow className="uh-table-row">
      <TableContent>{eventName}</TableContent>
      <TableContent>{location}</TableContent>
      <TableContent>{formatDate(startTime, DATE_FORMAT.MY_HOURS)}</TableContent>
      <TableContent>{formatDate(endTime, DATE_FORMAT.MY_HOURS)}</TableContent>
      <TableContent>
        <UpdateButton type="button" onClick={() => setIsModalOpen(true)}>Submit</UpdateButton>
        {isModalOpen && (
        <SubmitHoursPopup
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          eventTitle={eventName}
        />
        )}
      </TableContent>
    </TableRow>
  );
};

// need to convert timestamp to MM:HH AM/PM format
const UnsubmittedDesktopTable = ({ unsubmittedHours }) => (
  <Table className="uh-table">
    <TableHeader>
      <TableColumnHeader className="uh-table-col-header">Event Name</TableColumnHeader>
      <TableColumnHeader className="uh-table-col-header">Location</TableColumnHeader>
      <TableColumnHeader className="uh-table-col-header">Start Date/Time</TableColumnHeader>
      <TableColumnHeader className="uh-table-col-header">End Date/Time</TableColumnHeader>
      <TableColumnHeader className="uh-table-col-header">Submit</TableColumnHeader>
    </TableHeader>
    <TableBody className="uh-table-body">
      {unsubmittedHours && unsubmittedHours.map((e) => (
        <Row
          eventName={e.eventName}
          location={e.location}
          startTime={e.startTime}
          endTime={e.endTime}
        />
      ))}
    </TableBody>
  </Table>
);

// use for
UnsubmittedDesktopTable.propTypes = {
  unsubmittedHours: PropTypes.arrayOf(Object).isRequired,
};

export default UnsubmittedDesktopTable;
