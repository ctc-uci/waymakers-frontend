import React from 'react';

const SearchItem = (prop) => {
  console.log('searching');
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
