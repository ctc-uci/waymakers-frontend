import React from 'react';
import PropTypes from 'prop-types';

import './TableBody.css';

const TableBody = ({ className, children }) => (
  <tbody className={className}>{children}</tbody>
);

TableBody.defaultProps = {
  className: 'generic-table-body',
};

TableBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default TableBody;
