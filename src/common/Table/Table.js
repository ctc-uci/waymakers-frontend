/* eslint-disable no-plusplus */
import React from 'react';
import Proptypes from 'prop-types';

import {
  MobileTableRow, MobileTableRowHeader, Divider, MobileTableContent,
} from '../MobileTable';

import './Table.css';

// CURSED
const getTableHeaders = (tableChildren) => tableChildren[0].props.children.map((child) => (
  child.props.children
));

const getTableValues = (tableChildren) => tableChildren[1].props.children.map((child) => (
  child.props.children.map((innerChild) => (
    innerChild.props.children
  ))
));

const unpackHTMLTable = (children) => (
  {
    headers: getTableHeaders(children),
    values: getTableValues(children),
  }
);

const getFirstColumn = (values) => values.map((row) => row[0]);

const createRowsForMobileTable = (headers, rows) => {
  const result = [];
  const labels = getFirstColumn(rows);

  for (let i = 0; i < rows.length; i++) {
    const mid = [labels[i], []];
    for (let j = 1; j < rows[0].length; j++) {
      if (typeof rows[i][j] !== 'string') {
        mid[1].push(rows[i][j]);
      } else {
        mid[1].push(`${headers[j]}: ${rows[i][j]}`);
      }
    }
    result.push(mid);
  }

  return result;
};

const renderMobileView = (children) => {
  const { headers, values } = unpackHTMLTable(children);
  const transformed = createRowsForMobileTable(headers, values);

  return (
    <>
      {transformed.map(([label, details]) => (
        <MobileTableRow>
          <MobileTableRowHeader>{label}</MobileTableRowHeader>
          <Divider />
          {details.map((content) => (
            <MobileTableContent>{content}</MobileTableContent>
          ))}
        </MobileTableRow>
      ))}
    </>
  );
};

const Table = ({ className, children, mobile }) => (
  <div className="generic-table-container">
    {mobile
      ? renderMobileView(children)
      : (
        <table className={className}>
          {children}
        </table>
      )}
  </div>
);

Table.defaultProps = {
  className: 'generic-table',
  mobile: false,
};

Table.propTypes = {
  className: Proptypes.string,
  children: Proptypes.node.isRequired,
  mobile: Proptypes.bool,
};

export default Table;
