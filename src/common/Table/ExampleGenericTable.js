import React from 'react';

import {
  Table, TableHeader, TableColumnHeader, TableBody, TableRow, TableContent,
} from '.';

const ExampleGenericTable = () => (
  <Table mobile>
    <TableHeader>
      <TableColumnHeader className="example-classname">Qualification</TableColumnHeader>
      <TableColumnHeader> </TableColumnHeader>
      <TableColumnHeader>Date Added</TableColumnHeader>
      <TableColumnHeader>Status</TableColumnHeader>
      <TableColumnHeader>Notes</TableColumnHeader>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableContent>Valid Driver&apos;s License</TableContent>
        <TableContent>Update</TableContent>
        <TableContent>03/12/21</TableContent>
        <TableContent>Qualified</TableContent>
        <TableContent>Approved 02/15/21</TableContent>
      </TableRow>
      <TableRow>
        <TableContent>Current Car Insurance</TableContent>
        <TableContent>Update</TableContent>
        <TableContent>N/A</TableContent>
        <TableContent>Not Qualified</TableContent>
        <TableContent> </TableContent>
      </TableRow>
      <TableRow>
        <TableContent>Confidentiality Agreement</TableContent>
        <TableContent>Update</TableContent>
        <TableContent>02/24/21</TableContent>
        <TableContent>Pending</TableContent>
        <TableContent>Under Review</TableContent>
      </TableRow>
      <TableRow>
        <TableContent>TSA Background Paperwork</TableContent>
        <TableContent>Update</TableContent>
        <TableContent>02/15/21</TableContent>
        <TableContent>Not Qualified</TableContent>
        <TableContent>Picture too blurry. Please reupload</TableContent>
      </TableRow>
    </TableBody>
  </Table>
);

export default ExampleGenericTable;
