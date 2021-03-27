import React from 'react';
import Proptypes from 'prop-types';

import './Table.css';

const Table = ({ className, children }) => (
  <div className="generic-table-container">
    <table className={className}>
      {children}
    </table>
  </div>
);

Table.defaultProps = {
  className: 'generic-table',
};

Table.propTypes = {
  className: Proptypes.string,
  children: Proptypes.node.isRequired,
};

export default Table;
