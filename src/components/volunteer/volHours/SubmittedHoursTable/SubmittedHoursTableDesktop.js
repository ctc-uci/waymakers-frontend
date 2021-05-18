import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Table, TableHeader, TableColumnHeader, TableBody, TableRow, TableContent,
} from '../../../../common/Table';
import './SubmittedHoursTableDesktop.css';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';
import SubmitHoursPopup from '../unsubmittedHours/SubmitHoursPopup';
import ViewHoursPopup from './viewHoursPopup';

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
  title, id, location, hours, startTime, endTime, key, notes,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResubmitModalOpen, setIsResubmitModalOpen] = useState(false);
  return (
    <TableRow className="uh-table-row" key={`${key}`}>
      <TableContent>{title}</TableContent>
      <TableContent>{location}</TableContent>
      <TableContent>{formatDate(startTime, DATE_FORMAT.MY_HOURS)}</TableContent>
      <TableContent>{formatDate(endTime, DATE_FORMAT.MY_HOURS)}</TableContent>
      <TableContent>{hours}</TableContent>
      <TableContent>
        <SubmitButton type="button" onClick={() => setIsModalOpen(true)}>View Info</SubmitButton>
        {isModalOpen && (
          <ViewHoursPopup
            isModalOpen={isModalOpen}
            setIsViewModalOpen={setIsModalOpen}
            setIsResubmitModalOpen={setIsResubmitModalOpen}
            eventId={id}
            additionalNotes={notes || ''}
            logStart={startTime}
            logEnd={endTime}
          />
        )}
        {isResubmitModalOpen && (
          <SubmitHoursPopup
            isModalOpen={isResubmitModalOpen}
            setIsModalOpen={setIsResubmitModalOpen}
            eventId={id}
            type="resubmit"
            additionalNotes={notes || ''}
            logStart={startTime}
            logEnd={endTime}
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
  notes: PropTypes.string.isRequired,
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
          <TableColumnHeader>View Info</TableColumnHeader>
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
            notes={submittedHour.additionalNotes}
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
