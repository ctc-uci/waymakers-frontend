import React from 'react';
import PropTypes from 'prop-types';

import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../../../../common/MobileTable';

const PendingHoursMobile = ({ pendingHours }) => (
  <MobileTable>
    {pendingHours && pendingHours.map((pendingHour) => (
      <MobileTableRow>
        <MobileTableRowHeader>{pendingHour.event_name}</MobileTableRowHeader>
        <Divider />
        <MobileTableContent>
          {`Location: ${pendingHour.event_location}`}
        </MobileTableContent>
        <MobileTableContent>
          {`Start Date/Time: ${pendingHour.log_start}`}
        </MobileTableContent>
        <MobileTableContent>
          {`End Date/Time: ${pendingHour.log_end}`}
        </MobileTableContent>
        <MobileTableContent>
          {`Hours: ${pendingHour.total_hours}`}
        </MobileTableContent>
      </MobileTableRow>
    ))}
  </MobileTable>
);

PendingHoursMobile.propTypes = {
  pendingHours: PropTypes.arrayOf(
    PropTypes.shape({
      event_name: PropTypes.string,
      event_location: PropTypes.string,
      log_start: PropTypes.string,
      log_end: PropTypes.string,
      total_hours: PropTypes.string,
    }),
  ).isRequired,
};

export default PendingHoursMobile;
