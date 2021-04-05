import React from 'react';
import styled from 'styled-components';

import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../MobileTable';

const UpdateButton = styled.button`
  border-radius: 25px;
  background: #5D9A64;
  color: white;
  border: none;
  text-decoration: none;
  width: 65%;
`;

const ExampleGenericMobileTable = () => (
  <MobileTable>
    <MobileTableRow>
      <MobileTableRowHeader>Hello</MobileTableRowHeader>
      <Divider />
      <MobileTableContent>
        <UpdateButton>Submit</UpdateButton>
      </MobileTableContent>
      <MobileTableContent>There</MobileTableContent>
      <MobileTableContent>There</MobileTableContent>
      <MobileTableContent>There</MobileTableContent>
    </MobileTableRow>
    <MobileTableRow>
      <MobileTableRowHeader>Hello</MobileTableRowHeader>
      <Divider />
      <MobileTableContent>
        <UpdateButton>Submit</UpdateButton>
      </MobileTableContent>
      <MobileTableContent>There</MobileTableContent>
      <MobileTableContent>There</MobileTableContent>
      <MobileTableContent>There</MobileTableContent>
    </MobileTableRow>
    <MobileTableRow>
      <MobileTableRowHeader>Hello</MobileTableRowHeader>
      <Divider />
      <MobileTableContent>
        <UpdateButton>Submit</UpdateButton>
      </MobileTableContent>
      <MobileTableContent>There</MobileTableContent>
      <MobileTableContent>There</MobileTableContent>
      <MobileTableContent>There</MobileTableContent>
    </MobileTableRow>
  </MobileTable>
);

export default ExampleGenericMobileTable;
