import React from 'react';
import { connect } from 'react-redux';
import EditableItem from '../editable-item/editableItem';
import { getItems } from '../redux/selectors';

import './table.css';

// TO DO: prevent table columns from changing size when searching for items

// This is where we display the items in the database
const Table = (items) => (
  <div>
    <table className="items-table">
      <thead>
        <tr>
          <th className="th-name">Name</th>
          <th className="th-quantity">In Stock</th>
          <th className="th-quantity"> # Needed</th>
          <th className="th-category">Category</th>
          <th className="th-blank" aria-label="blank" />
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
