import React from 'react';
import PropTypes from 'prop-types';

import './TableHeader.css';

const TableHeader = ({ className, children }) => (
  <tr className={className}>{children}</tr>
);

TableHeader.defaultProps = {
  className: 'generic-table-header',
};

TableHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default TableHeader;
