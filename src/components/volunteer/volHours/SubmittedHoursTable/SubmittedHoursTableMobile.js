import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../../../../common/MobileTable';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';
import SubmitHoursPopup from '../unsubmittedHours/SubmitHoursPopup';

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
  eventName, id, location, startTime, endTime, hours,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <MobileTableRow className="uh-table-row">
      <MobileTableRowHeader>{eventName}</MobileTableRowHeader>
      <Divider />
      <MobileTableContent>{`Location: ${location}`}</MobileTableContent>
      <MobileTableContent>{`Log Start Date/Time: ${formatDate(startTime, DATE_FORMAT.MY_HOURS)}`}</MobileTableContent>
      <MobileTableContent>{`Log End Date/Time: ${formatDate(endTime, DATE_FORMAT.MY_HOURS)}`}</MobileTableContent>
      <MobileTableContent>{`Hours: ${hours}`}</MobileTableContent>
      <MobileTableContent>
        <SubmitButton type="button" onClick={() => setIsModalOpen(true)}>Resubmit</SubmitButton>
        {isModalOpen && (
          <SubmitHoursPopup
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            eventId={id}
            type="resubmit"
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
  hours: PropTypes.string.isRequired,
};

const SubmittedHoursTableMobile = ({ filteredSubmittedHours }) => (
  <MobileTable>
    {filteredSubmittedHours && filteredSubmittedHours.map((submittedHour) => (
      <Row
        key={`${submittedHour.eventName} ${submittedHour.startTime}`}
        id={submittedHour.eventId}
        eventName={submittedHour.eventName}
        location={submittedHour.location}
        startTime={submittedHour.startTime}
        endTime={submittedHour.endTime}
        hours={submittedHour.hours}
      />
    ))}
  </MobileTable>
);

SubmittedHoursTableMobile.propTypes = {
  filteredSubmittedHours: PropTypes.arrayOf(
    PropTypes.shape({
      eventName: PropTypes.string,
      location: PropTypes.string,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
    }),
  ).isRequired,
};

export default SubmittedHoursTableMobile;
