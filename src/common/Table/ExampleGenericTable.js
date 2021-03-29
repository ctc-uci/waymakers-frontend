import React from 'react';
import styled from 'styled-components';

import {
  Table, TableHeader, TableColumnHeader, TableBody, TableRow, TableContent,
} from '.';
import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../MobileTable';

import useWindowDimension from '../useWindowDimension';

const UpdateButton = styled.button`
  border-radius: 25px;
  background: #5D9A64;
  color: white;
  border: none;
  text-decoration: none;
  width: 65%;
`;

const ExampleGenericTable = () => {
  const { width } = useWindowDimension();
  console.log(width);

  return (
    <>
      {width > 768
        ? (
          <Table>
            <TableHeader>
              <TableColumnHeader className="example-header-classname">Qualification</TableColumnHeader>
              <TableColumnHeader className="example-header-classname">&nbsp;</TableColumnHeader>
              <TableColumnHeader className="example-header-classname">Date Added</TableColumnHeader>
              <TableColumnHeader className="example-header-classname">Status</TableColumnHeader>
              <TableColumnHeader className="example-header-classname">Notes</TableColumnHeader>
            </TableHeader>
            <TableBody className="example-body-classname">
              <TableRow className="example-row-classname">
                <TableContent className="example-content-classname">Valid Driver&apos;s License</TableContent>
                <TableContent className="example-content-classname">
                  <UpdateButton className="example-content-child-classname">Update</UpdateButton>
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
        )
        : (
          <MobileTable>
            <MobileTableRow>
              <MobileTableRowHeader>Hello</MobileTableRowHeader>
              <Divider />
              <MobileTableContent>There</MobileTableContent>
              <MobileTableContent>There</MobileTableContent>
              <MobileTableContent>There</MobileTableContent>
              <MobileTableContent>There</MobileTableContent>
            </MobileTableRow>
            <MobileTableRow>
              <MobileTableRowHeader>Hello</MobileTableRowHeader>
              <Divider />
              <MobileTableContent>There</MobileTableContent>
              <MobileTableContent>There</MobileTableContent>
              <MobileTableContent>There</MobileTableContent>
              <MobileTableContent>There</MobileTableContent>
            </MobileTableRow>
            <MobileTableRow>
              <MobileTableRowHeader>Hello</MobileTableRowHeader>
              <Divider />
              <MobileTableContent>There</MobileTableContent>
              <MobileTableContent>There</MobileTableContent>
              <MobileTableContent>There</MobileTableContent>
              <MobileTableContent>There</MobileTableContent>
            </MobileTableRow>
          </MobileTable>
        )}
    </>
  );
};

export default ExampleGenericTable;
