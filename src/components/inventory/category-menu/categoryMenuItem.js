import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import store from '../redux/store';
import { deleteCategory, undeleteCategory, changeSelectedCategory } from '../redux/actions';
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
    const selectedCategoryID = (props.category.label === 'All Categories') ? null : props.category.id;
    const selectedCategoryLabel = (props.category.label === 'All Categories') ? '' : props.category.label;
    store.dispatch(changeSelectedCategory(selectedCategoryID, selectedCategoryLabel));
  };
  // Adds category ID to list of category IDs to be deleted if delete is toggled on;
  // otherwise, reverts the category delete both in the component and in the Redux store
  const toggleDelCategory = () => {
    if (!deleted) {
      store.dispatch(deleteCategory(props.category.id));
      setDeleted(true);
    } else {
      store.dispatch(undeleteCategory(props.category.id));
      setDeleted(false);
    }
  };
  // A button that lets you choose which category to select
  const selCategoryButton = (onClickFunction) => (
    <button key={props.category.id} type="button" className="category-button" onClick={onClickFunction}>
      {props.category.label}
    </button>
  );
  // Select a category in edit mode.
  // The icons are buttons that allow for the category to be deleted/undeleted
  const delCategoryButton = (onClickFunction) => {
    const label = deleted ? <strike>{props.category.label}</strike> : props.category.label;
    return (
      <button key={props.category.id} type="button" className="category-button--edit" onClick={selCategory}>
        {label}
        <button
          className={deleted ? 'category-icon--undo' : 'category-icon--delete'}
          type="button"
          aria-label="icon"
          onClick={onClickFunction}
        />
      </button>
    );
  };
  return useSelector(getEditing) && props.category.label !== 'All Categories' ? delCategoryButton(toggleDelCategory) : selCategoryButton(selCategory);
};

export default CategoryMenuItem;
