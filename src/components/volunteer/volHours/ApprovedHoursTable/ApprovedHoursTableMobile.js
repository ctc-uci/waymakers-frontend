import React from 'react';
import PropTypes from 'prop-types';

import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../../../../common/MobileTable';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';

const ApprovedHoursTableMobile = ({ filteredApprovedHours }) => (
  <MobileTable>
    {filteredApprovedHours && filteredApprovedHours.map((approvedHour) => (
      <MobileTableRow key={approvedHour.eventName}>
        <MobileTableRowHeader>{approvedHour.eventName}</MobileTableRowHeader>
        <Divider />
        <MobileTableContent>
          {`Location: ${approvedHour.location}`}
        </MobileTableContent>
        <MobileTableContent>
          {`Start Date/Time: ${formatDate(approvedHour.startTime, DATE_FORMAT.MY_HOURS)}`}
        </MobileTableContent>
        <MobileTableContent>
          {`End Date/Time: ${formatDate(approvedHour.endTime, DATE_FORMAT.MY_HOURS)}`}
        </MobileTableContent>
        <MobileTableContent>
          {`Hours: ${approvedHour.hours}`}
        </MobileTableContent>
      </MobileTableRow>
    ))}
  </MobileTable>
);

ApprovedHoursTableMobile.propTypes = {
  filteredApprovedHours: PropTypes.arrayOf(
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
