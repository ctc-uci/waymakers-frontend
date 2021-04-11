import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../../../../common/MobileTable';
import { formatDate, DATE_FORMAT } from '../../../../common/utils';
import './unsubmittedHoursMobileTable.css';

const UpdateButton = styled.button`
  border-radius: 25px;
  background: #5D9A64;
  color: white;
  border: none;
  text-decoration: none;
  width: 65%;
`;

const UnsubmittedMobileTable = ({ filteredUnsubmittedHours }) => {
  // used to display selected date and pass it to sortHours
  // const [selectedDate, setSelectedDate] = useState('');

  // // updates selectedDate
  // // passes selected date month & year to sortHours()
  // const handleSelectedDate = (date) => {
  //   setSelectedDate(date);
  //   sortHours(date.format('MMMM'), date.format('YYYY'));
  // };
  const rows = filteredUnsubmittedHours.map((e) => (
    <MobileTableRow className="uh-table-row">
      <MobileTableRowHeader>{e.eventName}</MobileTableRowHeader>
      <Divider />
      <MobileTableContent>{`Location: ${e.location}`}</MobileTableContent>
      <MobileTableContent>{`Start Date/Time: ${formatDate(e.startTime, DATE_FORMAT.MY_HOURS)}`}</MobileTableContent>
      <MobileTableContent>{`End Date/Time: ${formatDate(e.endTime, DATE_FORMAT.MY_HOURS)}`}</MobileTableContent>
      <MobileTableContent>
        <UpdateButton>Submit</UpdateButton>
      </MobileTableContent>
    </MobileTableRow>
  ));
  return (
    <MobileTable className="uh-table">
      {/* <Datetime
        onChange={(date) => handleSelectedDate(date)}
        value={selectedDate}
        closeOnSelect
        timeFormat={false}
        inputProps={{ className: 'date-picker' }}
      /> */}
      {rows}
    </MobileTable>
  );
};

UnsubmittedMobileTable.propTypes = {
  filteredUnsubmittedHours: PropTypes.arrayOf(Object).isRequired,
};

export default UnsubmittedMobileTable;
