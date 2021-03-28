import React from 'react';
import styled from 'styled-components';

import {
  Table, TableHeader, TableColumnHeader, TableBody, TableRow, TableContent,
} from '.';

const UpdateButton = styled.button`
  border-radius: 25px;
  background: #5D9A64;
  color: white;
  border: none;
  text-decoration: none;
  width: 65%;
`;

const ExampleGenericTable = () => (
  <Table>
    <TableHeader>
      <TableColumnHeader className="example-classname">Qualification</TableColumnHeader>
      <TableColumnHeader>&nbsp;</TableColumnHeader>
      <TableColumnHeader>Date Added</TableColumnHeader>
      <TableColumnHeader>Status</TableColumnHeader>
      <TableColumnHeader>Notes</TableColumnHeader>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableContent>Valid Driver&apos;s License</TableContent>
        <TableContent>
          <UpdateButton>Update</UpdateButton>
        </TableContent>
        <TableContent>03/12/21</TableContent>
        <TableContent>Qualified</TableContent>
        <TableContent>Approved 02/15/21</TableContent>
      </TableRow>
      <TableRow>
        <TableContent>Current Car Insurance</TableContent>
        <TableContent>
          <UpdateButton>Update</UpdateButton>
        </TableContent>
        <TableContent>N/A</TableContent>
        <TableContent>Not Qualified</TableContent>
        <TableContent>&nbsp;</TableContent>
      </TableRow>
      <TableRow>
        <TableContent>Confidentiality Agreement</TableContent>
        <TableContent>
          <UpdateButton>Update</UpdateButton>
        </TableContent>
        <TableContent>02/24/21</TableContent>
        <TableContent>Pending</TableContent>
        <TableContent>Under Review</TableContent>
      </TableRow>
      <TableRow>
        <TableContent>TSA Background Paperwork</TableContent>
        <TableContent>
          <UpdateButton>Update</UpdateButton>
        </TableContent>
        <TableContent>02/15/21</TableContent>
        <TableContent>Not Qualified</TableContent>
        <TableContent>Picture too blurry. Please reupload</TableContent>
      </TableRow>
    </TableBody>
  </Table>
);

export default ExampleGenericTable;
