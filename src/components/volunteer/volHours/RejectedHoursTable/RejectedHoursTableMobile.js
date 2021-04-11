/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../../../../common/MobileTable';
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
    <MobileTableRow>
      <MobileTableRowHeader>{eventName}</MobileTableRowHeader>
      <Divider />
      <MobileTableContent>
        {`Notes: ${rejectedNotes}`}
      </MobileTableContent>
      <MobileTableContent>
        {`Start Date/Time: ${formatDate(startTime, DATE_FORMAT.MY_HOURS)}`}
      </MobileTableContent>
      <MobileTableContent>
        {`End Date/Time: ${formatDate(endTime, DATE_FORMAT.MY_HOURS)}`}
      </MobileTableContent>
      <MobileTableContent>
        <UpdateButton type="button" onClick={() => setIsModalOpen(true)}>Submit</UpdateButton>
        {isModalOpen && (
        <ResubmitHoursPopup
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          eventTitle={eventName}
        />
        )}
      </MobileTableContent>
    </MobileTableRow>
  );
};

const RejectedHoursTableMobile = ({ rejectedHours }) => (
  <TitledCard title="Rejected Hours">
    <MobileTable>
      {rejectedHours && rejectedHours.map((rejectedHour) => (
        <Row
          key={rejectedHour.eventName}
          eventName={rejectedHour.eventName}
          rejectedNotes={rejectedHour.rejectedNotes}
          startTime={rejectedHour.startTime}
          endTime={rejectedHour.endTime}
        />
      ))}
    </MobileTable>
  </TitledCard>
);

RejectedHoursTableMobile.propTypes = {
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

export default RejectedHoursTableMobile;
