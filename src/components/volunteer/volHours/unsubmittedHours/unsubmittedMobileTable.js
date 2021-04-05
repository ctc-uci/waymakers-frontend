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

const UnsubmittedMobileTable = ({ tableData }) => {
  const rows = tableData.map((e) => (
    <MobileTableRow className="uh-table-row">
      <MobileTableRowHeader>{e.name}</MobileTableRowHeader>
      <Divider />
      <MobileTableContent>{e.location}</MobileTableContent>
      <MobileTableContent>{e.start}</MobileTableContent>
      <MobileTableContent>{e.end}</MobileTableContent>
      <MobileTableContent>
        <UpdateButton>Submit</UpdateButton>
      </MobileTableContent>
    </MobileTableRow>
  ));
  return (
    <MobileTable className="uh-table">
      <select name="dateDropDown" id="date">
        <option value="">--Select Date to Filter By--</option>
        <option value="">October 2020</option>
        <option value="">November 2020</option>
        <option value="">December 2020</option>
        <option value="">January 2021</option>
      </select>
      {rows}
    </MobileTable>
  );
};

UnsubmittedMobileTable.propTypes = {
  tableData: PropTypes.arrayOf(Object).isRequired,
};

export default UnsubmittedMobileTable;
