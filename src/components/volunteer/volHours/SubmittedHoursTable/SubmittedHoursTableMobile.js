import React from 'react';
import PropTypes from 'prop-types';

import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../../../../common/MobileTable';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';

const SubmittedHoursTableMobile = ({ filteredSubmittedHours }) => (
  <MobileTable>
    {filteredSubmittedHours && filteredSubmittedHours.map((submittedHour) => (
      <MobileTableRow key={`${submittedHour.eventName} ${submittedHour.startTime}`}>
        <MobileTableRowHeader>{submittedHour.eventName}</MobileTableRowHeader>
        <Divider />
        <MobileTableContent>
          {`Location: ${submittedHour.location}`}
        </MobileTableContent>
        <MobileTableContent>
          {`Start Date/Time: ${formatDate(submittedHour.startTime, DATE_FORMAT.MY_HOURS)}`}
        </MobileTableContent>
        <MobileTableContent>
          {`End Date/Time: ${formatDate(submittedHour.endTime, DATE_FORMAT.MY_HOURS)}`}
        </MobileTableContent>
        <MobileTableContent>
          {`Hours: ${submittedHour.hours}`}
        </MobileTableContent>
      </MobileTableRow>
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
      hours: PropTypes.string,
    }),
  ).isRequired,
};

export default SubmittedHoursTableMobile;
