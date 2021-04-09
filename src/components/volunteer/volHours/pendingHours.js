import React from 'react';
import useWindowDimension from '../../../common/useWindowDimension';
import TitledCard from '../../../common/Card/TitledCard';

import {
  Table, TableHeader, TableColumnHeader, TableBody, TableRow, TableContent,
} from '../../../common/Table';
import {
  MobileTable, MobileTableRowHeader, MobileTableRow, MobileTableContent, Divider,
} from '../../../common/MobileTable';

import './pendingHours.css';

const PendingHours = () => {
  const { width } = useWindowDimension();

  return (
    <TitledCard title="Pending Hours (In Review)">
      {width > 768
        ? (
          <Table className="ph-table">
            <TableHeader>
              <TableColumnHeader className="ph-table-column-header">Event Name</TableColumnHeader>
              <TableColumnHeader className="ph-table-column-header">Location</TableColumnHeader>
              <TableColumnHeader className="ph-table-column-header">Start Date/Time</TableColumnHeader>
              <TableColumnHeader className="ph-table-column-header">End Date/Time</TableColumnHeader>
              <TableColumnHeader className="ph-table-column-header">Hours</TableColumnHeader>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableContent>Swing for Kids Tournament</TableContent>
                <TableContent>Waymakers</TableContent>
                <TableContent>08/10/2020, 10:00 AM</TableContent>
                <TableContent>08/10/2020, 12:00 PM</TableContent>
                <TableContent>2.00</TableContent>
              </TableRow>
              <TableRow>
                <TableContent>Swing for Kids Tournament</TableContent>
                <TableContent>Waymakers</TableContent>
                <TableContent>08/10/2020, 10:00 AM</TableContent>
                <TableContent>08/10/2020, 12:00 PM</TableContent>
                <TableContent>2.00</TableContent>
              </TableRow>
              <TableRow>
                <TableContent>Swing for Kids Tournament</TableContent>
                <TableContent>Waymakers</TableContent>
                <TableContent>08/10/2020, 10:00 AM</TableContent>
                <TableContent>08/10/2020, 12:00 PM</TableContent>
                <TableContent>2.00</TableContent>
              </TableRow>
              <TableRow>
                <TableContent>Swing for Kids Tournament</TableContent>
                <TableContent>Waymakers</TableContent>
                <TableContent>08/10/2020, 10:00 AM</TableContent>
                <TableContent>08/10/2020, 12:00 PM</TableContent>
                <TableContent>2.00</TableContent>
              </TableRow>
            </TableBody>
          </Table>
        )
        : (
          <MobileTable>
            <MobileTableRow>
              <MobileTableRowHeader>Swing for Kids Tournament</MobileTableRowHeader>
              <Divider />
              <MobileTableContent>Location: Waymakers</MobileTableContent>
              <MobileTableContent>Start Date/Time: 08/10/2020, 10:00 AM</MobileTableContent>
              <MobileTableContent>End Date/Time: 08/10/2020, 12:00 PM</MobileTableContent>
              <MobileTableContent>Hours: 2.00</MobileTableContent>
            </MobileTableRow>
            <MobileTableRow>
              <MobileTableRowHeader>Swing for Kids Tournament</MobileTableRowHeader>
              <Divider />
              <MobileTableContent>Location: Waymakers</MobileTableContent>
              <MobileTableContent>Start Date/Time: 08/10/2020, 10:00 AM</MobileTableContent>
              <MobileTableContent>End Date/Time: 08/10/2020, 12:00 PM</MobileTableContent>
              <MobileTableContent>Hours: 2.00</MobileTableContent>
            </MobileTableRow>
            <MobileTableRow>
              <MobileTableRowHeader>Swing for Kids Tournament</MobileTableRowHeader>
              <Divider />
              <MobileTableContent>Location: Waymakers</MobileTableContent>
              <MobileTableContent>Start Date/Time: 08/10/2020, 10:00 AM</MobileTableContent>
              <MobileTableContent>End Date/Time: 08/10/2020, 12:00 PM</MobileTableContent>
              <MobileTableContent>Hours: 2.00</MobileTableContent>
            </MobileTableRow>
            <MobileTableRow>
              <MobileTableRowHeader>Swing for Kids Tournament</MobileTableRowHeader>
              <Divider />
              <MobileTableContent>Location: Waymakers</MobileTableContent>
              <MobileTableContent>Start Date/Time: 08/10/2020, 10:00 AM</MobileTableContent>
              <MobileTableContent>End Date/Time: 08/10/2020, 12:00 PM</MobileTableContent>
              <MobileTableContent>Hours: 2.00</MobileTableContent>
            </MobileTableRow>
          </MobileTable>
        )}
    </TitledCard>
  );
};

export default PendingHours;
