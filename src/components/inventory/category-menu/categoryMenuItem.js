import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import store from '../redux/store';
import { deleteCategory, changeSelectedCategory } from '../redux/actions';
import { getEditing } from '../redux/selectors';
import './categoryMenu.css';

// Returns a button for a single category
const CategoryMenuItem = (props) => {
  // Keeps track of whether or not a category has been deleted
  const [deleted, setDeleted] = useState(false);

  // This will mark a category as not deleted (if the user presses the cancel button)
  const unDeleteCategory = () => {
    if (!props.editing) {
      setDeleted(false);
    }
  };
  // We will unmark a category menu item as deleted if edits are cancelled
  useEffect(() => {
    unDeleteCategory();
  }, [props.editing]);

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
  // A button that lets you choose which category to select
  const selCategoryButton = (onClickFunction) => (
    <button key={props.category.id} type="button" className="category-button" onClick={onClickFunction}>
      {props.category.label}
    </button>
  );
  // A button that lets you choose which category to delete
  const delCategoryButton = (onClickFunction) => {
    const label = deleted ? `${props.category.label} (Deleted)` : props.category.label;
    return (
      <button key={props.category.id} type="button" className="edit-category-button" onClick={onClickFunction}>
        {label}
      </button>
    );
  };
  return useSelector(getEditing) && props.category.label !== 'Show All Categories' ? delCategoryButton(delCategory) : selCategoryButton(selCategory);
};

export default CategoryMenuItem;
