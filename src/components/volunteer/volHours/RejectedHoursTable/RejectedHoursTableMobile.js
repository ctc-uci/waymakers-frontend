/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../../../../common/MobileTable';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';

import trashcan from '../../../../assets/trashcan.svg';
import StylelessButton from '../../../../common/StylelessButton';

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
            onClick={() => console.log('TODO: impl delete endpoint')}
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
      </MobileTableContent>
    </MobileTableRow>
  );
};

const RejectedHoursTableMobile = ({ rejectedHours }) => (
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
