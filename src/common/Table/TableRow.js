import React from 'react';
import PropTypes from 'prop-types';

import './TableRow.css';

const TableRow = ({ className, children }) => (
  <tr className={className}>{children}</tr>
);

TableRow.defaultProps = {
  className: 'generic-table-row',
};

TableRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default TableRow;
