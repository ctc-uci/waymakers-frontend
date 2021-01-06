import React from 'react';
import { searchItems } from '../redux/actions';
import store from '../redux/store';

// This is a search bar that lets us search for items
const SearchItem = (prop) => {
  const handleChange = (e) => {
    console.log(prop.searchSubstring);
    store.dispatch(searchItems(e.target.value));
  };
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search for an item..."
      value={prop.searchSubstring}
      onChange={handleChange}
    />
  );
};

export default SearchItem;
