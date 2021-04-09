import React from 'react';
import PropTypes from 'prop-types';

import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../../../../common/MobileTable';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';

const PendingHoursMobile = ({ pendingHours }) => (
  <MobileTable>
    {pendingHours.map((pendingHour) => (
      <MobileTableRow>
        <MobileTableRowHeader>{pendingHour.eventName}</MobileTableRowHeader>
        <Divider />
        <MobileTableContent>
          {`Location: ${pendingHour.location}`}
        </MobileTableContent>
        <MobileTableContent>
          {`Start Date/Time: ${formatDate(pendingHour.startTime, DATE_FORMAT.MY_HOURS)}`}
        </MobileTableContent>
        <MobileTableContent>
          {`End Date/Time: ${formatDate(pendingHour.endTime, DATE_FORMAT.MY_HOURS)}`}
        </MobileTableContent>
        <MobileTableContent>
          {`Hours: ${pendingHour.hours}`}
        </MobileTableContent>
      </MobileTableRow>
    ))}
  </MobileTable>
);

PendingHoursMobile.propTypes = {
  pendingHours: PropTypes.arrayOf(
    PropTypes.shape({
      eventName: PropTypes.string,
      location: PropTypes.string,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
      hours: PropTypes.string,
    }),
  ).isRequired,
};

export default PendingHoursMobile;
