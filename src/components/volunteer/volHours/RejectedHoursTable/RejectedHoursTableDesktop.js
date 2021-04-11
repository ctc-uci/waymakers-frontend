/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Table, TableHeader, TableColumnHeader, TableBody, TableContent, TableRow,
} from '../../../../common/Table';
import {
  TitledCard,
} from '../../../../common/Card';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';

import ResubmitHoursPopup from './ResubmitHoursPopup';

const UpdateButton = styled.button`
  border-radius: 25px;
  background: #5D9A64;
  color: white;
  border: none;
  text-decoration: none;
  width: 65%;
`;

const Row = ({
  eventName, rejectedNotes, startTime, endTime,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <TableRow>
      <TableContent>{eventName}</TableContent>
      <TableContent>{rejectedNotes}</TableContent>
      <TableContent>{formatDate(startTime, DATE_FORMAT.MY_HOURS)}</TableContent>
      <TableContent>{formatDate(endTime, DATE_FORMAT.MY_HOURS)}</TableContent>
      <TableContent>
        <UpdateButton type="button" onClick={() => setIsModalOpen(true)}>Submit</UpdateButton>
        {isModalOpen && (
          <ResubmitHoursPopup
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            eventTitle={eventName}
          />
        )}
      </TableContent>
    </TableRow>
  );
};

const RejectedHoursTableDesktop = ({ rejectedHours }) => (
  <TitledCard title="Rejected Hours">
    <Table>
      <TableHeader>
        <TableColumnHeader>Event Name</TableColumnHeader>
        <TableColumnHeader>Notes</TableColumnHeader>
        <TableColumnHeader>Start Date/Time</TableColumnHeader>
        <TableColumnHeader>End Date/Time</TableColumnHeader>
        <TableColumnHeader>Actions</TableColumnHeader>
      </TableHeader>
      <TableBody>
        {rejectedHours && rejectedHours.map((rejectedHour) => (
          <Row
            key={rejectedHour.eventName}
            eventName={rejectedHour.eventName}
            rejectedNotes={rejectedHour.rejectedNotes}
            startTime={rejectedHour.startTime}
            endTime={rejectedHour.endTime}
          />
        ))}
      </TableBody>
    </Table>
  </TitledCard>
);

RejectedHoursTableDesktop.propTypes = {
  rejectedHours: PropTypes.arrayOf(
    PropTypes.shape({
      eventName: PropTypes.string,
      location: PropTypes.string,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
      hours: PropTypes.string,
    }),
  ).isRequired,
};

export default RejectedHoursTableDesktop;
