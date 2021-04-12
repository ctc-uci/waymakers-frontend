/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Table, TableHeader, TableColumnHeader, TableBody, TableContent, TableRow,
} from '../../../../common/Table';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';

import trashcan from '../../../../assets/trashcan.svg';
import StylelessButton from '../../../../common/StylelessButton';

import useDeleteRejectedHours from './useDeleteRejectedHours';
import ResubmitHoursPopup from './ResubmitHoursPopup';

const ResubmitButton = styled.button`
  border-radius: 25px;
  background: #5D9A64;
  color: white;
  border: none;
  text-decoration: none;
  padding: 4px 24px 4px 24px;
  cursor:pointer;
`;

const Row = ({
  logId, eventName, rejectedNotes, startTime, endTime,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteRejectedHours] = useDeleteRejectedHours();
  return (
    <TableRow>
      <TableContent>{eventName}</TableContent>
      <TableContent>{rejectedNotes}</TableContent>
      <TableContent>{formatDate(startTime, DATE_FORMAT.MY_HOURS)}</TableContent>
      <TableContent>{formatDate(endTime, DATE_FORMAT.MY_HOURS)}</TableContent>
      <TableContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ResubmitButton type="button" onClick={() => setIsModalOpen(true)}>Resubmit</ResubmitButton>
          {isModalOpen && (
          <ResubmitHoursPopup
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            eventTitle={eventName}
          />
          )}
          <StylelessButton
            type="button"
            onClick={() => deleteRejectedHours(logId)
              .then(() => console.log('a'))
              .catch((err) => console.error(err))}
            style={{ height: '30px' }}
          >
            <img
              className="trash-icon"
              src={trashcan}
              alt="trashcan"
              style={{ height: '30px' }}
            />
          </StylelessButton>
        </div>

      </TableContent>
    </TableRow>
  );
};

const RejectedHoursTableDesktop = ({ rejectedHours }) => (
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
          logId={rejectedHour.id}
          eventName={rejectedHour.eventName}
          rejectedNotes={rejectedHour.rejectedNotes}
          startTime={rejectedHour.startTime}
          endTime={rejectedHour.endTime}
        />
      ))}
    </TableBody>
  </Table>
);

RejectedHoursTableDesktop.propTypes = {
  rejectedHours: PropTypes.arrayOf(
    PropTypes.shape({
      logId: PropTypes.string.isRequired,
      eventName: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      hours: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default RejectedHoursTableDesktop;
