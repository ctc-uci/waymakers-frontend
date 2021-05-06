import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Table, TableHeader, TableColumnHeader, TableBody, TableRow, TableContent,
} from '../../../../common/Table';
import './SubmittedHoursTableDesktop.css';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';
import SubmitHoursPopup from '../unsubmittedHours/SubmitHoursPopup';

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
  title, id, location, hours, startTime, endTime, key,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <TableRow className="uh-table-row" key={`${key}`}>
      <TableContent>{title}</TableContent>
      <TableContent>{location}</TableContent>
      <TableContent>{formatDate(startTime, DATE_FORMAT.MY_HOURS)}</TableContent>
      <TableContent>{formatDate(endTime, DATE_FORMAT.MY_HOURS)}</TableContent>
      <TableContent>{hours}</TableContent>
      <TableContent>
        <SubmitButton type="button" onClick={() => setIsModalOpen(true)}>Resubmit</SubmitButton>
        {isModalOpen && (
        <SubmitHoursPopup
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          eventId={id}
          type="resubmit"
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
  hours: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
};

const SubmittedHoursTableDesktop = ({ filteredSubmittedHours }) => {
  console.log(filteredSubmittedHours);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableColumnHeader>Event Name</TableColumnHeader>
          <TableColumnHeader>Location</TableColumnHeader>
          <TableColumnHeader>Log Start Date/Time</TableColumnHeader>
          <TableColumnHeader>Log End Date/Time</TableColumnHeader>
          <TableColumnHeader>Hours</TableColumnHeader>
          <TableColumnHeader>Resubmit</TableColumnHeader>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredSubmittedHours && filteredSubmittedHours.map((submittedHour, i) => (
          <Row
            id={submittedHour.eventId}
            title={submittedHour.eventName}
            location={submittedHour.location}
            hours={submittedHour.hours}
            startTime={submittedHour.startTime}
            endTime={submittedHour.endTime}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
          />
        ))}
      </TableBody>
    </Table>
  );
};

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
