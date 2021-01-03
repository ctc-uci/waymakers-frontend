import React from 'react';
import { connect } from 'react-redux';
import EditableItem from '../EditableItem/EditableItem';

import { getItems } from '../redux/selectors';

// TODO:
// - Add ascending and descending sort to table (currently sorted by id)
// - Improve CSS styling:
//    - Better positioning for buttons
//    - Mark unsaved edits with orange outline and icon
//    - Add strike-through for unsaved deleted

const Table = (items) => (
  <div className="table">
    <table className="table mt-3 text-center">
      <thead>
        <tr>
          <th>Name</th>
          <th>In stock</th>
          <th>Number needed</th>
          <th>Category</th>
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
  return items;
};

export default connect(mapStateToProps, null)(Table);
