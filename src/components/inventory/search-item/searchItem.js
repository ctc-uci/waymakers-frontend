import React from 'react';
import { connect } from 'react-redux';

import store from '../redux/store';
import { searchItems } from '../redux/actions';
import { getSearchTerm } from '../redux/selectors';

import './searchItem.css';

// This is a search bar that lets us search for items
const SearchItem = (prop) => (
  <input
    type="text"
    className="item-search"
    placeholder="Search for an item..."
    value={prop.searchSubstring}
    onChange={(e) => store.dispatch(searchItems(e.target.value))}
  />
);

// Connecting component props to redux state
const mapStateToProps = (state) => ({
  searchSubstring: getSearchTerm(state),
});

export default connect(mapStateToProps, null)(SearchItem);
