import React from 'react';
import PropTypes from 'prop-types';
import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../../../../common/MobileTable';
import {
  TitledCard,
} from '../../../../common/Card';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';

const RejectedHoursTableMobile = ({ rejectedHours }) => (
  <TitledCard title="Rejected Hours">
    <MobileTable>
      {rejectedHours && rejectedHours.map((rejectedHour) => (
        <MobileTableRow>
          <MobileTableRowHeader>{rejectedHour.eventName}</MobileTableRowHeader>
          <Divider />
          <MobileTableContent>
            {`Location: ${rejectedHour.location}`}
          </MobileTableContent>
          <MobileTableContent>
            {`Start Date/Time: ${formatDate(rejectedHour.startTime, DATE_FORMAT.MY_HOURS)}`}
          </MobileTableContent>
          <MobileTableContent>
            {`End Date/Time: ${formatDate(rejectedHour.endTime, DATE_FORMAT.MY_HOURS)}`}
          </MobileTableContent>
          <MobileTableContent>
            {`Hours: ${rejectedHour.hours}`}
          </MobileTableContent>
        </MobileTableRow>
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
