import React from 'react';
import { connect } from 'react-redux';
import EditableItem from '../editable-item/editableItem';
import { getItems } from '../redux/selectors';

import './table.css';

// This is where we display the items in the database
const Table = (items) => (
  <div>
    <table className="items-table">
      <thead>
        <tr className="items-table-header">
          <th className="items-th-name">Name</th>
          <th className="items-th-stock">In Stock</th>
          <th className="items-th-number"># Needed</th>
          <th className="items-th-cat">Category</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(items)
          .filter((item) => item.id != null)
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((item) => (
            <EditableItem
              key={item.id}
              item={item}
              modified={false}
            />
          ))}
      </tbody>
    </table>
  </div>
);

// Connecting component props to redux state
const mapStateToProps = (state) => {
  const itemsList = getItems(state);
  const items = Object.keys(itemsList).map((i) => itemsList[i]);
  return { ...items };
};

export default connect(mapStateToProps, null)(Table);
