import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../../../../common/MobileTable';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';
import SubmitHoursPopup from './SubmitHoursPopup';

import './unsubmittedMobileTable.css';

const SubmitButton = styled.button`
  border-radius: 25px;
  background: #5D9A64;
  color: white;
  border: none;
  text-decoration: none;
  padding: 4px 24px 4px 24px;
  margin-top: 1em;
  cursor:pointer;
`;

const Row = ({
  eventName, id, location, startTime, endTime,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <MobileTableRow className="uh-table-row">
      <MobileTableRowHeader>{eventName}</MobileTableRowHeader>
      <Divider />
      <MobileTableContent>{`Location: ${location}`}</MobileTableContent>
      <MobileTableContent>{`Start Date/Time: ${formatDate(startTime, DATE_FORMAT.MY_HOURS)}`}</MobileTableContent>
      <MobileTableContent>{`End Date/Time: ${formatDate(endTime, DATE_FORMAT.MY_HOURS)}`}</MobileTableContent>
      <MobileTableContent>
        <SubmitButton type="button" onClick={() => setIsModalOpen(true)}>Submit</SubmitButton>
        {isModalOpen && (
          <SubmitHoursPopup
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            eventId={id}
            type="submit"
          />
        )}
      </MobileTableContent>
    </MobileTableRow>
  );
};

Row.propTypes = {
  eventName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

const UnsubmittedMobileTable = ({ filteredUnsubmittedHours }) => (
  <MobileTable className="uh-table">
    {filteredUnsubmittedHours && filteredUnsubmittedHours.map((e) => (
      <Row
        key={`${e.eventName} ${e.startTime}`}
        eventName={e.eventName}
        id={e.id}
        location={e.location}
        startTime={e.startTime}
        endTime={e.endTime}
      />
    ))}
  </MobileTable>
);

UnsubmittedMobileTable.propTypes = {
  filteredUnsubmittedHours: PropTypes.arrayOf(
    PropTypes.shape({
      eventName: PropTypes.string,
      location: PropTypes.string,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
    }),
  ).isRequired,
};

export default UnsubmittedMobileTable;
