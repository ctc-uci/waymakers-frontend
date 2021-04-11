/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../../../../common/MobileTable';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';
import './unsubmittedHoursMobileTable.css';

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
    <MobileTableRow className="uh-table-row">
      <MobileTableRowHeader>{eventName}</MobileTableRowHeader>
      <Divider />
      <MobileTableContent>{`Location: ${location}`}</MobileTableContent>
      <MobileTableContent>{`Start Date/Time: ${formatDate(startTime, DATE_FORMAT.MY_HOURS)}`}</MobileTableContent>
      <MobileTableContent>{`End Date/Time: ${formatDate(endTime, DATE_FORMAT.MY_HOURS)}`}</MobileTableContent>
      <MobileTableContent>
        <UpdateButton type="button" onClick={() => setIsModalOpen(true)}>Submit</UpdateButton>
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

const UnsubmittedMobileTable = ({ unsubmittedHours }) => (
  <MobileTable className="uh-table">
    {unsubmittedHours && unsubmittedHours.map((e) => (
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
  unsubmittedHours: PropTypes.arrayOf(Object).isRequired,
};

export default UnsubmittedMobileTable;
