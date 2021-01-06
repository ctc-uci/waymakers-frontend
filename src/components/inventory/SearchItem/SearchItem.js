import React, { useEffect } from 'react';
import { searchItems } from '../redux/actions';
import store from '../redux/store';

// This is a search bar that lets us search for items
const SearchItem = (prop) => {
  useEffect(() => {
    store.dispatch(searchItems(prop.searchSubstring));
  }, [prop.searchSubstring]);

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search for an item..."
      value={prop.searchSubstring}
      onChange={(e) => prop.setSearchSubstring(e.target.value)}
    />
  );
};

export default SearchItem;
