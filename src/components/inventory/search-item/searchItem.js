import React from 'react';
import { connect, useDispatch } from 'react-redux';

import { searchItems } from '../redux/actions';
import { getSearchTerm } from '../redux/selectors';

import './searchItem.css';

// This is a search bar that lets us search for items
const SearchItem = (prop) => {
  const dispatch = useDispatch();
  return (
    <div className="search-container">
      <input
        type="text"
        className="item-search"
        placeholder="Search for an item..."
        value={prop.searchSubstring}
        onChange={(e) => dispatch(searchItems(e.target.value))}
      />
    </div>
  );
};
// Connecting component props to redux state
const mapStateToProps = (state) => ({
  searchSubstring: getSearchTerm(state),
});

export default connect(mapStateToProps, null)(SearchItem);
