/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import './TableColumnHeader.css';

const TableColumnHeader = ({ className, children, ...props }) => (
  <th className={className}>{children}</th>
);

TableColumnHeader.defaultProps = {
  className: 'generic-table-column-header',
};

TableColumnHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default TableColumnHeader;
