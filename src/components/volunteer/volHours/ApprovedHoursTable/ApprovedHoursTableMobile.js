import React from 'react';
import PropTypes from 'prop-types';
import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../../../../common/MobileTable';
import {
  TitledCard,
} from '../../../../common/Card';

const ApprovedHoursTableMobile = ({ approvedHours }) => (
  <TitledCard title="Approved Hours">
    <MobileTable>
      {approvedHours && approvedHours.map((approvedHour) => (
        <MobileTableRow>
          <MobileTableRowHeader>{approvedHour.eventName}</MobileTableRowHeader>
          <Divider />
          <MobileTableContent>
            {`Location: ${approvedHour.location}`}
          </MobileTableContent>
          <MobileTableContent>
            {`Start Date/Time: ${approvedHour.startTime}`}
          </MobileTableContent>
          <MobileTableContent>
            {`End Date/Time: ${approvedHour.endTime}`}
          </MobileTableContent>
          <MobileTableContent>
            {`Hours: ${approvedHour.hours}`}
          </MobileTableContent>
        </MobileTableRow>
      ))}
    </MobileTable>
  </TitledCard>
);

ApprovedHoursTableMobile.propTypes = {
  approvedHours: PropTypes.arrayOf(
    PropTypes.shape({
      eventName: PropTypes.string,
      location: PropTypes.string,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
      hours: PropTypes.string,
    }),
  ).isRequired,
};

export default ApprovedHoursTableMobile;
