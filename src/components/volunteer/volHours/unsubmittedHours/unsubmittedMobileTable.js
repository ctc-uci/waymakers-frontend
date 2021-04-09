import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../../../../common/MobileTable';

import './unsubmittedHoursMobileTable.css';

const UpdateButton = styled.button`
  border-radius: 25px;
  background: #5D9A64;
  color: white;
  border: none;
  text-decoration: none;
  width: 65%;
`;

const UnsubmittedMobileTable = ({ unsubmittedHours }) => {
  const rows = unsubmittedHours.map((e) => (
    <MobileTableRow className="uh-table-row">
      <MobileTableRowHeader>{e.eventName}</MobileTableRowHeader>
      <Divider />
      <MobileTableContent>{e.location}</MobileTableContent>
      <MobileTableContent>{`${new Date(e.startTime).toLocaleDateString('en-US')}, ${new Date(e.startTime).getTime()}`}</MobileTableContent>
      <MobileTableContent>{`${new Date(e.endTime).toLocaleDateString('en-US')}, ${new Date(e.endTime).getTime()}`}</MobileTableContent>
      <MobileTableContent>
        <UpdateButton>Submit</UpdateButton>
      </MobileTableContent>
    </MobileTableRow>
  ));
  return (
    <MobileTable className="uh-table">
      {/* <select name="dateDropDown" id="date">
        <option value="">--Select Date to Filter By--</option>
        <option value="">October 2020</option>
        <option value="">November 2020</option>
        <option value="">December 2020</option>
        <option value="">January 2021</option>
      </select> */}
      {rows}
    </MobileTable>
  );
};

UnsubmittedMobileTable.propTypes = {
  unsubmittedHours: PropTypes.arrayOf(Object).isRequired,
};

export default UnsubmittedMobileTable;
