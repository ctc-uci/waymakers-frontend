import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../../../../common/MobileTable';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';
import '../hours.css';
import './unsubmittedMobileTable.css';

import SubmitHoursPopup from './SubmitHoursPopup';

const SubmitButton = styled.button`
  border-radius: 25px;
  background: #5D9A64;
  color: white;
  border: none;
  text-decoration: none;
  padding: 4px 24px 4px 24px;
  cursor:pointer;
`;

const Row = ({
  eventName, location, startTime, endTime,
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
            eventTitle={eventName}
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
};

const UnsubmittedMobileTable = ({ filteredUnsubmittedHours }) => (
  <MobileTable className="uh-table">
    {filteredUnsubmittedHours && filteredUnsubmittedHours.map((e) => (
      <Row
        key={e.eventName}
        eventName={e.eventName}
        location={e.location}
        startTime={e.startTime}
        endTime={e.endTime}
      />
    ))}
  </MobileTable>
);

UnsubmittedMobileTable.propTypes = {
  filteredUnsubmittedHours: PropTypes.arrayOf(Object).isRequired,
};

export default UnsubmittedMobileTable;