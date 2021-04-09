import React from 'react';
import PropTypes from 'prop-types';

import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../../../../common/MobileTable';

const PendingHoursMobile = ({ pendingHours }) => (
  <MobileTable>
    {pendingHours && pendingHours.map((pendingHour) => (
      <MobileTableRow>
        <MobileTableRowHeader>{pendingHour.title}</MobileTableRowHeader>
        <Divider />
        <MobileTableContent>
          {`Location: ${pendingHour.location}`}
        </MobileTableContent>
        <MobileTableContent>
          {`Start Date/Time: ${pendingHour.logStart}`}
        </MobileTableContent>
        <MobileTableContent>
          {`End Date/Time: ${pendingHour.logEnd}`}
        </MobileTableContent>
        <MobileTableContent>
          {`Hours: ${pendingHour.totalHours}`}
        </MobileTableContent>
      </MobileTableRow>
    ))}
  </MobileTable>
);

PendingHoursMobile.propTypes = {
  pendingHours: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      location: PropTypes.string,
      logStart: PropTypes.string,
      logEnd: PropTypes.string,
      totalHours: PropTypes.string,
    }),
  ).isRequired,
};

export default PendingHoursMobile;
