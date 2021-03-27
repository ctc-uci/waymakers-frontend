import React from 'react';
import Proptypes from 'prop-types';

import './TableContent.css';

const TableContent = ({ className, children }) => (
  <td className={className}>{children}</td>
);

TableContent.defaultProps = {
  className: 'generic-table-content',
};

TableContent.propTypes = {
  className: Proptypes.string,
  children: Proptypes.node.isRequired,
};

export default TableContent;
