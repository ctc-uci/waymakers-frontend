import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Table, TableHeader, TableColumnHeader, TableBody, TableRow, TableContent,
} from '../../../../common/Table';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';
import SubmitHoursPopup from './SubmitHoursPopup';

import './unsubmittedDesktopTable.css';

const SubmitButton = styled.button`
  border-radius: 25px;
  background: #5D9A64;
  color: white;
  border: none;
  font-size: 14px;
  width: 75%;
  cursor:pointer;
  padding: 4px 4px;
`;

const Row = ({
  title, id, location, startTime, endTime,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <TableRow className="uh-table-row">
      <TableContent>{title}</TableContent>
      <TableContent>{location}</TableContent>
      <TableContent>{formatDate(startTime, DATE_FORMAT.MY_HOURS)}</TableContent>
      <TableContent>{formatDate(endTime, DATE_FORMAT.MY_HOURS)}</TableContent>
      <TableContent>
        <SubmitButton type="button" onClick={() => setIsModalOpen(true)}>Submit</SubmitButton>
        {isModalOpen && (
        <SubmitHoursPopup
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          eventId={id}
        />
        )}
      </TableContent>
    </TableRow>
  );
};

Row.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
};

// need to convert timestamp to MM:HH AM/PM format
const UnsubmittedDesktopTable = ({ filteredUnsubmittedHours }) => (
  <Table className="uh-table">
    <TableHeader>
      <TableRow>
        <TableColumnHeader>Event Name</TableColumnHeader>
        <TableColumnHeader>Location</TableColumnHeader>
        <TableColumnHeader>Start Date/Time</TableColumnHeader>
        <TableColumnHeader>End Date/Time</TableColumnHeader>
        <TableColumnHeader>Submit</TableColumnHeader>
      </TableRow>
    </TableHeader>
    <TableBody className="uh-table-body">
      {filteredUnsubmittedHours && filteredUnsubmittedHours.map((e) => (
        <Row
          key={e.id}
          id={e.id}
          title={e.title}
          location={e.location}
          startTime={e.startTime}
          endTime={e.endTime}
        />
      ))}
    </TableBody>
  </Table>
);

UnsubmittedDesktopTable.propTypes = {
  filteredUnsubmittedHours: PropTypes.arrayOf(
    PropTypes.shape({
      eventName: PropTypes.string,
      location: PropTypes.string,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
    }),
  ).isRequired,
};

export default UnsubmittedDesktopTable;
