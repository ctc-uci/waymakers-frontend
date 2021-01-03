import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { getEditing } from '../redux/selectors';
import store from '../redux/store';
import { deleteCategory, changeSelectedCategory } from '../redux/actions';

// Returns a button for a single category
const MenuItem = (props) => {
  // Keeps track of whether or not a category has been deleted
  const [deleted, setDeleted] = useState(false);
  // Updates selectedCategory in inventory.js, using function passed in
  const selCategory = () => {
    const selectedCategoryID = (props.category.label === 'Show All Categories') ? null : props.category.id;
    const selectedCategoryLabel = (props.category.label === 'Show All Categories') ? '' : props.category.label;
    store.dispatch(changeSelectedCategory(selectedCategoryID, selectedCategoryLabel));
  };
  // Adds category ID to list of category IDs to be deleted
  const delCategory = () => {
    if (!deleted) {
      store.dispatch(deleteCategory(props.category.id));
      setDeleted(true);
    }
  };
  const selCategoryButton = (onClickFunction) => (
    <button key={props.category.id} type="button" className="btn btn-warning" onClick={onClickFunction}>
      {props.category.label}
    </button>
  );
  const delCategoryButton = (onClickFunction) => (
    <button key={props.category.id} type="button" className="btn btn-danger" onClick={onClickFunction}>
      X |
      {props.category.label}
    </button>
  );
  return useSelector(getEditing) && props.category.label !== 'Show All Categories' ? delCategoryButton(delCategory) : selCategoryButton(selCategory);
};

export default MenuItem;
