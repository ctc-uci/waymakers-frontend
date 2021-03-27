import React from 'react';

import {
  Table, TableHeader, TableColumnHeader, TableBody, TableRow, TableContent,
} from '.';

const ExampleGenericTable = () => (
  <Table>
    <TableHeader>
      <TableColumnHeader>Column 1</TableColumnHeader>
      <TableColumnHeader>Column 2</TableColumnHeader>
      <TableColumnHeader>Column 3</TableColumnHeader>
      <TableColumnHeader>Column 4</TableColumnHeader>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableContent>Value 1</TableContent>
        <TableContent>Value 2</TableContent>
        <TableContent>Value 3</TableContent>
        <TableContent>Value 4</TableContent>
      </TableRow>
      <TableRow>
        <TableContent>Value 1</TableContent>
        <TableContent>Value 2</TableContent>
        <TableContent>Value 3</TableContent>
        <TableContent>Value 4</TableContent>
      </TableRow>
      <TableRow>
        <TableContent>Value 1</TableContent>
        <TableContent>Value 2</TableContent>
        <TableContent>Value 3</TableContent>
        <TableContent>Value 4</TableContent>
      </TableRow>
      <TableRow>
        <TableContent>Value 1</TableContent>
        <TableContent>Value 2</TableContent>
        <TableContent>Value 3</TableContent>
        <TableContent>Value 4</TableContent>
      </TableRow>
    </TableBody>
  </Table>
);

export default ExampleGenericTable;
