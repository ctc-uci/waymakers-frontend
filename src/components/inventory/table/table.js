/* eslint-disable no-undef */
import React from 'react';
import { connect } from 'react-redux';

import { getItems } from '../redux/selectors';
import EditableItem from '../editable-item/editableItem';
import MobileItem from '../editable-item/mobileItem';
import useMobileWidth from '../../../common/useMobileWidth';

import './table.css';

// TO DO: prevent table columns from changing size when searching for items

// This is where we display the items in the database
const Table = (items) => {
  const isMobile = useMobileWidth();

  return (
    <>
      { !isMobile
        && (
          <div className="items-table-wrapper">
            <table className="items-table">
              <thead>
                <tr className="items-table--row">
                  <th className="th-name">Name</th>
                  <th className="th-quantity">In Stock</th>
                  <th className="th-quantity"> # Needed</th>
                  <th className="th-category">Category</th>
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th className="th-deleted" />
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
        )}
      { isMobile
        && (
          <div className="items-table-mobile">
            {Object.values(items)
              .filter((item) => item.id != null)
              .sort((a, b) => (a.id > b.id ? 1 : -1))
              .map((item) => (
                <MobileItem
                  key={item.id}
                  item={item}
                  modified={false}
                />
              ))}
          </div>
        )}
    </>
  );
};

// Connecting component props to redux state
const mapStateToProps = (state) => {
  const itemsList = getItems(state);
  const items = Object.keys(itemsList).map((i) => itemsList[i]);
  return { ...items };
};

export default connect(mapStateToProps, null)(Table);
